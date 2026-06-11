// Professional Printing Calculation Engine for Al Andalus Printing Press
// Qatar Market - Real-World Printing Cost Estimation

export interface QuotationJobDetails {
  customerId: string;
  productId: string;
  quantity: number;
  productBasePrice: number;

  // Paper
  materialId?: string;
  paperCostPerSheet?: number;
  paperGSM?: number;
  paperSize?: string;
  sheetsRequired?: number;
  paperWastePercentage?: number;

  // Printing
  printingMethod?: 'offset' | 'digital' | 'screen';
  colorMode?: '1+0' | '1+1' | '4+0' | '4+1' | '4+4' | 'pantone';
  printingSides?: 'single' | 'double';
  numberOfPlates?: number;
  plateCost?: number;
  machineRunningCostPerHour?: number;
  machineSpeedPerHour?: number;

  // Finishing
  finishingOptions?: Array<{
    name: string;
    materialCost: number;
    labourCharge: number;
    machineSetupCharge: number;
    minimumCharge: number;
    quantity?: number;
  }>;

  // Labour
  labourOptions?: Array<{
    name: string;
    chargeType: string;
    costPerUnit: number;
    quantity?: number;
  }>;

  // Die & Foil
  dieCost?: number;
  foilCost?: number;
  foilArea?: number;
  embossDebossCost?: number;

  // Binding
  bindingType?: string;
  bindingCostPerBook?: number;

  // Lamination
  laminationType?: string;
  laminationCost?: number;

  // Delivery
  deliveryCost?: number;

  // Margins
  profitMargin?: number;
  vatRate?: number;
}

export interface QuotationBreakdown {
  paperCost: number;
  plateCost: number;
  printingCost: number;
  finishingCost: number;
  labourCost: number;
  dieCost: number;
  foilCost: number;
  embossDebossCost: number;
  laminationCost: number;
  bindingCost: number;
  deliveryCost: number;
  totalProductionCost: number;
  profit: number;
  profitPercentage: number;
  subtotal: number;
  vat: number;
  vatRate: number;
  total: number;
  finalUnitPrice: number;
}

export function calculateQuotation(jobDetails: QuotationJobDetails): {
  totalCost: number;
  breakdown: QuotationBreakdown;
} {
  const {
    quantity,
    productBasePrice,
    profitMargin = 25,
    vatRate = 5,
  } = jobDetails;

  // ==============================
  // 1. PAPER COST CALCULATION
  // ==============================
  let paperCost = 0;
  if (jobDetails.paperCostPerSheet && jobDetails.sheetsRequired) {
    const wasteMultiplier = 1 + (jobDetails.paperWastePercentage || 5) / 100;
    const totalSheets = Math.ceil(jobDetails.sheetsRequired * wasteMultiplier);
    paperCost = totalSheets * jobDetails.paperCostPerSheet;
  }

  // ==============================
  // 2. PLATE COST CALCULATION
  // ==============================
  let plateCost = 0;
  if (jobDetails.numberOfPlates && jobDetails.plateCost) {
    plateCost = jobDetails.numberOfPlates * jobDetails.plateCost;
  } else {
    // Auto-calculate plates based on color mode
    const colorMode = jobDetails.colorMode || '1+0';
    let plates = 0;
    switch (colorMode) {
      case '1+0': plates = 1; break;
      case '1+1': plates = 2; break;
      case '4+0': plates = 4; break;
      case '4+1': plates = 5; break;
      case '4+4': plates = 8; break;
      case 'pantone': plates = jobDetails.colorMode === 'pantone' ? 1 : 0; break;
    }
    plateCost = plates * 15; // QAR 15 per plate standard rate
  }

  // ==============================
  // 3. PRINTING COST CALCULATION
  // ==============================
  let printingCost = 0;
  if (jobDetails.machineRunningCostPerHour && jobDetails.machineSpeedPerHour) {
    const printSides = jobDetails.printingSides === 'double' ? 2 : 1;
    const totalImpressions = quantity * printSides;
    const hoursRequired = totalImpressions / jobDetails.machineSpeedPerHour;
    const setupTime = 0.5; // 30 minutes setup
    printingCost = (hoursRequired + setupTime) * jobDetails.machineRunningCostPerHour;
  } else {
    // Default printing cost based on quantity
    const colorMode = jobDetails.colorMode || '1+0';
    let ratePerSheet = 0.05;
    switch (colorMode) {
      case '1+0': ratePerSheet = 0.03; break;
      case '1+1': ratePerSheet = 0.05; break;
      case '4+0': ratePerSheet = 0.10; break;
      case '4+1': ratePerSheet = 0.15; break;
      case '4+4': ratePerSheet = 0.20; break;
      case 'pantone': ratePerSheet = 0.12; break;
    }
    printingCost = quantity * ratePerSheet;
  }

  // ==============================
  // 4. FINISHING COST CALCULATION
  // ==============================
  let finishingCost = 0;
  if (jobDetails.finishingOptions && jobDetails.finishingOptions.length > 0) {
    for (const option of jobDetails.finishingOptions) {
      const finishQty = option.quantity || quantity;
      const perUnitCost = (option.materialCost || 0) + (option.labourCharge || 0);
      const totalUnitCost = perUnitCost * finishQty;
      const setupCharge = option.machineSetupCharge || 0;
      const minCharge = option.minimumCharge || 0;
      const totalFinishCost = Math.max(totalUnitCost + setupCharge, minCharge);
      finishingCost += totalFinishCost;
    }
  }

  // ==============================
  // 5. LABOUR COST CALCULATION
  // ==============================
  let labourCost = 0;
  if (jobDetails.labourOptions && jobDetails.labourOptions.length > 0) {
    for (const labour of jobDetails.labourOptions) {
      const labQty = labour.quantity || 1;
      switch (labour.chargeType) {
        case 'per_hour':
          labourCost += labour.costPerUnit * labQty;
          break;
        case 'per_1000':
          labourCost += (labour.costPerUnit / 1000) * labQty;
          break;
        case 'per_mille':
          labourCost += (labour.costPerUnit / 1000) * labQty;
          break;
        case 'per_piece':
          labourCost += labour.costPerUnit * labQty;
          break;
        case 'fixed_job':
          labourCost += labour.costPerUnit;
          break;
        default:
          labourCost += labour.costPerUnit * labQty;
      }
    }
  }

  // ==============================
  // 6. DIE COST
  // ==============================
  const dieCost = jobDetails.dieCost || 0;

  // ==============================
  // 7. FOIL COST
  // ==============================
  let foilCost = jobDetails.foilCost || 0;
  if (jobDetails.foilArea && !foilCost) {
    // Calculate based on area: foil plate cost + foil material
    const foilPlateCost = jobDetails.foilArea * 0.50; // QAR 0.50 per sq cm for plate
    const foilMaterialCost = jobDetails.foilArea * 0.001; // Negligible per sq cm
    foilCost = foilPlateCost + foilMaterialCost;
  }

  // ==============================
  // 8. EMBOSS/DEBOSS COST
  // ==============================
  const embossDebossCost = jobDetails.embossDebossCost || 0;

  // ==============================
  // 9. LAMINATION COST
  // ==============================
  let laminationCost = jobDetails.laminationCost || 0;
  if (jobDetails.laminationCost && !laminationCost) {
    laminationCost = quantity * jobDetails.laminationCost;
  }

  // ==============================
  // 10. BINDING COST
  // ==============================
  let bindingCost = jobDetails.bindingCostPerBook ? jobDetails.bindingCostPerBook * quantity : 0;
  if (jobDetails.bindingCostPerBook && !bindingCost) {
    bindingCost = quantity * jobDetails.bindingCostPerBook;
  }

  // ==============================
  // 11. DELIVERY COST
  // ==============================
  const deliveryCost = jobDetails.deliveryCost || 0;

  // ==============================
  // TOTAL PRODUCTION COST
  // ==============================
  const totalProductionCost =
    paperCost +
    plateCost +
    printingCost +
    finishingCost +
    labourCost +
    dieCost +
    foilCost +
    embossDebossCost +
    laminationCost +
    bindingCost +
    deliveryCost;

  // ==============================
  // PROFIT & VAT CALCULATION
  // ==============================
  const profitPercentage = profitMargin;
  const profit = totalProductionCost * (profitMargin / 100);
  const subtotal = totalProductionCost + profit;
  const vat = subtotal * (vatRate / 100);
  const total = subtotal + vat;
  const finalUnitPrice = quantity > 0 ? total / quantity : 0;

  const breakdown: QuotationBreakdown = {
    paperCost: Math.round(paperCost * 100) / 100,
    plateCost: Math.round(plateCost * 100) / 100,
    printingCost: Math.round(printingCost * 100) / 100,
    finishingCost: Math.round(finishingCost * 100) / 100,
    labourCost: Math.round(labourCost * 100) / 100,
    dieCost: Math.round(dieCost * 100) / 100,
    foilCost: Math.round(foilCost * 100) / 100,
    embossDebossCost: Math.round(embossDebossCost * 100) / 100,
    laminationCost: Math.round(laminationCost * 100) / 100,
    bindingCost: Math.round(bindingCost * 100) / 100,
    deliveryCost: Math.round(deliveryCost * 100) / 100,
    totalProductionCost: Math.round(totalProductionCost * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    profitPercentage,
    subtotal: Math.round(subtotal * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    vatRate,
    total: Math.round(total * 100) / 100,
    finalUnitPrice: Math.round(finalUnitPrice * 100) / 100,
  };

  return { totalCost: breakdown.total, breakdown };
}