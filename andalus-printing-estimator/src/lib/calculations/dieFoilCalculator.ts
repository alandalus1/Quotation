// Die & Foil Calculation Module

export interface DieFoilDetails {
  type: 'die' | 'foil' | 'emboss' | 'deboss';
  width: number; // in cm
  height: number; // in cm
  complexity: 'low' | 'medium' | 'high';
}

export function calculateDieFoilCost(details: DieFoilDetails): { totalCost: number; breakdown: any } {
  console.log('Calculating Die/Foil cost for:', details);

  const area = details.width * details.height;
  const breakdown = {
    materialCost: 0,
    labourCost: 0,
    setupCost: 0,
    total: 0,
  };

  // Placeholder calculations based on area and type
  if (details.type === 'die') {
    const plywoodCost = 50; // Base cost
    const bladeCostPerCm = 0.5;
    const perimeter = 2 * (details.width + details.height);
    breakdown.materialCost = plywoodCost + (perimeter * bladeCostPerCm);
    breakdown.labourCost = 100; // Fixed labour for die making
  } else if (details.type === 'foil') {
    const plateCostPerScm = 2; // QAR per sq cm
    breakdown.materialCost = area * plateCostPerScm;
    breakdown.setupCost = 150;
  } else if (details.type === 'emboss' || details.type === 'deboss') {
    const blockCostPerScm = 3;
    breakdown.materialCost = area * blockCostPerScm;
    breakdown.setupCost = 200;
  }

  breakdown.total = breakdown.materialCost + breakdown.labourCost + breakdown.setupCost;

  return { totalCost: breakdown.total, breakdown };
}