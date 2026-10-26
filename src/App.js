
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import experiments from "./experiments";

const CLASSES = [9, 10, 11, 12];
const SUBJECTS = ["All", "Physics", "Chemistry", "Biology"];
const SUBJECT_THEME = {
  Physics: {
    color: "#002147",
    tint: "#EDF2F8",
  },
  Chemistry: {
    color: "#DC143C",
    tint: "#FFF0F2",
  },
  Biology: {
    color: "#002147",
    tint: "#FFF7D6",
  },
};
const PREVIEW_COUNT = 6;
const CARD_PALETTES = [
  { accent: "#002147", tint: "#EDF2F8", glow: "#C4D2E3" },
  { accent: "#DC143C", tint: "#FFF0F2", glow: "#F5BEC8" },
  { accent: "#002147", tint: "#FFF7D6", glow: "#FFC72C" },
  { accent: "#DC143C", tint: "#EDF2F8", glow: "#C4D2E3" },
  { accent: "#002147", tint: "#FFF0F2", glow: "#F5BEC8" },
  { accent: "#DC143C", tint: "#FFF7D6", glow: "#FFC72C" },
];

const IMAGES = {
  cradle: "/images/newton-cradle.jpg",
  cells: "/images/microscope-cells.jpg",
  purpleFlask: "/images/purple-flask.jpg",
  prism: "/images/prism-rainbow.jpg",
  plasma: "/images/plasma-globe.jpg",
  colorfulFlasks: "/images/colorful-flasks.jpg",
  leaf: "/images/leaf-droplets.jpg",
};

const QUOTES = [
  {
    category: "THE PHYSICS OF EVERYTHING",
    question: "What if you could see a force instead of just reading about it?",
    note: "Move beyond the formula. Watch the world respond.",
    icon: "motion",
  },
  {
    category: "CHEMISTRY IN MOTION",
    question: "One small change. A completely different reaction.",
    note: "Change the conditions. Follow the evidence.",
    icon: "flask",
  },
  {
    category: "LIFE, UP CLOSE",
    question: "The smallest things can explain the biggest mysteries.",
    note: "Look closer. There is always more to discover.",
    icon: "microscope",
  },
  {
    category: "YOUR CURIOSITY, YOUR LAB",
    question: "Don't just memorise the answer. Find out why it's true.",
    note: "Experiment freely. Learn from every result.",
    icon: "atom",
  },
  {
    category: "THINK LIKE A SCIENTIST",
    question: "A question is where every great discovery begins.",
    note: "Ask it. Test it. See where it takes you.",
    icon: "light",
  },
];

const ALL_EXPERIMENTS = Array.isArray(experiments) ? experiments : [];

const FEATURED = [
  {
    title: "Light and Colour",
    subject: "Physics",
    description: "Explore how light bends, splits and forms a spectrum.",
    image: IMAGES.prism,
    icon: "light",
    search: ["prism"],
    note: "Try changing the angle →",
  },
  {
    title: "Reaction Rates",
    subject: "Chemistry",
    description: "See how conditions can change the speed of a reaction.",
    image: IMAGES.purpleFlask,
    icon: "flask",
    search: ["kinetics", "reaction rate"],
    note: "What happens if you change it?",
  },
  {
    title: "Cells Under a Microscope",
    subject: "Biology",
    description: "Take a closer look at the tiny structures that make life work.",
    image: IMAGES.cells,
    icon: "microscope",
    search: ["microscope", "cell"],
    note: "Zoom in and explore →",
  },
  {
    title: "Conservation of Momentum",
    subject: "Physics",
    description: "Investigate collisions and the transfer of motion.",
    image: IMAGES.cradle,
    icon: "motion",
    search: ["momentum", "roller coaster"],
    note: "Predict what happens!",
  },
];

const SUBJECTS_INFO = [
  {
    subject: "Physics",
    index: "01",
    title: "Understand how the world moves.",
    description: "Explore light, motion, forces and electricity. Find the rules hiding in everyday things.",
    image: IMAGES.plasma,
    icon: "atom",
    doodle: "↗",
  },
  {
    subject: "Chemistry",
    index: "02",
    title: "See matter change.",
    description: "Investigate reactions, solutions, gases and the chemistry behind the things around you.",
    image: IMAGES.colorfulFlasks,
    icon: "flask",
    doodle: "✳",
  },
  {
    subject: "Biology",
    index: "03",
    title: "Explore the science of life.",
    description: "Look closer at cells, living systems, microscopy and what makes life tick.",
    image: IMAGES.leaf,
    icon: "leaf",
    doodle: "〰",
  },
];

/* ==========================================
   DATA HELPERS
========================================== */

function getClasses(experiment) {
  if (Array.isArray(experiment.classes)) {
    return experiment.classes.map(Number);
  }

  const match = String(experiment.level || "").match(/\b(9|10|11|12)\b/);
  return match ? [Number(match[1])] : [];
}

function getDestination(experiment) {
  const destination = experiment?.path || experiment?.href;
  return typeof destination === "string" && destination.trim()
    ? destination.trim()
    : null;
}

function findLabPath(words) {
  const match = ALL_EXPERIMENTS.find((experiment) => {
    const title = String(experiment.title || "").toLowerCase();
    return words.some((word) => title.includes(word));
  });

  return getDestination(match) || "/labs";
}

function getScienceIcon(experiment) {
  const title = String(experiment.title || "").toLowerCase();
  const subject = String(experiment.subject || "").toLowerCase();
  const text = `${title} ${subject}`;

  if (/microscope|mitosis|microscopy|cell/.test(text)) return "microscope";
  if (/osmosis|buoyancy|archimedes|fluid/.test(text)) return "droplet";
  if (/dna|genetic|chromosome|heredity/.test(text)) return "dna";
  if (/plant|photosynthesis|ecosystem|biology/.test(text)) return "leaf";
  if (/prism|lens|refraction|spectrum|light|tyndall|optics/.test(text)) return "light";
  if (/rocket|projectile|roller coaster|motion|kinematic|force|newton|doppler|momentum/.test(text)) return "motion";
  if (/circuit|ohm|electric|wheatstone|magnet|electrolysis|resistance/.test(text)) return "circuit";
  if (/diamond|crystal|crystallization/.test(text)) return "crystal";
  if (/wave|sound|frequency|vibration/.test(text)) return "wave";
  if (/acid|base|titration|solution|mass|matter|gas law|kinetics|reaction|flame|reactivity|chemical|salt|solubility/.test(text)) return "flask";

  if (subject === "chemistry") return "flask";
  if (subject === "biology") return "leaf";
  return "atom";
}

/* ==========================================
   SCIENCE ICONS — INLINE SVG
========================================== */

function ScienceIcon({ name = "atom", size = 28 }) {
  const shared = {
    viewBox: "0 0 48 48",
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
  };

  const paths = {
    atom: (
      <>
        <ellipse cx="24" cy="24" rx="19" ry="8" />
        <ellipse cx="24" cy="24" rx="19" ry="8" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="19" ry="8" transform="rotate(120 24 24)" />
        <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
      </>
    ),
    flask: (
      <>
        <path d="M18 6h12M21 6v13L10 38a3 3 0 0 0 3 4h22a3 3 0 0 0 3-4L27 19V6" />
        <path d="M16 32h16M19 27h10" />
        <circle cx="22" cy="35" r="1" fill="currentColor" stroke="none" />
        <circle cx="29" cy="37" r="1.5" fill="currentColor" stroke="none" />
      </>
    ),
    leaf: (
      <>
        <path d="M39 8C20 7 9 15 9 29c0 7 5 11 11 11C35 40 40 23 39 8Z" />
        <path d="M8 42c7-11 13-17 25-27M20 29l-1-9M26 23l9 1" />
      </>
    ),
    microscope: (
      <>
        <path d="m17 8 8-4 7 14-8 4zM22 22l-8 6a9 9 0 0 0 12 13h8" />
        <path d="m27 20 7 5M31 25l-3 5M8 42h33M33 33h7a5 5 0 0 1 5 5v4M28 34h5" />
      </>
    ),
    droplet: (
      <>
        <path d="M24 4C18 14 8 24 8 31a16 16 0 0 0 32 0C40 24 30 14 24 4Z" />
        <path d="M16 31a8 8 0 0 0 8 8" />
      </>
    ),
    dna: (
      <>
        <path d="M13 5c0 13 22 13 22 26 0 5-3 9-7 12M35 5C35 18 13 18 13 31c0 5 3 9 7 12" />
        <path d="M16 12h16M13 21h22M13 30h22M16 39h16" />
      </>
    ),
    light: (
      <>
        <path d="M5 24h12M31 24h12M24 5v12M24 31v12M10 10l8 8M30 30l8 8M38 10l-8 8M18 30l-8 8" />
        <path d="m19 17 10 0-5 7 5 7H19l5-7z" />
      </>
    ),
    motion: (
      <>
        <path d="M6 36h36M10 32l9-13 8 7 10-17" />
        <path d="M29 9h8v8" />
        <circle cx="19" cy="19" r="3" fill="currentColor" stroke="none" />
        <circle cx="27" cy="26" r="3" fill="currentColor" stroke="none" />
      </>
    ),
    circuit: (
      <>
        <path d="M7 14h10v20H7M41 14H31v20h10M17 24h14" />
        <circle cx="7" cy="14" r="3" />
        <circle cx="7" cy="34" r="3" />
        <circle cx="41" cy="14" r="3" />
        <circle cx="41" cy="34" r="3" />
        <path d="M20 17v14M25 17v14M30 17v14" />
      </>
    ),
    crystal: (
      <>
        <path d="m24 5 14 9-4 20-10 9-10-9-4-20z" />
        <path d="m10 14 14 4 14-4M14 34l10-16 10 16M24 5v13M24 18v25" />
      </>
    ),
    wave: (
      <>
        <path d="M4 24h5c5-22 10-22 15 0s10 22 15 0h5" />
        <path d="M4 13h4M40 35h4" />
      </>
    ),
  };

  return <svg {...shared}>{paths[name] || paths.atom}</svg>;
}

/* ==========================================
   LIVE BACKGROUND NETWORK
========================================== */

function InteractiveNetwork({ hostRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!host || !canvas || !ctx) return undefined;

    const colors = [
      { hex: "#002147", rgb: "0,33,71" },
      { hex: "#DC143C", rgb: "220,20,60" },
      { hex: "#FFC72C", rgb: "255,199,44" },
    ];

    const meshTints = [
      "rgba(0,33,71,0.021)",
      "rgba(220,20,60,0.015)",
      "rgba(255,199,44,0.04)",
    ];

    const pointer = {
      x: -1000,
      y: -1000,
      lastX: -1000,
      lastY: -1000,
      vx: 0,
      vy: 0,
      active: false,
      down: false,
    };

    let nodes = [];
    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    let time = 0;
    let rafId = 0;
    let destroyed = false;
    let ripples = [];

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function random(value) {
      const result = Math.sin(value * 127.1 + 311.7) * 43758.5453;
      return result - Math.floor(result);
    }

    function resize() {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      if (!width || !height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.max(7, Math.floor(width / 77));
      rows = Math.max(5, Math.floor(height / 76));
      nodes = [];

      const margin = 12;
      const usableWidth = Math.max(1, width - margin * 2);
      const usableHeight = Math.max(1, height - margin * 2);

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const id = row * cols + col;
          const baseX =
            margin +
            (col / Math.max(1, cols - 1)) * usableWidth +
            (random(id + 1) - 0.5) * 18;
          const baseY =
            margin +
            (row / Math.max(1, rows - 1)) * usableHeight +
            (random(id + 29) - 0.5) * 18;
          const shade = random(id + 83);

          nodes.push({
            id, row, col, baseX, baseY,
            x: baseX, y: baseY,
            vx: 0, vy: 0,
            colorIndex: shade < 0.61 ? 0 : shade < 0.85 ? 1 : 2,
          });
        }
      }
    }

    function triangle(a, b, c, fill) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(c.x, c.y);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    }

    function drawMesh() {
      for (let row = 0; row < rows - 1; row += 1) {
        for (let col = 0; col < cols - 1; col += 1) {
          const a = nodes[row * cols + col];
          const b = nodes[row * cols + col + 1];
          const c = nodes[(row + 1) * cols + col];
          const d = nodes[(row + 1) * cols + col + 1];
          const tint = (row + col * 2) % meshTints.length;

          triangle(a, b, c, meshTints[tint]);
          triangle(b, d, c, meshTints[(tint + 1) % 3]);
        }
      }

      const maxDistance = Math.min(125, width / 4 + 55);

      for (const a of nodes) {
        for (let ro = 0; ro <= 2; ro += 1) {
          for (let co = -2; co <= 2; co += 1) {
            if (ro === 0 && co <= 0) continue;

            const tr = a.row + ro;
            const tc = a.col + co;
            if (tr < 0 || tr >= rows || tc < 0 || tc >= cols) continue;

            const b = nodes[tr * cols + tc];
            const distance = Math.hypot(b.x - a.x, b.y - a.y);
            if (distance > maxDistance) continue;

            const alpha = 0.025 + (1 - distance / maxDistance) * 0.15;
            const color = colors[a.colorIndex];

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color.rgb},${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const color = colors[node.colorIndex];

        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = color.hex;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, 4.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.rgb},0.06)`;
        ctx.fill();
      }
    }

    function drawRipples() {
      ripples = ripples.filter((ripple) => ripple.alpha > 0.015);

      for (const ripple of ripples) {
        ripple.radius += 1;
        ripple.alpha *= 0.96;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,33,71,${ripple.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function animate() {
      if (destroyed) return;

      time += reducedMotion ? 0 : 0.009;
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        const driftX = reducedMotion ? 0 : Math.sin(time + node.id * 0.71) * 1.35;
        const driftY = reducedMotion ? 0 : Math.cos(time * 0.8 + node.id * 0.53) * 1.35;

        node.vx += (node.baseX + driftX - node.x) * 0.012;
        node.vy += (node.baseY + driftY - node.y) * 0.012;

        if (pointer.active) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const radius = pointer.down ? 185 : 145;

          if (distance < radius && distance > 0.5) {
            const influence = 1 - distance / radius;
            const force = influence * (pointer.down ? 2.3 : 0.9);

            node.vx += (dx / distance) * force;
            node.vy += (dy / distance) * force;
            node.vx += Math.max(-22, Math.min(22, pointer.vx)) * influence * 0.03;
            node.vy += Math.max(-22, Math.min(22, pointer.vy)) * influence * 0.03;
          }
        }

        node.vx *= 0.92;
        node.vy *= 0.92;
        node.x += node.vx;
        node.y += node.vy;
      }

      drawMesh();
      drawRipples();
      pointer.vx *= 0.75;
      pointer.vy *= 0.75;
      rafId = window.requestAnimationFrame(animate);
    }

    function updatePointer(event) {
      const rect = host.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (pointer.lastX !== -1000) {
        pointer.vx = x - pointer.lastX;
        pointer.vy = y - pointer.lastY;
      }

      pointer.x = x;
      pointer.y = y;
      pointer.lastX = x;
      pointer.lastY = y;
      pointer.active = true;
    }

    function leavePointer() {
      pointer.active = false;
      pointer.down = false;
      pointer.x = -1000;
      pointer.y = -1000;
      pointer.lastX = -1000;
      pointer.lastY = -1000;
    }

    function pointerDown(event) {
      updatePointer(event);
      pointer.down = true;
      ripples.push({ x: pointer.x, y: pointer.y, radius: 5, alpha: 0.23 });
    }

    function pointerUp() {
      pointer.down = false;
    }

    const observer = new ResizeObserver(resize);
    observer.observe(host);

    host.addEventListener("pointermove", updatePointer);
    host.addEventListener("pointerleave", leavePointer);
    host.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointerup", pointerUp);
    window.addEventListener("pointercancel", leavePointer);

    resize();
    animate();

    return () => {
      destroyed = true;
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      host.removeEventListener("pointermove", updatePointer);
      host.removeEventListener("pointerleave", leavePointer);
      host.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointerup", pointerUp);
      window.removeEventListener("pointercancel", leavePointer);
    };
  }, [hostRef]);

  return (
    <div className="interactive-network" aria-hidden="true">
      <canvas ref={canvasRef} className="network-canvas" />
    </div>
  );
}

/* ==========================================
   NAVIGATION
========================================== */

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return null;
}

function SiteHeader() {
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="STEM Labs home">
        <span className="brand-symbol"><ScienceIcon name="atom" size={22} /></span>
        <span className="brand-name">stem<span>labs</span></span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/#student-benefits">For students</Link>
        <Link to="/#how-it-works">How it works</Link>
        <Link to="/labs">Labs</Link>
      </nav>

      <Link to="/labs" className="header-action">
        Explore labs <span>↗</span>
      </Link>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link to="/" className="brand">
        <span className="brand-symbol"><ScienceIcon name="atom" size={20} /></span>
        <span className="brand-name">stem<span>labs</span></span>
      </Link>

      <span>Made for curious minds. <b>✳</b> Keep asking why.</span>
      <Link to="/labs" className="back-to-top">Explore the labs ↗</Link>
    </footer>
  );
}

/* ==========================================
   ROTATING QUESTION PANEL
========================================== */

function DiscoveryQuotePanel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const quote = QUOTES[active];

  useEffect(() => {
    if (paused) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % QUOTES.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <aside
      className="discovery-panel"
      aria-label="Science inspiration"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="discovery-panel-top">
        <span className="discovery-live-dot" />
        <span>THINGS WORTH WONDERING ABOUT</span>
        <span className="discovery-counter">
          {String(active + 1).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}
        </span>
      </div>

      <div className="discovery-art" aria-hidden="true">
        <div className="discovery-orbit orbit-a" />
        <div className="discovery-orbit orbit-b" />
        <div className="discovery-orbit orbit-c" />
        <div className="discovery-core"><ScienceIcon name={quote.icon} size={38} /></div>
        <span className="discovery-node node-a" />
        <span className="discovery-node node-b" />
        <span className="discovery-node node-c" />
        <span className="discovery-node node-d" />
        <span className="discovery-art-label">OBSERVE · QUESTION · EXPLORE</span>
      </div>

      <div className="discovery-quote" key={quote.category}>
        <span className="discovery-category">{quote.category}</span>
        <blockquote>“{quote.question}”</blockquote>
        <p>{quote.note}</p>
      </div>

      <div className="discovery-bottom">
        <div className="discovery-progress">
          {QUOTES.map((item, index) => (
            <button
              type="button"
              key={item.category}
              className={index === active ? "active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Show thought ${index + 1}`}
              aria-pressed={index === active}
            />
          ))}
        </div>

        <button
          type="button"
          className="discovery-next"
          onClick={() => setActive((current) => (current + 1) % QUOTES.length)}
          aria-label="Next science thought"
        >
          ↗
        </button>
      </div>
    </aside>
  );
}

/* ==========================================
   HERO IMAGE COLLAGE
========================================== */

function HeroPhoto() {
  return (
    <div className="hero-photo-composition">
      <div className="hero-photo-tape" aria-hidden="true" />
      <div className="hero-photo-frame">
        <img src={IMAGES.purpleFlask} alt="A colourful flask in a science laboratory" />
        <span className="hero-photo-caption">A LITTLE CURIOSITY CHANGES EVERYTHING.</span>
      </div>

      <div className="hero-sticky hero-sticky-top">
        <span>SAME QUESTIONS.</span>
        <strong>DIFFERENT<br />PERSPECTIVE.</strong>
      </div>

      <div className="hero-sticky hero-sticky-bottom">
        <ScienceIcon name="light" size={22} />
        <span>Try something.<br />See what happens.</span>
      </div>

      <svg className="hero-doodle-arrow" viewBox="0 0 90 90" aria-hidden="true">
        <path d="M9 11 C45 20 55 48 75 74 M55 65 L75 74 L78 53" />
      </svg>
      <span className="hero-spark hero-spark-one">✳</span>
      <span className="hero-spark hero-spark-two">✳</span>
    </div>
  );
}

/* ==========================================
   SUBJECT PHOTO CARDS
========================================== */

function SubjectCard({ item }) {
  return (
    <article className={`subject-card subject-${item.subject.toLowerCase()}`}>
      <Link
        to={`/labs?subject=${encodeURIComponent(item.subject)}`}
        className="subject-image-wrap"
        aria-label={`Explore ${item.subject}`}
      >
        <img src={item.image} alt="" loading="lazy" />

        <span className="subject-image-label">
          <span className="subject-image-icon"><ScienceIcon name={item.icon} size={20} /></span>
          <span className="subject-image-copy">
            <small>{item.index} / {item.subject.toUpperCase()}</small>
            <strong>Explore the subject</strong>
          </span>
          <span className="subject-image-arrow">↗</span>
        </span>
      </Link>

      <div className="subject-card-body">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <Link to={`/labs?subject=${encodeURIComponent(item.subject)}`}>
          Explore {item.subject} <b>↗</b>
        </Link>
      </div>
    </article>
  );
}

/* ==========================================
   FEATURED EXPERIMENT POLAROIDS
========================================== */

function FeaturedExperiment({ item, index }) {
  const href = findLabPath(item.search);

  return (
    <article className={`featured-card featured-card-${index + 1}`}>
      <div className="featured-photo">
        <img src={item.image} alt="" loading="lazy" />
        <span className="featured-subject-tag">{item.subject.toUpperCase()}</span>
        <span className="featured-photo-number">0{index + 1}</span>
      </div>

      <div className="featured-card-copy">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <span className="featured-handwritten">{item.note}</span>
        <Link to={href} className="featured-arrow" aria-label={`Explore ${item.title}`}>
          ↗
        </Link>
      </div>
    </article>
  );
}

/* ==========================================
   PAGE ONE: LANDING PAGE
========================================== */

function HomePage() {
  const heroRef = useRef(null);

  return (
    <div className="home-page">
      <SiteHeader />

      <main>
        <section className="landing-hero" ref={heroRef}>
          <InteractiveNetwork hostRef={heroRef} />

          <div className="landing-hero-inner">
            <div className="landing-copy">
              <div className="landing-eyebrow">
                <span />
                CARAWIN TECHNOLOGIES · STEM LABS
              </div>

            <h1 className="landing-headline">
                SCIENCE ISN'T
                <br />
                JUST SOMETHING
                <br />
                YOU <em>STUDY.</em>
                <br />
                <span>IT'S SOMETHING</span>
                <br />
                YOU <em>DISCOVER.</em>
              </h1>

              <p className="landing-description">
                Change a variable. See what happens. Explore real science
                through interactive experiments built for curious students.
              </p>

              <div className="landing-actions">
                <Link to="/labs" className="button-primary landing-primary">
                  EXPLORE LABS <span>↗</span>
                </Link>
                <a href="#how-it-works" className="button-secondary landing-secondary">
                  HOW IT WORKS <span>↓</span>
                </a>
              </div>

              <div className="landing-stats">
                <div>
                  <strong>{ALL_EXPERIMENTS.length}</strong>
                  <span>Experiments to explore</span>
                </div>
                <div>
                  <strong>4</strong>
                  <span>Classes · 9–12</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>Science subjects</span>
                </div>
              </div>

              <div className="hero-subject-chips">
                <span><i className="chip-dot chip-blue" /> Physics</span>
                <span><i className="chip-dot chip-red" /> Chemistry</span>
                <span><i className="chip-dot chip-yellow" /> Biology</span>
              </div>
            </div>

            <HeroPhoto />
            <DiscoveryQuotePanel />
          </div>

          <div className="hero-bottom-note">
            <span className="hero-bottom-star">✳</span>
            <span>GOOD QUESTIONS LEAD SOMEWHERE.</span>
            <span className="hero-bottom-line" />
            <a href="#student-benefits">SCROLL TO EXPLORE ↓</a>
          </div>
        </section>

        <section className="student-benefits section-container" id="student-benefits">
          <div className="section-heading playful-heading">
            <div>
              <div className="eyebrow">LESS PASSIVE LEARNING</div>
              <h2>More “wait, that's actually cool.”</h2>
            </div>
            <p>
              Make a guess. Try something. See the result for yourself.
              Science starts to click when you can explore it.
            </p>
          </div>

          <div className="benefit-grid">
            <article className="benefit-card benefit-blue">
              <span className="benefit-icon"><ScienceIcon name="atom" size={31} /></span>
              <span className="benefit-number">01 / NOTICE</span>
              <h3>See the idea.</h3>
              <p>Turn textbook concepts into something you can actually observe.</p>
              <span className="benefit-decoration" aria-hidden="true">?</span>
            </article>

            <article className="benefit-card benefit-red">
              <span className="benefit-icon"><ScienceIcon name="circuit" size={31} /></span>
              <span className="benefit-number">02 / TEST</span>
              <h3>Try a different way.</h3>
              <p>Change the available variables and notice what changes with them.</p>
              <span className="benefit-decoration" aria-hidden="true">↗</span>
            </article>

            <article className="benefit-card benefit-yellow">
              <span className="benefit-icon"><ScienceIcon name="light" size={31} /></span>
              <span className="benefit-number">03 / CONNECT</span>
              <h3>Find your “aha!”</h3>
              <p>Use what you observe to understand the science behind it.</p>
              <span className="benefit-decoration" aria-hidden="true">✳</span>
            </article>
          </div>
        </section>

        <section className="subject-overview">
          <div className="section-container">
            <div className="section-heading playful-heading">
              <div>
                <div className="eyebrow">THREE WAYS INTO SCIENCE</div>
                <h2>Pick your field of discovery.</h2>
              </div>
              <span className="handwritten-side-note">Same curiosity.<br />Different worlds.</span>
              <Link to="/labs" className="text-link">Browse all labs <span>↗</span></Link>
            </div>

            <div className="subject-grid">
              {SUBJECTS_INFO.map((item) => <SubjectCard key={item.subject} item={item} />)}
            </div>
          </div>
        </section>

        <section className="featured-section section-container">
          <div className="section-heading playful-heading">
            <div>
              <div className="eyebrow">A LITTLE SOMETHING TO START WITH</div>
              <h2>Featured experiments.</h2>
            </div>
            <span className="handwritten-side-note">Real concepts.<br />Real exploration.</span>
            <Link to="/labs" className="text-link">See every experiment <span>↗</span></Link>
          </div>

          <div className="featured-grid">
            {FEATURED.map((item, index) => (
              <FeaturedExperiment item={item} index={index} key={item.title} />
            ))}
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="notebook-inner">
            <div className="how-intro">
              <div className="taped-label">HOW IT WORKS</div>
              <h2>
                Three simple
                <br />
                <span>steps.</span>
              </h2>
              <p>No lab coat required to get curious.</p>
            </div>

            <div className="how-steps">
              <article className="how-step">
                <span className="step-number">01</span>
                <span className="step-icon"><ScienceIcon name="atom" size={25} /></span>
                <h3>Choose a lab</h3>
                <p>Pick your class, subject and the concept you want to explore.</p>
              </article>

              <span className="step-connector" aria-hidden="true">↗</span>

              <article className="how-step">
                <span className="step-number">02</span>
                <span className="step-icon"><ScienceIcon name="circuit" size={25} /></span>
                <h3>Interact and test</h3>
                <p>Change the variables and see what happens in real time.</p>
              </article>

              <span className="step-connector" aria-hidden="true">↗</span>

              <article className="how-step">
                <span className="step-number">03</span>
                <span className="step-icon"><ScienceIcon name="light" size={25} /></span>
                <h3>Connect the science</h3>
                <p>Relate your observations to what you learn in class.</p>
              </article>
            </div>

            <span className="notebook-doodle notebook-doodle-a" aria-hidden="true">✳</span>
            <span className="notebook-doodle notebook-doodle-b" aria-hidden="true">〰</span>
          </div>
        </section>

        <section className="landing-cta">
          <div className="cta-stars" aria-hidden="true">
            <span>✳</span><span>·</span><span>✦</span><span>·</span><span>✳</span>
          </div>

          <div className="cta-note">
            <span>GOOD QUESTIONS<br />LEAD SOMEWHERE.</span>
            <b>↗</b>
          </div>

          <div className="cta-copy">
            <span className="cta-eyebrow">YOUR NEXT “WHAT IF?” STARTS HERE</span>
            <h2>Ready to explore<br />your first experiment?</h2>
            <p>Choose a class and step into the virtual lab.</p>
            <Link to="/labs" className="button-primary">
              EXPLORE LABS <span>↗</span>
            </Link>
          </div>

          <div className="cta-visual">
            <img src={IMAGES.plasma} alt="" loading="lazy" />
            <div className="cta-visual-orbit" />
            <div className="cta-mini-card">
              <ScienceIcon name="atom" size={24} />
              <span>KEEP ASKING WHY.</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* ==========================================
   EXPERIMENT CARDS
========================================== */

function ExperimentCard({ experiment, index, selectedClass }) {
  const destination = getDestination(experiment);
  const classes = getClasses(experiment);
  const theme = SUBJECT_THEME[experiment.subject] || SUBJECT_THEME.Physics;
  const palette = CARD_PALETTES[index % CARD_PALETTES.length];

  const style = {
    "--card-accent": palette.accent,
    "--card-tint": palette.tint,
    "--card-glow": palette.glow,
    "--subject-color": theme.color,
    "--subject-tint": theme.tint,
    "--card-index": index,
  };

  const description =
    experiment.description ||
    `Investigate ${String(experiment.title || "this concept").toLowerCase()} through an interactive experiment.`;

  const classLabel = selectedClass
    ? `CLASS ${selectedClass}`
    : classes.length
      ? `CLASS ${classes.join(" · ")}`
      : "VIRTUAL LAB";

  const content = (
    <>
      <div className="card-topline">
        <span className="card-icon"><ScienceIcon name={getScienceIcon(experiment)} size={29} /></span>
        <span className="subject-pill">{experiment.subject || "Science"}</span>
      </div>

      <div className="card-content">
        <div className="card-meta">
          <span>{classLabel}</span>
          <span className="card-meta-status"><span className="status-dot" /> INTERACTIVE</span>
        </div>
        <h3>{experiment.title}</h3>
        <p className="card-description">{description}</p>
      </div>

      <div className="card-footer">
        <span>{destination ? "Open experiment" : "Link unavailable"}</span>
        <span className="card-arrow" aria-hidden="true">{destination ? "↗" : "—"}</span>
      </div>
    </>
  );

  if (!destination) {
    return (
      <article className="experiment-card card-unavailable" style={style}>
        {content}
        <p className="missing-link-note">No simulation path is configured in experiments.js.</p>
      </article>
    );
  }

  return (
    <a href={destination} className="experiment-card" style={style} aria-label={`Open ${experiment.title}`}>
      {content}
    </a>
  );
}

/* ==========================================
   PAGE TWO: LAB DIRECTORY
========================================== */

function LabsPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const requestedClass = Number(params.get("class"));
  const requestedSubject = params.get("subject");

  const [selectedClass, setSelectedClass] = useState(
    CLASSES.includes(requestedClass) ? requestedClass : null
  );
  const [activeSubject, setActiveSubject] = useState(
    SUBJECTS.includes(requestedSubject) ? requestedSubject : "All"
  );
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const classCounts = useMemo(
    () => CLASSES.reduce((counts, classId) => {
      counts[classId] = ALL_EXPERIMENTS.filter((experiment) =>
        getClasses(experiment).includes(classId)
      ).length;
      return counts;
    }, {}),
    []
  );

  const matchingExperiments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return ALL_EXPERIMENTS.filter((experiment) => {
      const matchesClass =
        selectedClass === null || getClasses(experiment).includes(selectedClass);

      const searchable = [
        experiment.title,
        experiment.subject,
        experiment.description,
        experiment.level,
        ...getClasses(experiment),
      ].join(" ").toLowerCase();

      return matchesClass && searchable.includes(query);
    });
  }, [selectedClass, search]);

  const filtered = useMemo(
    () => matchingExperiments.filter(
      (experiment) => activeSubject === "All" || experiment.subject === activeSubject
    ),
    [matchingExperiments, activeSubject]
  );

  const visible = showAll ? filtered : filtered.slice(0, PREVIEW_COUNT);

  function resetFilters() {
    setSelectedClass(null);
    setActiveSubject("All");
    setSearch("");
    setShowAll(false);
  }

  return (
    <div className="labs-page">
      <SiteHeader />

      <main>
        <section className="labs-page-hero">
          <div className="labs-breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Explore labs</span>
          </div>

          <div className="eyebrow"><span className="eyebrow-mark" /> YOUR NEXT DISCOVERY</div>
          <h1>Ready to find out<br /><span>what happens?</span></h1>
          <p>Choose your class, follow your curiosity and jump into a virtual experiment. Every lab starts with a question.</p>

          <div className="directory-stats">
            <div><strong>{ALL_EXPERIMENTS.length}</strong><span>Experiments</span></div>
            <div><strong>4</strong><span>Classes · 9–12</span></div>
            <div><strong>3</strong><span>Science subjects</span></div>
          </div>
        </section>

        <section className="directory-section" id="experiments">
          <div className="section-heading directory-heading">
            <div>
              <div className="eyebrow">FIRST, PICK YOUR GRADE</div>
              <h2>What's on your timetable?</h2>
            </div>
            <p>Choose your class to narrow the experiments. Select it again to clear the selection.</p>
          </div>

          <div className="class-grid directory-class-grid">
            {CLASSES.map((classId, index) => (
              <button
                type="button"
                key={classId}
                className={`class-option ${selectedClass === classId ? "selected" : ""}`}
                onClick={() => {
                  setSelectedClass((current) => current === classId ? null : classId);
                  setShowAll(false);
                }}
                aria-pressed={selectedClass === classId}
              >
                <span className="class-option-icon">
                  <ScienceIcon name={["atom", "light", "flask", "dna"][index]} size={25} />
                </span>
                <span className="class-option-copy">
                  <strong>Class {classId}</strong>
                  <small>{classCounts[classId] || 0} experiments</small>
                </span>
                <span className="class-option-arrow">{selectedClass === classId ? "✓" : "↗"}</span>
              </button>
            ))}
          </div>

          <div className="directory-controls">
            <div>
              <div className="eyebrow">NEXT, FOLLOW A QUESTION</div>
              <h2>Find an experiment.</h2>
            </div>

            <label className="search-field directory-search">
              <ScienceIcon name="atom" size={19} />
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setShowAll(false);
                }}
                placeholder="Search an experiment or concept..."
                aria-label="Search experiments"
              />
              {search && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => {
                    setSearch("");
                    setShowAll(false);
                  }}
                  aria-label="Clear search"
                >×</button>
              )}
            </label>
          </div>

          <div className="directory-filter-row">
            <div className="filter-tabs" aria-label="Filter by subject">
              {SUBJECTS.map((subject) => {
                const count = subject === "All"
                  ? matchingExperiments.length
                  : matchingExperiments.filter((e) => e.subject === subject).length;

                return (
                  <button
                    type="button"
                    key={subject}
                    className={`filter-tab ${activeSubject === subject ? "active" : ""}`}
                    onClick={() => {
                      setActiveSubject(subject);
                      setShowAll(false);
                    }}
                    aria-pressed={activeSubject === subject}
                  >
                    {subject}<span>{count}</span>
                  </button>
                );
              })}
            </div>

            {(selectedClass !== null || activeSubject !== "All" || search.trim()) && (
              <button type="button" className="reset-directory" onClick={resetFilters}>
                Clear filters ×
              </button>
            )}
          </div>

          <div className="result-summary" aria-live="polite">
            <span><strong>{filtered.length}</strong> {filtered.length === 1 ? "experiment" : "experiments"}{selectedClass ? ` for Class ${selectedClass}` : ""}</span>
            <span className="directory-hint">Pick a card to open its simulation</span>
          </div>

          <div className="experiment-grid">
            {visible.map((experiment, index) => (
              <ExperimentCard
                key={`${experiment.subject}-${experiment.title}`}
                experiment={experiment}
                index={index}
                selectedClass={selectedClass}
              />
            ))}

            {filtered.length === 0 && (
              <div className="empty-state">
                <span className="empty-state-icon"><ScienceIcon name="atom" size={32} /></span>
                <h3>No matching experiments</h3>
                <p>Try another search term, subject or class.</p>
                <button type="button" className="button-primary" onClick={resetFilters}>Show all experiments</button>
              </div>
            )}
          </div>

          {filtered.length > PREVIEW_COUNT && (
            <div className="library-more">
              <span>Showing {visible.length} of {filtered.length} experiments</span>
              <button
                type="button"
                className="library-more-button"
                onClick={() => setShowAll((current) => !current)}
                aria-expanded={showAll}
              >
                {showAll ? "Show fewer experiments" : `View all ${filtered.length} experiments`}
                <span>{showAll ? "↑" : "↗"}</span>
              </button>
            </div>
          )}
        </section>

        <section className="directory-bottom-cta">
          <div>
            <span className="eyebrow">KEEP WONDERING</span>
            <h2>There's always another thing to discover.</h2>
            <p>Explore how the labs work, then return to your next experiment.</p>
          </div>
          <Link to="/#how-it-works" className="button-primary">How it works <span>↗</span></Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
