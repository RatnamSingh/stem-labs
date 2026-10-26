export class SimulationEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.requestRef = null;
    
    // State
    this.phase = 'solid';
    this.energy = 0;
    this.viewMode = 'Particle View';
    this.isZoomed = false;
    
    this.initParticles();
    this.render = this.render.bind(this);
  }
  
  initParticles() {
    const rows = 4;
    const cols = 6;
    const spacing = 28; // Distance between centers
    
    const gridWidth = (cols - 1) * spacing + (spacing / 2);
    const startX = (this.canvas.width - gridWidth) / 2;
    const startY = this.canvas.height - ((rows - 1) * (spacing * 0.866)) - 40;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const offsetX = (r % 2 === 1) ? spacing / 2 : 0;
        const xPos = startX + c * spacing + offsetX;
        const yPos = startY + r * (spacing * 0.866);

        this.particles.push({
          id: r * cols + c,
          baseX: xPos,
          baseY: yPos,
          x: xPos,
          y: yPos,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: 12, // Original size
          mass: 1
        });
      }
    }
  }
  
  updateState(phase, energy, viewMode, isZoomed) {
    this.phase = phase;
    this.energy = energy;
    this.viewMode = viewMode;
    this.isZoomed = isZoomed;
    
    this.canvas.style.transform = isZoomed ? 'scale(2.2)' : 'scale(1)';
    
    if (viewMode === 'Particle View') {
      this.canvas.style.display = 'block';
      if (!this.requestRef) {
        this.requestRef = requestAnimationFrame(this.render);
      }
    } else {
      this.canvas.style.display = 'none';
      if (this.requestRef) {
        cancelAnimationFrame(this.requestRef);
        this.requestRef = null;
      }
    }
  }
  
  render() {
    if (this.viewMode !== 'Particle View') return;
    
    const { ctx, canvas, phase, energy } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    this.particles.forEach(p => {
      if (phase === 'solid') {
        const maxDist = 2 + (energy * 5);
        p.x = p.baseX + (Math.random() - 0.5) * maxDist;
        p.y = p.baseY + (Math.random() - 0.5) * maxDist;
        p.vx = (Math.random() - 0.5) * 2;
        p.vy = (Math.random() - 0.5) * 2;
      } else if (phase === 'liquid') {
        p.vx += (Math.random() - 0.5) * 0.5;
        p.vy += (Math.random() - 0.5) * 0.5;
        p.vy += 0.2; // gravity
        p.vx *= 0.95; // damping
        p.vy *= 0.95;
        
        p.x += p.vx * (1 + energy * 2);
        p.y += p.vy * (1 + energy * 2);
        
        // collision with other particles so they pool
        this.particles.forEach(other => {
          if (p.id !== other.id) {
            const dx = p.x - other.x;
            const dy = p.y - other.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const minDist = p.radius + other.radius;
            if (dist < minDist && dist > 0) {
              const overlap = minDist - dist;
              p.x += (dx/dist) * overlap * 0.5;
              p.y += (dy/dist) * overlap * 0.5;
            }
          }
        });
        
        // Liquid constraint: don't fly too high
        if (p.y < canvas.height / 2) { p.y = canvas.height / 2; p.vy *= -0.5; }
        
      } else if (phase === 'gas') {
        p.vx += (Math.random() - 0.5) * 1.5;
        p.vy += (Math.random() - 0.5) * 1.5;
        
        // Limit max speed
        const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
        if (speed > 5) { p.vx = (p.vx/speed)*5; p.vy = (p.vy/speed)*5; }
        
        p.x += p.vx * (2 + energy * 5);
        p.y += p.vy * (2 + energy * 5);
      }

      // Boundary collisions for liquid and gas
      if (phase !== 'solid') {
        if (p.x < p.radius) { p.x = p.radius; p.vx *= -1; }
        if (p.x > canvas.width - p.radius) { p.x = canvas.width - p.radius; p.vx *= -1; }
        if (p.y < p.radius) { p.y = p.radius; p.vy *= -1; }
        if (p.y > canvas.height - p.radius) { p.y = canvas.height - p.radius; p.vy *= -0.5; }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      
      if (phase === 'solid') ctx.fillStyle = '#60A5FA';
      else if (phase === 'liquid') ctx.fillStyle = '#3B82F6';
      else ctx.fillStyle = '#94A3B8';
      
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.stroke();
    });
    
    this.requestRef = requestAnimationFrame(this.render);
  }
}
