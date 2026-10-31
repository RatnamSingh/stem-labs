/**
 * Carawin STEM Labs — Interactive Platform Logic
 * Handles:
 * 1. Navbar Active Tab Switching & Scroll Spy (Bold + Yellow Underline)
 * 2. Interactive Hero Simulation Showcase (Small card switching, sliders, live curves, lab launching)
 * 3. Video / Walkthrough Modal
 * 4. Mobile Menu Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSimulation();
  initModals();
  initMobileMenu();
});

/* ==========================================================================
   1. NAVBAR: ACTIVE TAB ON CLICK & SCROLL SPY
   ========================================================================== */
function initNavbar() {
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  const header = document.querySelector('.site-header');

  // Handle header glass appearance on scroll
  if (header) {
    const handleHeaderScroll = () => {
      if (window.pageYOffset > 30) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  if (!navLinks.length) return;

  // Click Handler: Immediately set clicked item active (Bold + Yellow underline)
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // If it's an on-page anchor link (e.g., #subjects, #how-it-works, #for-schools)
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        // Update active class
        navLinks.forEach(nl => nl.classList.remove('active'));
        link.classList.add('active');

        if (targetSection) {
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
          const targetPos = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });

          // Update URL hash without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      } else {
        // If it's a page link (like ./labs.html), allow navigation
        navLinks.forEach(nl => nl.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Scroll Spy for Home Page Sections
  const sections = [
    { id: 'subjects', linkText: 'For Students' },
    { id: 'how-it-works', linkText: 'How it works' },
    { id: 'for-schools', linkText: 'For Schools' }
  ];

  const sectionElements = sections
    .map(s => ({ el: document.getElementById(s.id), linkText: s.linkText }))
    .filter(s => s.el !== null);

  if (sectionElements.length > 0) {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
      const scrollPos = scrollY + headerHeight + 120;

      // Check if user is at the top of the landing page
      if (scrollY < 200) {
        // At top, if there's a link for top or For Students, keep or adjust
        const studentsLink = Array.from(navLinks).find(nl => nl.textContent.trim().toLowerCase() === 'for students');
        if (studentsLink && !studentsLink.classList.contains('active')) {
          navLinks.forEach(nl => nl.classList.remove('active'));
          studentsLink.classList.add('active');
        }
        return;
      }

      // Check which section is in view
      let currentActiveText = null;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el.offsetTop <= scrollPos) {
          currentActiveText = item.linkText.toLowerCase();
          break;
        }
      }

      if (currentActiveText) {
        navLinks.forEach(nl => {
          const text = nl.textContent.trim().toLowerCase();
          if (text === currentActiveText) {
            nl.classList.add('active');
          } else if (text !== 'labs') { // Keep other anchor links clean
            nl.classList.remove('active');
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load
    handleScroll();
  }
}

/* ==========================================================================
   2. INTERACTIVE HERO SIMULATION SHOWCASE
   Handles thumbnail switching, interactive sliders, curve updates & launch
   ========================================================================== */
function initHeroSimulation() {
  const stageImg = document.getElementById('planet-stage-img');
  const titleEl = document.getElementById('gravity-sim-title');
  const thumbBtns = document.querySelectorAll('.carousel-thumb');
  const prevBtn = document.getElementById('sim-carousel-prev');
  const nextBtn = document.getElementById('sim-carousel-next');

  if (!stageImg || !thumbBtns.length) return;

  // Simulation Presets Data
  const simulations = {
    saturn: {
      id: 'saturn',
      title: 'Gravity & Orbit Simulation',
      image: './assets/images/saturn_space.jpg',
      labUrl: './Labs/Physics/projectile_motion_simulation/simulation.html',
      badge: 'Physics · Gravitation',
      sliders: [
        { label: 'Mass', value: '5.2 × 10³⁰ kg', percent: 72, min: 1, max: 10, unit: ' × 10³⁰ kg' },
        { label: 'Distance', value: '1.4 × 10¹¹ km', percent: 45, min: 0.5, max: 3, unit: ' × 10¹¹ km' },
        { label: 'Gravity', value: '9.8 m/s²', percent: 60, min: 1.6, max: 24.8, unit: ' m/s²' }
      ],
      curvePath: 'M 10 50 Q 100 0 190 50',
      dotColor: '#FFC20E',
      curveColor: '#DC143C'
    },
    earth: {
      id: 'earth',
      title: 'Atmospheric & Magnetic Field',
      image: './assets/images/thumb_earth.jpg',
      labUrl: './Labs/Physics/ohms_law/simulation.html',
      badge: 'Physics · Magnetism',
      sliders: [
        { label: 'Field Strength', value: '45.2 µT', percent: 55, min: 20, max: 70, unit: ' µT' },
        { label: 'Solar Wind', value: '420 km/s', percent: 62, min: 250, max: 750, unit: ' km/s' },
        { label: 'Ion Altitude', value: '340 km', percent: 40, min: 100, max: 600, unit: ' km' }
      ],
      curvePath: 'M 10 30 C 50 10, 150 10, 190 30',
      dotColor: '#38BDF8',
      curveColor: '#0284C7'
    },
    molecule: {
      id: 'molecule',
      title: 'Reaction Kinetics & Titration',
      image: './assets/images/chemistry_flask.jpg',
      labUrl: './Labs/Chemistry/kinetics_simulation/simulation.html',
      badge: 'Chemistry · Reaction Rates',
      sliders: [
        { label: 'Temperature', value: '345 K', percent: 68, min: 273, max: 400, unit: ' K' },
        { label: 'Concentration', value: '0.12 mol/L', percent: 48, min: 0.01, max: 0.5, unit: ' mol/L' },
        { label: 'Rate (k)', value: '3.4 × 10⁻² s⁻¹', percent: 75, min: 0.5, max: 5.0, unit: ' × 10⁻² s⁻¹' }
      ],
      curvePath: 'M 10 50 Q 70 5 190 40',
      dotColor: '#FFC20E',
      curveColor: '#DC143C'
    },
    rocket: {
      id: 'rocket',
      title: 'Propulsion & Velocity Trajectory',
      image: './assets/images/rocket_launch.jpg',
      labUrl: './Labs/Physics/projectile_motion_simulation/simulation.html',
      badge: 'Physics · Mechanics',
      sliders: [
        { label: 'Thrust Force', value: '7.6 MN', percent: 82, min: 2, max: 10, unit: ' MN' },
        { label: 'Fuel Burn Rate', value: '2,800 kg/s', percent: 70, min: 1000, max: 4000, unit: ' kg/s' },
        { label: 'Escape Velocity', value: '11.2 km/s', percent: 65, min: 5, max: 15, unit: ' km/s' }
      ],
      curvePath: 'M 10 55 Q 120 45 190 10',
      dotColor: '#FFC20E',
      curveColor: '#F59E0B'
    }
  };

  const simKeys = Object.keys(simulations);
  let currentIndex = 0;

  // Wire Sliders Container & Elements
  const sliderRows = document.querySelectorAll('.gravity-sim-card .sim-slider-row');
  const curvePath = document.querySelector('.gravity-curve-svg path');
  const curveDot = document.querySelector('.gravity-curve-svg circle');

  // Make sliders draggable/clickable
  sliderRows.forEach((row) => {
    const track = row.querySelector('.sim-track');
    const fill = row.querySelector('.sim-track-fill');
    const thumb = row.querySelector('.sim-thumb');
    const valEl = row.querySelector('.sim-slider-value');

    if (!track || !fill || !thumb) return;

    track.style.cursor = 'pointer';

    const updateSliderFromEvent = (e) => {
      const rect = track.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      let pct = Math.max(5, Math.min(95, Math.round((clickX / rect.width) * 100)));

      fill.style.width = pct + '%';
      thumb.style.left = pct + '%';

      // Update numerical readout slightly based on percentage
      if (valEl) {
        const currentText = valEl.textContent;
        // Dynamically scale numbers
        const match = currentText.match(/([\d\.]+)/);
        if (match) {
          const baseNum = parseFloat(match[1]);
          const newNum = ((baseNum * pct) / 60).toFixed(1);
          valEl.textContent = currentText.replace(match[1], newNum);
        }
      }

      // Animate curve dot position
      if (curveDot) {
        const dotX = 10 + (pct * 1.8);
        curveDot.setAttribute('cx', dotX);
      }
    };

    track.addEventListener('click', updateSliderFromEvent);

    // Dragging support
    let isDragging = false;
    thumb.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) updateSliderFromEvent(e);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
  });

  // Switch Active Simulation
  function applySimulation(key) {
    const data = simulations[key];
    if (!data) return;

    currentIndex = simKeys.indexOf(key);

    // Update active thumb
    thumbBtns.forEach(btn => {
      const isActive = btn.getAttribute('data-sim') === key;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });

    // Smooth image transition
    stageImg.style.opacity = '0.3';
    stageImg.style.transform = 'scale(0.98)';
    stageImg.style.transition = 'all 0.3s ease';

    setTimeout(() => {
      stageImg.src = data.image;
      stageImg.alt = data.title;
      stageImg.style.opacity = '0.88';
      stageImg.style.transform = 'scale(1)';
    }, 150);

    // Update title
    if (titleEl) {
      titleEl.innerHTML = `<span>${data.title}</span>`;
    }

    // Update Sliders
    sliderRows.forEach((row, idx) => {
      const sliderConfig = data.sliders[idx];
      if (!sliderConfig) return;

      const labelEl = row.querySelector('.sim-slider-label span:first-child');
      const valEl = row.querySelector('.sim-slider-value');
      const fill = row.querySelector('.sim-track-fill');
      const thumb = row.querySelector('.sim-thumb');

      if (labelEl) labelEl.textContent = sliderConfig.label;
      if (valEl) valEl.textContent = sliderConfig.value;
      if (fill) fill.style.width = sliderConfig.percent + '%';
      if (thumb) thumb.style.left = sliderConfig.percent + '%';
    });

    // Update Curve
    if (curvePath && data.curvePath) {
      curvePath.setAttribute('d', data.curvePath);
      curvePath.setAttribute('stroke', data.curveColor);
    }
    if (curveDot && data.dotColor) {
      curveDot.setAttribute('fill', data.dotColor);
    }

    // Add Launch Button / Link to Gravity Card if not present
    let launchBtn = document.getElementById('hero-sim-launch-btn');
    const simCard = document.querySelector('.gravity-sim-card');
    if (simCard && !launchBtn) {
      launchBtn = document.createElement('a');
      launchBtn.id = 'hero-sim-launch-btn';
      launchBtn.className = 'btn btn-crimson';
      launchBtn.style.cssText = 'padding: 7px 14px; font-size: 0.8rem; margin-top: 10px; width: 100%; text-align: center; justify-content: center;';
      launchBtn.innerHTML = '<span>Open Interactive Lab</span> <span class="btn-arrow">→</span>';
      simCard.appendChild(launchBtn);
    }
    if (launchBtn) {
      launchBtn.href = data.labUrl;
      launchBtn.setAttribute('title', `Launch ${data.title}`);
    }
  }

  // Thumb clicks
  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const simKey = btn.getAttribute('data-sim');
      applySimulation(simKey);
    });
  });

  // Next / Prev navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + simKeys.length) % simKeys.length;
      applySimulation(simKeys[currentIndex]);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % simKeys.length;
      applySimulation(simKeys[currentIndex]);
    });
  }

  // Make stage clickable to launch lab
  const planetStage = document.querySelector('.planet-stage');
  if (planetStage) {
    planetStage.style.cursor = 'pointer';
    planetStage.setAttribute('title', 'Click to explore simulation lab');
    planetStage.addEventListener('click', (e) => {
      // Avoid intercepting slider clicks
      if (e.target.closest('.gravity-sim-card')) return;
      const currentSim = simulations[simKeys[currentIndex]];
      if (currentSim && currentSim.labUrl) {
        window.location.href = currentSim.labUrl;
      }
    });
  }

  // Initial trigger
  applySimulation('saturn');
}

/* ==========================================================================
   3. MODAL CONTROLS (Video & Dialogs)
   ========================================================================== */
function initModals() {
  const watchVideoBtn = document.getElementById('btn-watch-video');
  const videoModal = document.getElementById('video-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (watchVideoBtn && videoModal) {
    watchVideoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      videoModal.classList.add('is-open');
      videoModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (modalCloseBtn && videoModal) {
    modalCloseBtn.addEventListener('click', () => {
      videoModal.classList.remove('is-open');
      videoModal.setAttribute('aria-hidden', 'true');
    });

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('is-open');
        videoModal.setAttribute('aria-hidden', 'true');
      }
    });
  }
}

/* ==========================================================================
   4. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('is-open');
  });

  // Close menu when clicking link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}
