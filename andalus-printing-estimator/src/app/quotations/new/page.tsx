'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { calculateQuotation, QuotationJobDetails, QuotationBreakdown } from '@/lib/calculations';

interface Customer {
  id: string;
  company_name: string;
  contact_person: string;
  mobile: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  base_price: number;
}

interface Material {
  id: string;
  name: string;
  type: string;
  cost_per_unit: number;
  unit_type: string;
  gsm: number;
  sheet_size: string;
  waste_percentage: number;
}

interface FinishingOption {
  id: string;
  name: string;
  material_cost: number;
  labour_charge: number;
  machine_setup_charge: number;
  minimum_charge: number;
  unit_type: string;
}

interface LabourItem {
  id: string;
  name: string;
  charge_type: string;
  cost_per_unit: number;
}

interface Machine {
  id: string;
  name: string;
  running_cost_per_hour: number;
  speed_per_hour: number;
  electricity_cost: number;
  setup_waste: number;
  operator_charge_per_hour: number;
}

export default function NewQuotationPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  // Data lists from DB
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [finishingOptions, setFinishingOptions] = useState<FinishingOption[]>([]);
  const [labourItems, setLabourItems] = useState<LabourItem[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);

  // Form selections
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1000);
  const [notes, setNotes] = useState('');
  const [terms, setTerms] = useState('Payment due within 15 days. Prices valid for 7 days.');

  // Paper selection
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [sheetsRequired, setSheetsRequired] = useState<number>(0);
  const [paperWaste, setPaperWaste] = useState<number>(5);

  // Printing
  const [printingMethod, setPrintingMethod] = useState<'offset' | 'digital' | 'screen'>('offset');
  const [colorMode, setColorMode] = useState<string>('4+0');
  const [selectedMachine, setSelectedMachine] = useState<string>('');
  const [printingSides, setPrintingSides] = useState<'single' | 'double'>('single');

  // Selected finishing options
  const [selectedFinishing, setSelectedFinishing] = useState<string[]>([]);

  // Selected labour options
  const [selectedLabour, setSelectedLabour] = useState<string[]>([]);

  // Die & Foil
  const [dieCost, setDieCost] = useState<number>(0);
  const [foilArea, setFoilArea] = useState<number>(0);

  // Binding
  const [selectedBinding, setSelectedBinding] = useState<string>('');
  const [bindingCost, setBindingCost] = useState<number>(0);

  // Lamination
  const [selectedLamination, setSelectedLamination] = useState<string>('');

  // Delivery
  const [selectedDelivery, setSelectedDelivery] = useState<string>('');

  // Margins
  const [profitMargin, setProfitMargin] = useState<number>(25);
  const [vatRate, setVatRate] = useState<number>(5);

  // Calculation results
  const [calculatedTotal, setCalculatedTotal] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<QuotationBreakdown | null>(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError || !session) {
        router.push('/auth');
        return;
      }

      try {
        // Fetch all data in parallel
        const [custRes, prodRes, matRes, finishRes, labRes, machRes, settingsRes] = await Promise.all([
          supabase.from('customers').select('id, company_name, contact_person, mobile, email'),
          supabase.from('products').select('id, name, category, base_price').order('category'),
          supabase.from('materials').select('*').in('type', ['Paper', 'NCR', 'Die', 'Foil', 'Emboss', 'Plate']).order('name'),
          supabase.from('finishing_options').select('*').order('name'),
          supabase.from('labour').select('*').order('name'),
          supabase.from('machines').select('*').order('name'),
          supabase.from('settings').select('*').limit(1),
        ]);

        if (custRes.error) throw custRes.error;
        if (prodRes.error) throw prodRes.error;
        if (matRes.error) throw matRes.error;
        if (finishRes.error) throw finishRes.error;
        if (labRes.error) throw labRes.error;
        if (machRes.error) throw machRes.error;

        setCustomers(custRes.data || []);
        setProducts(prodRes.data || []);
        setMaterials(matRes.data || []);
        setFinishingOptions(finishRes.data || []);
        setLabourItems(labRes.data || []);
        setMachines(machRes.data || []);

        // Load settings defaults
        if (settingsRes.data && settingsRes.data.length > 0) {
          const settings = settingsRes.data[0];
          setProfitMargin(settings.profit_margin || 25);
          setVatRate(settings.vat_rate || 5);
        }
      } catch (err: any) {
        setError(err.message);
      }

      setLoading(false);
    };

    fetchData();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push('/auth');
    });
    return () => { authListener.subscription.unsubscribe(); };
  }, [router]);

  const handleProductChange = (productId: string) => {
    setSelectedProduct(productId);
    const product = products.find(p => p.id === productId) || null;
    setSelectedProductDetails(product);
    if (product) {
      // Auto-set sheets required based on product and quantity
      setSheetsRequired(Math.ceil(quantity / 10)); // rough estimate: 10 ups per sheet
    }
  };

  const toggleFinishing = (id: string) => {
    setSelectedFinishing(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleLabour = (id: string) => {
    setSelectedLabour(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCalculate = () => {
    if (!selectedCustomer || !selectedProduct || quantity <= 0) {
      setError('Please select a customer, product, and enter a valid quantity.');
      return;
    }

    // Build job details object
    const selectedMat = materials.find(m => m.id === selectedMaterial);
    const selectedMach = machines.find(m => m.id === selectedMachine);

    const finishingArray = selectedFinishing
      .map(id => finishingOptions.find(f => f.id === id))
      .filter((f): f is FinishingOption => f !== undefined)
      .map(f => ({
        name: f.name,
        materialCost: f.material_cost,
        labourCharge: f.labour_charge,
        machineSetupCharge: f.machine_setup_charge,
        minimumCharge: f.minimum_charge,
        quantity: quantity,
      }));

    const labourArray = selectedLabour
      .map(id => labourItems.find(l => l.id === id))
      .filter((l): l is LabourItem => l !== undefined)
      .map(l => ({
        name: l.name,
        chargeType: l.charge_type,
        costPerUnit: l.cost_per_unit,
        quantity: 1,
      }));

    const jobDetails: QuotationJobDetails = {
      customerId: selectedCustomer,
      productId: selectedProduct,
      quantity,
      productBasePrice: selectedProductDetails?.base_price || 0,
      materialId: selectedMaterial,
      paperCostPerSheet: selectedMat?.cost_per_unit,
      paperGSM: selectedMat?.gsm,
      paperSize: selectedMat?.sheet_size,
      sheetsRequired: sheetsRequired || Math.ceil(quantity / 10),
      paperWastePercentage: paperWaste,
      printingMethod,
      colorMode: colorMode as any,
      printingSides,
      machineRunningCostPerHour: selectedMach?.running_cost_per_hour,
      machineSpeedPerHour: selectedMach?.speed_per_hour,
      numberOfPlates: undefined,
      plateCost: undefined,
      finishingOptions: finishingArray,
      labourOptions: labourArray,
      dieCost: dieCost || 0,
      foilCost: undefined,
      foilArea: foilArea || 0,
      embossDebossCost: 0,
      laminationCost: 0,
      bindingType: selectedBinding,
      bindingCostPerBook: bindingCost || 0,
      deliveryCost: 0,
      profitMargin,
      vatRate,
    };

    try {
      const { totalCost, breakdown } = calculateQuotation(jobDetails);
      setCalculatedTotal(totalCost);
      setBreakdown(breakdown);
      setError(null);
    } catch (calcError: any) {
      setError(`Calculation failed: ${calcError.message}`);
      setCalculatedTotal(0);
      setBreakdown(null);
    }
  };

  const handleSaveQuotation = async () => {
    if (!breakdown) {
      setError('Please calculate the quotation first.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Generate quotation number
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const { count } = await supabase
        .from('quotations')
        .select('*', { count: 'exact', head: true });
      const nextNum = String((count || 0) + 1).padStart(4, '0');
      const quotationNumber = `QTN-${year}-${month}-${nextNum}`;

      const { data: quotationData, error: qError } = await supabase
        .from('quotations')
        .insert({
          quotation_number: quotationNumber,
          customer_id: selectedCustomer,
          status: 'Pending',
          total_amount: breakdown.total,
          vat_amount: breakdown.vat,
          profit_margin_percentage: profitMargin,
          notes,
          terms_and_conditions: terms,
        })
        .select()
        .single();

      if (qError) throw qError;

      // Save quotation items
      const { error: itemError } = await supabase
        .from('quotation_items')
        .insert({
          quotation_id: quotationData.id,
          product_id: selectedProduct,
          product_name: selectedProductDetails?.name || 'Custom Product',
          quantity,
          unit_price: breakdown.finalUnitPrice,
          total_price: breakdown.total,
          details: {
            breakdown,
            material: materials.find(m => m.id === selectedMaterial)?.name,
            printingMethod,
            colorMode,
            finishing: selectedFinishing.map(id => finishingOptions.find(f => f.id === id)?.name),
            labour: selectedLabour.map(id => labourItems.find(l => l.id === id)?.name),
          },
        });

      if (itemError) throw itemError;

      setSuccess(`Quotation ${quotationNumber} saved successfully!`);
      setTimeout(() => router.push('/quotations'), 2000);
    } catch (err: any) {
      setError(err.message);
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Create New Quotation</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">All prices in QAR</span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6 flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Customer *</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                  <option value="">Select Customer</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.company_name} - {c.contact_person}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Product *</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedProduct}
                  onChange={(e) => handleProductChange(e.target.value)}
                >
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Quantity *</label>
                <input
                  type="number"
                  min="1"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Base Price (QAR)</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50"
                  value={selectedProductDetails ? `${selectedProductDetails.base_price.toFixed(2)} QAR` : 'Auto from product'}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Paper / Material Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              Paper & Material
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">Paper Type</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                >
                  <option value="">Select Paper</option>
                  {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} - {m.cost_per_unit.toFixed(2)} QAR/{m.unit_type} (GSM: {m.gsm}, {m.sheet_size})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Waste %</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={paperWaste}
                  onChange={(e) => setPaperWaste(parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Sheets Required</label>
                <input
                  type="number"
                  min="0"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={sheetsRequired}
                  onChange={(e) => setSheetsRequired(parseInt(e.target.value) || 0)}
                  placeholder="Auto-calculated"
                />
              </div>
            </div>
            {selectedMaterial && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                {(materials.find(m => m.id === selectedMaterial)?.cost_per_unit || 0).toFixed(2)} QAR per sheet — Adjust sheets required above
              </div>
            )}
          </div>

          {/* Printing Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              Printing Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Printing Method</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={printingMethod}
                  onChange={(e) => setPrintingMethod(e.target.value as any)}
                >
                  <option value="offset">Offset</option>
                  <option value="digital">Digital</option>
                  <option value="screen">Screen Printing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Color Mode</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={colorMode}
                  onChange={(e) => setColorMode(e.target.value)}
                >
                  <option value="1+0">1+0 (Single Color One Side)</option>
                  <option value="1+1">1+1 (Single Color Both Sides)</option>
                  <option value="4+0">4+0 (Full Color One Side)</option>
                  <option value="4+1">4+1 (Full Color Front, 1 Color Back)</option>
                  <option value="4+4">4+4 (Full Color Both Sides)</option>
                  <option value="pantone">Pantone (Spot Color)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Sides</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={printingSides}
                  onChange={(e) => setPrintingSides(e.target.value as any)}
                >
                  <option value="single">Single Side</option>
                  <option value="double">Double Side</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">Machine</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedMachine}
                  onChange={(e) => setSelectedMachine(e.target.value)}
                >
                  <option value="">Auto-calculate (no machine selected)</option>
                  {machines.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} - {m.running_cost_per_hour} QAR/hr ({m.speed_per_hour} sheets/hr)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Finishing Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Finishing Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
              {finishingOptions.map((f) => (
                <label key={f.id} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                  selectedFinishing.includes(f.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={selectedFinishing.includes(f.id)}
                    onChange={() => toggleFinishing(f.id)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{f.name}</span>
                  <span className="text-xs text-gray-500 ml-auto">{f.minimum_charge} QAR min</span>
                </label>
              ))}
            </div>
          </div>

          {/* Labour Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              Labour Charges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {labourItems.map((l) => (
                <label key={l.id} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                  selectedLabour.includes(l.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={selectedLabour.includes(l.id)}
                    onChange={() => toggleLabour(l.id)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{l.name}</span>
                  <span className="text-xs text-gray-500 ml-auto">{l.cost_per_unit.toFixed(2)} QAR</span>
                </label>
              ))}
            </div>
          </div>

          {/* Die & Foil */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              Die & Foil
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Die Cutting Cost (QAR)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={dieCost}
                  onChange={(e) => setDieCost(parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 200 for simple die"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Foil Area (sq cm)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={foilArea}
                  onChange={(e) => setFoilArea(parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 50 for logo stamp"
                />
              </div>
            </div>
            <div className="mt-3 p-3 bg-amber-50 rounded-lg text-sm text-amber-700">
              💡 Die cost example: Simple shape ~200 QAR, Complex ~350 QAR. Foil: 0.50 QAR per sq cm for plate
            </div>
          </div>

          {/* Binding, Lamination, Delivery */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
              Binding, Lamination & Delivery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Binding Type</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedBinding}
                  onChange={(e) => setSelectedBinding(e.target.value)}
                >
                  <option value="">No Binding</option>
                  <option value="perfect">Perfect Binding</option>
                  <option value="saddle">Saddle Stitching</option>
                  <option value="spiral_wire">Spiral Binding (Wire-o)</option>
                  <option value="spiral_plastic">Spiral Binding (Plastic)</option>
                  <option value="staple">Staple Binding</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Binding Cost per Book (QAR)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={bindingCost}
                  onChange={(e) => setBindingCost(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Lamination</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedLamination}
                  onChange={(e) => setSelectedLamination(e.target.value)}
                >
                  <option value="">No Lamination</option>
                  {finishingOptions.filter(f => f.name.toLowerCase().includes('lamination')).map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              Notes & Terms
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Notes</label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional notes for the quotation..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Terms & Conditions</label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Settings & Results */}
        <div className="space-y-6">
          {/* Margin Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Profit & VAT
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Profit Margin (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">VAT Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={vatRate}
                  onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            Calculate Quotation
          </button>

          {/* Results */}
          {breakdown && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                Quotation Breakdown
              </h2>
              <div className="space-y-2 text-sm">
                {breakdown.paperCost > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">📄 Paper Cost</span>
                    <span className="font-medium">{breakdown.paperCost.toFixed(2)} QAR</span>
                  </div>
                )}
                {breakdown.plateCost > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">🎯 Plate Cost</span>
                    <span className="font-medium">{breakdown.plateCost.toFixed(2)} QAR</span>
                  </div>
                )}
                {breakdown.printingCost > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">🖨️ Printing Cost</span>
                    <span className="font-medium">{breakdown.printingCost.toFixed(2)} QAR</span>
                  </div>
                )}
                {breakdown.finishingCost > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">✨ Finishing Cost</span>
                    <span className="font-medium">{breakdown.finishingCost.toFixed(2)} QAR</span>
                  </div>
                )}
                {breakdown.labourCost > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">👥 Labour Cost</span>
                    <span className="font-medium">{breakdown.labourCost.toFixed(2)} QAR</span>
                  </div>
                )}
                {breakdown.dieCost > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">✂️ Die Cost</span>
                    <span className="font-medium">{breakdown.dieCost.toFixed(2)} QAR</span>
                  </div>
                )}
                {breakdown.foilCost > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">✨ Foil Cost</span>
                    <span className="font-medium">{breakdown.foilCost.toFixed(2)} QAR</span>
                  </div>
                )}
                {breakdown.embossDebossCost > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">🔨 Emboss/Deboss</span>
                    <span className="font-medium">{breakdown.embossDebossCost.toFixed(2)} QAR</span>
                  </div>
                )}
                {breakdown.laminationCost > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">🛡️ Lamination</span>
                    <span className="font-medium">{breakdown.laminationCost.toFixed(2)} QAR</span>
                  </div>
                )}
                {breakdown.bindingCost > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">📚 Binding</span>
                    <span className="font-medium">{breakdown.bindingCost.toFixed(2)} QAR</span>
                  </div>
                )}
                {breakdown.deliveryCost > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">🚚 Delivery</span>
                    <span className="font-medium">{breakdown.deliveryCost.toFixed(2)} QAR</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-t-2 border-gray-200 font-semibold">
                  <span>🏭 Production Cost</span>
                  <span>{breakdown.totalProductionCost.toFixed(2)} QAR</span>
                </div>
                <div className="flex justify-between py-1 text-green-700">
                  <span>📈 Profit ({breakdown.profitPercentage}%)</span>
                  <span>{breakdown.profit.toFixed(2)} QAR</span>
                </div>
                <div className="flex justify-between py-1 font-medium">
                  <span>💰 Subtotal</span>
                  <span>{breakdown.subtotal.toFixed(2)} QAR</span>
                </div>
                <div className="flex justify-between py-1 text-orange-700">
                  <span>🧾 VAT ({breakdown.vatRate}%)</span>
                  <span>{breakdown.vat.toFixed(2)} QAR</span>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-blue-500 text-lg font-bold text-blue-800">
                  <span>🏁 GRAND TOTAL</span>
                  <span>{breakdown.total.toFixed(2)} QAR</span>
                </div>
                <div className="flex justify-between py-1 text-sm text-gray-500">
                  <span>Unit Price</span>
                  <span>{breakdown.finalUnitPrice.toFixed(3)} QAR/pc</span>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveQuotation}
                disabled={saving}
                className="w-full mt-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
                    Save Quotation
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}