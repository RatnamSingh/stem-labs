/**
 * Application Entry Point for Redox Titration Simulator
 */

import { RedoxEngine } from './redox_engine.js';
import { RedoxRenderer } from './renderer.js';
import { RedoxUI } from './ui.js';
import { state } from './state.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('simulation-canvas');
  if (!canvas) return;

  const engine = new RedoxEngine();
  const renderer = new RedoxRenderer(canvas, engine, state);
  const ui = new RedoxUI(engine, state);

  // Responsive resize listener
  const onResize = () => {
    renderer.resize();
  };
  window.addEventListener('resize', onResize);
  if (window.ResizeObserver && canvas.parentElement) {
    const ro = new ResizeObserver(() => onResize());
    ro.observe(canvas.parentElement);
  }
  setTimeout(onResize, 100);
  setTimeout(onResize, 350);

  // Animation Loop
  let lastTimestamp = performance.now();

  function loop(now) {
    const deltaSeconds = Math.min(0.1, (now - lastTimestamp) / 1000);
    lastTimestamp = now;

    engine.update(deltaSeconds);
    renderer.draw();
    ui.update(engine.getMetrics());

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
});
