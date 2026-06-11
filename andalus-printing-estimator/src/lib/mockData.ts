// Mock database with all quotation options
export const mockData = {
  customers: [
    { id: '1', company_name: 'John Doe Prints', contact_person: 'John Doe', mobile: '+974 4455 6677', email: 'john@doeprints.com' },
    { id: '2', company_name: 'ABC Corporation', contact_person: 'Ahmed Al-Mansouri', mobile: '+974 3322 1100', email: 'ahmed@abccorp.qa' },
    { id: '3', company_name: 'Global Trading LLC', contact_person: 'Fatima Al-Khalifa', mobile: '+974 5566 7788', email: 'fatima@globaltrading.qa' },
    { id: '4', company_name: 'Doha Advertising', contact_person: 'Hassan Al-Dosari', mobile: '+974 6677 8899', email: 'hassan@dohaadv.qa' },
  ],
  products: [
    { id: '1', name: 'Business Cards', category: 'Stationery', base_price: 150 },
    { id: '2', name: 'Flyers (A4)', category: 'Marketing', base_price: 250 },
    { id: '3', name: 'Brochures (A4)', category: 'Marketing', base_price: 400 },
    { id: '4', name: 'Letterheads', category: 'Stationery', base_price: 200 },
    { id: '5', name: 'Envelopes', category: 'Stationery', base_price: 180 },
    { id: '6', name: 'Booklets', category: 'Publishing', base_price: 600 },
    { id: '7', name: 'Banners', category: 'Signage', base_price: 800 },
    { id: '8', name: 'Labels', category: 'Packaging', base_price: 220 },
  ],
  materials: [
    { id: '1', name: 'Bond Paper 80 GSM', type: 'Paper', cost_per_unit: 50, unit_type: 'ream', gsm: 80, sheet_size: 'A4', waste_percentage: 5 },
    { id: '2', name: 'Coated Paper 200 GSM', type: 'Paper', cost_per_unit: 150, unit_type: 'ream', gsm: 200, sheet_size: 'A4', waste_percentage: 8 },
    { id: '3', name: 'Art Paper 250 GSM', type: 'Paper', cost_per_unit: 200, unit_type: 'ream', gsm: 250, sheet_size: 'A3', waste_percentage: 10 },
    { id: '4', name: 'NCR White', type: 'NCR', cost_per_unit: 120, unit_type: 'ream', gsm: 80, sheet_size: 'A4', waste_percentage: 5 },
    { id: '5', name: 'NCR Yellow', type: 'NCR', cost_per_unit: 120, unit_type: 'ream', gsm: 80, sheet_size: 'A4', waste_percentage: 5 },
    { id: '6', name: 'Foil Gold', type: 'Foil', cost_per_unit: 5, unit_type: 'sq-cm', gsm: 0, sheet_size: 'N/A', waste_percentage: 15 },
    { id: '7', name: 'Foil Silver', type: 'Foil', cost_per_unit: 4.5, unit_type: 'sq-cm', gsm: 0, sheet_size: 'N/A', waste_percentage: 15 },
    { id: '8', name: 'Die Cutting', type: 'Die', cost_per_unit: 200, unit_type: 'piece', gsm: 0, sheet_size: 'N/A', waste_percentage: 0 },
  ],
  labour: [
    { id: '1', name: 'Design Work', charge_type: 'hourly', cost_per_unit: 150 },
    { id: '2', name: 'Cutting & Trimming', charge_type: 'per-unit', cost_per_unit: 0.50 },
    { id: '3', name: 'Folding', charge_type: 'per-unit', cost_per_unit: 0.30 },
    { id: '4', name: 'Stitching', charge_type: 'per-unit', cost_per_unit: 0.75 },
    { id: '5', name: 'Collating', charge_type: 'per-unit', cost_per_unit: 0.25 },
    { id: '6', name: 'Packaging', charge_type: 'per-unit', cost_per_unit: 1.00 },
    { id: '7', name: 'Quality Check', charge_type: 'hourly', cost_per_unit: 100 },
    { id: '8', name: 'Delivery Setup', charge_type: 'fixed', cost_per_unit: 500 },
  ],
  machines: [
    { id: '1', name: 'Heidelberg Offset (4-Color)', running_cost_per_hour: 2000, speed_per_hour: 10000, electricity_cost: 150, setup_waste: 200, operator_charge_per_hour: 200 },
    { id: '2', name: 'Xerox Digital Press', running_cost_per_hour: 1500, speed_per_hour: 6000, electricity_cost: 100, setup_waste: 100, operator_charge_per_hour: 150 },
    { id: '3', name: 'Screen Printing Machine', running_cost_per_hour: 800, speed_per_hour: 500, electricity_cost: 80, setup_waste: 50, operator_charge_per_hour: 100 },
    { id: '4', name: 'Cutting Plotter', running_cost_per_hour: 600, speed_per_hour: 2000, electricity_cost: 50, setup_waste: 0, operator_charge_per_hour: 80 },
    { id: '5', name: 'Binding Machine', running_cost_per_hour: 500, speed_per_hour: 1500, electricity_cost: 40, setup_waste: 0, operator_charge_per_hour: 60 },
    { id: '6', name: 'Lamination Machine', running_cost_per_hour: 400, speed_per_hour: 800, electricity_cost: 30, setup_waste: 10, operator_charge_per_hour: 50 },
  ],
  finishingOptions: [
    { id: '1', name: 'Lamination (Glossy)', material_cost: 25, labour_charge: 50, machine_setup_charge: 200, minimum_charge: 300, unit_type: 'per-ream' },
    { id: '2', name: 'Lamination (Matte)', material_cost: 20, labour_charge: 50, machine_setup_charge: 200, minimum_charge: 300, unit_type: 'per-ream' },
    { id: '3', name: 'Die Cutting', material_cost: 0, labour_charge: 100, machine_setup_charge: 500, minimum_charge: 800, unit_type: 'per-design' },
    { id: '4', name: 'Foil Stamping', material_cost: 150, labour_charge: 150, machine_setup_charge: 300, minimum_charge: 600, unit_type: 'per-design' },
    { id: '5', name: 'Embossing', material_cost: 0, labour_charge: 100, machine_setup_charge: 400, minimum_charge: 600, unit_type: 'per-design' },
    { id: '6', name: 'Saddle Stitching', material_cost: 30, labour_charge: 80, machine_setup_charge: 150, minimum_charge: 300, unit_type: 'per-book' },
    { id: '7', name: 'Perfect Binding', material_cost: 80, labour_charge: 150, machine_setup_charge: 200, minimum_charge: 500, unit_type: 'per-book' },
    { id: '8', name: 'Spiral Binding', material_cost: 100, labour_charge: 120, machine_setup_charge: 100, minimum_charge: 400, unit_type: 'per-book' },
  ],
  settings: {
    profit_margin: 25,
    vat_rate: 5,
  },
};

// Helper functions for data operations
export const mockDataOperations = {
  addCustomer: (customer: any) => {
    const newId = String(Math.max(...mockData.customers.map(c => parseInt(c.id))) + 1);
    mockData.customers.push({ ...customer, id: newId });
    return { ...customer, id: newId };
  },

  updateCustomer: (id: string, data: any) => {
    const index = mockData.customers.findIndex(c => c.id === id);
    if (index !== -1) {
      mockData.customers[index] = { ...mockData.customers[index], ...data };
      return mockData.customers[index];
    }
    return null;
  },

  deleteCustomer: (id: string) => {
    mockData.customers = mockData.customers.filter(c => c.id !== id);
  },

  addProduct: (product: any) => {
    const newId = String(Math.max(...mockData.products.map(p => parseInt(p.id))) + 1);
    mockData.products.push({ ...product, id: newId });
    return { ...product, id: newId };
  },

  updateProduct: (id: string, data: any) => {
    const index = mockData.products.findIndex(p => p.id === id);
    if (index !== -1) {
      mockData.products[index] = { ...mockData.products[index], ...data };
      return mockData.products[index];
    }
    return null;
  },

  deleteProduct: (id: string) => {
    mockData.products = mockData.products.filter(p => p.id !== id);
  },

  addMaterial: (material: any) => {
    const newId = String(Math.max(...mockData.materials.map(m => parseInt(m.id))) + 1);
    mockData.materials.push({ ...material, id: newId });
    return { ...material, id: newId };
  },

  updateMaterial: (id: string, data: any) => {
    const index = mockData.materials.findIndex(m => m.id === id);
    if (index !== -1) {
      mockData.materials[index] = { ...mockData.materials[index], ...data };
      return mockData.materials[index];
    }
    return null;
  },

  deleteMaterial: (id: string) => {
    mockData.materials = mockData.materials.filter(m => m.id !== id);
  },

  addLabour: (labour: any) => {
    const newId = String(Math.max(...mockData.labour.map(l => parseInt(l.id))) + 1);
    mockData.labour.push({ ...labour, id: newId });
    return { ...labour, id: newId };
  },

  updateLabour: (id: string, data: any) => {
    const index = mockData.labour.findIndex(l => l.id === id);
    if (index !== -1) {
      mockData.labour[index] = { ...mockData.labour[index], ...data };
      return mockData.labour[index];
    }
    return null;
  },

  deleteLabour: (id: string) => {
    mockData.labour = mockData.labour.filter(l => l.id !== id);
  },

  addMachine: (machine: any) => {
    const newId = String(Math.max(...mockData.machines.map(m => parseInt(m.id))) + 1);
    mockData.machines.push({ ...machine, id: newId });
    return { ...machine, id: newId };
  },

  updateMachine: (id: string, data: any) => {
    const index = mockData.machines.findIndex(m => m.id === id);
    if (index !== -1) {
      mockData.machines[index] = { ...mockData.machines[index], ...data };
      return mockData.machines[index];
    }
    return null;
  },

  deleteMachine: (id: string) => {
    mockData.machines = mockData.machines.filter(m => m.id !== id);
  },

  addFinishingOption: (option: any) => {
    const newId = String(Math.max(...mockData.finishingOptions.map(f => parseInt(f.id))) + 1);
    mockData.finishingOptions.push({ ...option, id: newId });
    return { ...option, id: newId };
  },

  updateFinishingOption: (id: string, data: any) => {
    const index = mockData.finishingOptions.findIndex(f => f.id === id);
    if (index !== -1) {
      mockData.finishingOptions[index] = { ...mockData.finishingOptions[index], ...data };
      return mockData.finishingOptions[index];
    }
    return null;
  },

  deleteFinishingOption: (id: string) => {
    mockData.finishingOptions = mockData.finishingOptions.filter(f => f.id !== id);
  },

  updateSettings: (data: any) => {
    mockData.settings = { ...mockData.settings, ...data };
    return mockData.settings;
  },
};