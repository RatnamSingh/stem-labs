export const SUBSTANCES = {
  water: {
    id: 'water',
    name: 'Water',
    formula: 'H₂O',
    icon: '💧',
    freezingPoint: 0,
    boilingPoint: 100,
    minTemp: -50,
    maxTemp: 150,
    description: 'Most common example',
    examples: { solid: 'Ice', liquid: 'Water', gas: 'Steam' }
  },
  co2: {
    id: 'co2',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    icon: '💨',
    freezingPoint: -78.5, // Sublimes
    boilingPoint: -78.5,
    minTemp: -120,
    maxTemp: 20,
    description: 'Dry ice sublimes directly to gas',
    examples: { solid: 'Dry Ice', liquid: 'Liquid CO₂', gas: 'CO₂ Gas' }
  },
  oxygen: {
    id: 'oxygen',
    name: 'Oxygen',
    formula: 'O₂',
    icon: '🌬️',
    freezingPoint: -218.8,
    boilingPoint: -183,
    minTemp: -250,
    maxTemp: -100,
    description: 'Essential for life',
    examples: { solid: 'Solid Oxygen', liquid: 'Liquid O₂', gas: 'Oxygen Gas' }
  },
  mercury: {
    id: 'mercury',
    name: 'Mercury',
    formula: 'Hg',
    icon: '🌡️',
    freezingPoint: -38.8,
    boilingPoint: 356.7,
    minTemp: -100,
    maxTemp: 500,
    description: 'Liquid metal at room temp',
    examples: { solid: 'Solid Hg', liquid: 'Liquid Hg', gas: 'Mercury Vapor' }
  },
  ethanol: {
    id: 'ethanol',
    name: 'Ethanol',
    formula: 'C₂H₅OH',
    icon: '🍷',
    freezingPoint: -114,
    boilingPoint: 78.4,
    minTemp: -150,
    maxTemp: 120,
    description: 'Common alcohol',
    examples: { solid: 'Solid Ethanol', liquid: 'Ethanol', gas: 'Ethanol Vapor' }
  }
};

export const getPhase = (temperature, substance) => {
  if (temperature < substance.freezingPoint) return 'solid';
  if (temperature >= substance.freezingPoint && temperature < substance.boilingPoint) return 'liquid';
  return 'gas';
};

export const getLabReadings = (phase) => {
  switch (phase) {
    case 'solid': return { motion: 'Low', spacing: 'Very close', shape: 'Fixed', volume: 'Fixed' };
    case 'liquid': return { motion: 'Medium', spacing: 'Close', shape: 'Takes container shape', volume: 'Fixed' };
    case 'gas': return { motion: 'High', spacing: 'Far apart', shape: 'Fills container', volume: 'No fixed volume' };
    default: return { motion: '-', spacing: '-', shape: '-', volume: '-' };
  }
};

export const getObservation = (phase) => {
  switch (phase) {
    case 'solid': return 'The particles are close together and vibrate around fixed positions. They cannot move freely, so the substance keeps its own shape and volume.';
    case 'liquid': return 'The particles have enough energy to slide past one another. They take the shape of the container but maintain a fixed volume.';
    case 'gas': return 'The particles move rapidly in all directions, spreading out to fill the entire available space. They have no fixed shape or volume.';
    default: return '';
  }
};
