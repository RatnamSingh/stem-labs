import { SUBSTANCES, getPhase, getLabReadings, getObservation } from './data.js';
import { SimulationEngine } from './simulation.js';

// State
let substanceId = 'water';
let viewMode = 'Particle View';
let temperature = 20;
let isHeating = false;
let isCooling = false;
let interval = null;

// DOM Elements
const elements = {
  substanceList: document.getElementById('substanceList'),
  expTitle: document.getElementById('expTitle'),
  btnNormalView: document.getElementById('btnNormalView'),
  btnParticleView: document.getElementById('btnParticleView'),
  tempSlider: document.getElementById('tempSlider'),
  tempMarkers: document.getElementById('tempMarkers'),
  tempDisplayBox: document.getElementById('tempDisplayBox'),
  thermFluid: document.getElementById('thermFluid'),
  thermValue: document.getElementById('thermValue'),
  thermLabel: document.getElementById('thermLabel'),
  frostOverlay: document.getElementById('frostOverlay'),
  simCanvas: document.getElementById('simCanvas'),
  normalFluid: document.getElementById('normalFluid'),
  normalLabel: document.getElementById('normalLabel'),
  gasParticles: document.getElementById('gasParticles'),
  iceContainer: document.getElementById('iceContainer'),
  flamesContainer: document.getElementById('flamesContainer'),
  btnCool: document.getElementById('btnCool'),
  btnHeat: document.getElementById('btnHeat'),
  heatIndicator: document.getElementById('heatIndicator'),
  stateTitle: document.getElementById('stateTitle'),
  stateDesc: document.getElementById('stateDesc'),
  readMotion: document.getElementById('readMotion'),
  readSpacing: document.getElementById('readSpacing'),
  readShape: document.getElementById('readShape'),
  readVolume: document.getElementById('readVolume'),
  explanationText: document.getElementById('explanationText'),
  exSolid: document.getElementById('exSolid'),
  exLiquid: document.getElementById('exLiquid'),
  exGas: document.getElementById('exGas')
};

// Initialize Simulation Engine
const simEngine = new SimulationEngine(elements.simCanvas);

function init() {
  renderSubstanceList();
  setupEventListeners();
  updateSubstanceConfig();
  updateUI();
  startUpdateLoop();
}

function renderSubstanceList() {
  elements.substanceList.innerHTML = '';
  Object.values(SUBSTANCES).forEach(sub => {
    const div = document.createElement('div');
    div.className = `substance-item ${substanceId === sub.id ? 'active' : ''}`;
    div.onclick = () => {
      substanceId = sub.id;
      // Default temps
      if (substanceId === 'water') temperature = 20;
      else if (substanceId === 'co2') temperature = -100;
      else if (substanceId === 'oxygen') temperature = -220;
      else if (substanceId === 'mercury') temperature = 20;
      else if (substanceId === 'ethanol') temperature = 20;
      
      renderSubstanceList();
      updateSubstanceConfig();
      updateUI();
    };
    
    div.innerHTML = `
      <div class="sub-icon">${sub.icon}</div>
      <div class="sub-info">
        <div class="sub-name">${sub.name} <span>(${sub.formula})</span></div>
        <div class="sub-desc">${sub.description}</div>
      </div>
    `;
    elements.substanceList.appendChild(div);
  });
}

function updateSubstanceConfig() {
  const substance = SUBSTANCES[substanceId];
  elements.tempSlider.min = substance.minTemp;
  elements.tempSlider.max = substance.maxTemp;
  
  elements.expTitle.textContent = `Experiment: ${substance.name}`;
  elements.exSolid.textContent = substance.examples.solid;
  elements.exLiquid.textContent = substance.examples.liquid;
  elements.exGas.textContent = substance.examples.gas;
  
  // Update markers
  elements.tempMarkers.innerHTML = `
    <div class="temp-marker" style="left: 0%">${substance.minTemp}°C</div>
    <div class="temp-marker" style="left: ${((substance.freezingPoint - substance.minTemp) / (substance.maxTemp - substance.minTemp)) * 100}%">${substance.freezingPoint}°C</div>
    <div class="temp-marker" style="left: ${((substance.boilingPoint - substance.minTemp) / (substance.maxTemp - substance.minTemp)) * 100}%">${substance.boilingPoint}°C</div>
    <div class="temp-marker" style="left: 100%">${substance.maxTemp}°C</div>
  `;
}

function updateUI() {
  const substance = SUBSTANCES[substanceId];
  const phase = getPhase(temperature, substance);
  const energy = (temperature - substance.minTemp) / (substance.maxTemp - substance.minTemp);
  const readings = getLabReadings(phase);
  
  // Slider & Thermometer
  elements.tempSlider.value = temperature;
  const tempRounded = Math.round(temperature);
  elements.tempDisplayBox.textContent = `${tempRounded} °C`;
  elements.thermValue.textContent = `${tempRounded}°C`;
  elements.thermFluid.style.height = `${Math.max(0, Math.min(100, energy * 100))}%`;
  
  if (temperature <= substance.freezingPoint) elements.thermLabel.textContent = 'Freezing point';
  else if (temperature >= substance.boilingPoint) elements.thermLabel.textContent = 'Boiling point';
  else elements.thermLabel.textContent = 'Liquid range';
  
  // State readings
  elements.stateTitle.textContent = phase.toUpperCase();
  elements.stateDesc.textContent = `Particles are ${readings.spacing.toLowerCase()} in a ${readings.shape.toLowerCase()} arrangement.`;
  elements.readMotion.textContent = readings.motion;
  elements.readSpacing.textContent = readings.spacing;
  elements.readShape.textContent = readings.shape;
  elements.readVolume.textContent = readings.volume;
  elements.explanationText.textContent = getObservation(phase);
  
  // Visuals
  elements.btnNormalView.className = viewMode === 'Normal View' ? 'active' : '';
  elements.btnParticleView.className = viewMode === 'Particle View' ? 'active' : '';
  
  // Beaker visuals
  if (viewMode === 'Normal View') {
    elements.normalFluid.className = `normal-fluid ${phase}`;
    elements.normalLabel.textContent = substance.examples[phase];
    elements.normalFluid.style.display = 'flex';
    
    if (phase === 'solid') {
      elements.iceContainer.style.display = 'block';
      elements.gasParticles.style.display = 'none';
    } else if (phase === 'gas') {
      elements.iceContainer.style.display = 'none';
      elements.gasParticles.style.display = 'block';
    } else {
      elements.iceContainer.style.display = 'none';
      elements.gasParticles.style.display = 'none';
    }
  } else {
    elements.normalFluid.style.display = 'none';
    elements.iceContainer.style.display = 'none';
  }
  
  // Heating / Cooling overlays
  elements.frostOverlay.style.display = isCooling ? 'block' : 'none';
  elements.flamesContainer.style.display = isHeating ? 'block' : 'none';
  
  let indicatorClass = 'heat-indicator';
  if (isHeating) indicatorClass += ' active-heat';
  if (isCooling) indicatorClass += ' active-cool';
  elements.heatIndicator.className = indicatorClass;
  
  // Update Simulation Engine
  simEngine.updateState(phase, energy, viewMode, false);
}

function setupEventListeners() {
  elements.btnNormalView.onclick = () => { viewMode = 'Normal View'; updateUI(); };
  elements.btnParticleView.onclick = () => { viewMode = 'Particle View'; updateUI(); };
  
  elements.tempSlider.oninput = (e) => {
    temperature = Number(e.target.value);
    updateUI();
  };
  
  // Heat Button
  const startHeat = () => { isHeating = true; updateUI(); };
  const stopHeat = () => { isHeating = false; updateUI(); };
  elements.btnHeat.onmousedown = startHeat;
  elements.btnHeat.onmouseup = stopHeat;
  elements.btnHeat.onmouseleave = stopHeat;
  elements.btnHeat.ontouchstart = (e) => { e.preventDefault(); startHeat(); };
  elements.btnHeat.ontouchend = (e) => { e.preventDefault(); stopHeat(); };
  
  // Cool Button
  const startCool = () => { isCooling = true; updateUI(); };
  const stopCool = () => { isCooling = false; updateUI(); };
  elements.btnCool.onmousedown = startCool;
  elements.btnCool.onmouseup = stopCool;
  elements.btnCool.onmouseleave = stopCool;
  elements.btnCool.ontouchstart = (e) => { e.preventDefault(); startCool(); };
  elements.btnCool.ontouchend = (e) => { e.preventDefault(); stopCool(); };
}

function startUpdateLoop() {
  setInterval(() => {
    if (isHeating || isCooling) {
      const substance = SUBSTANCES[substanceId];
      if (isHeating) {
        temperature = Math.min(substance.maxTemp, temperature + (substance.maxTemp - substance.minTemp) * 0.01);
      } else if (isCooling) {
        temperature = Math.max(substance.minTemp, temperature - (substance.maxTemp - substance.minTemp) * 0.01);
      }
      updateUI();
    }
  }, 50);
}

init();
