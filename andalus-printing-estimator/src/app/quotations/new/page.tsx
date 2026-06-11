'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface Customer {
  id: string;
  company_name: string;
}

interface Settings {
  profit_margin: number;
  vat_rate: number;
}

export default function NewQuotationPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [settings, setSettings] = useState<Settings>({ profit_margin: 25, vat_rate: 5 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [newItem, setNewItem] = useState({
    description: '',
    quantity: 1,
    unit_price: 0,
  });

  useEffect(() => {
    const initializeData = async () => {
      // Mock data
      setCustomers([]);
      setSettings({ profit_margin: 25, vat_rate: 5 });
      setLoading(false);
    };

    initializeData();
  }, []);

  const addItem = () => {
    if (!newItem.description || newItem.quantity <= 0 || newItem.unit_price <= 0) {
      alert('Please fill in all item fields with valid values');
      return;
    }

    const item: QuotationItem = {
      id: Date.now().toString(),
      description: newItem.description,
      quantity: newItem.quantity,
      unit_price: newItem.unit_price,
      total: newItem.quantity * newItem.unit_price,
    };

    setItems([...items, item]);
    setNewItem({ description: '', quantity: 1, unit_price: 0 });
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: string, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unit_price') {
          updated.total = updated.quantity * updated.unit_price;
        }
        return updated;
      }
      return item;
    }));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const vat = subtotal * (settings.vat_rate / 100);
    const total = subtotal + vat;
    return { subtotal, vat, total };
  };

  const handleSaveQuotation = async () => {
    if (!selectedCustomer || items.length === 0) {
      alert('Please select a customer and add items');
      return;
    }

    setSaving(true);
    try {
      const { subtotal, vat, total } = calculateTotals();
      
      // Mock save - in real app would save to database
      const quotation = {
        id: Date.now().toString(),
        quotation_number: `QT-${Date.now()}`,
        customer_id: selectedCustomer,
        status: 'Draft',
        subtotal_amount: subtotal,
        vat_amount: vat,
        total_amount: total,
        items: items,
        created_at: new Date().toISOString(),
      };

      alert('Quotation saved successfully!');
      router.push('/quotations');
    } catch (err: any) {
      alert('Error saving quotation: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleGeneratePDF = () => {
    if (!selectedCustomer || items.length === 0) {
      alert('Please select a customer and add items');
      return;
    }

    const { subtotal, vat, total } = calculateTotals();
    const customer = customers.find(c => c.id === selectedCustomer);

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Quotation', 20, 20);

    doc.setFontSize(10);
    doc.text(`Customer: ${customer?.company_name || 'N/A'}`, 20, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);

    let yPos = 70;
    doc.setFontSize(12);
    doc.text('Item', 20, yPos);
    doc.text('Qty', 80, yPos);
    doc.text('Unit Price', 110, yPos);
    doc.text('Total', 160, yPos);

    doc.setFontSize(10);
    yPos += 10;

    items.forEach(item => {
      doc.text(item.description.substring(0, 40), 20, yPos);
      doc.text(item.quantity.toString(), 80, yPos);
      doc.text(item.unit_price.toFixed(2), 110, yPos);
      doc.text(item.total.toFixed(2), 160, yPos);
      yPos += 10;
    });

    yPos += 10;
    doc.setFontSize(12);
    doc.text(`Subtotal: ${subtotal.toFixed(2)} QAR`, 110, yPos);
    yPos += 10;
    doc.text(`VAT (${settings.vat_rate}%): ${vat.toFixed(2)} QAR`, 110, yPos);
    yPos += 10;
    doc.setFontSize(14);
    doc.text(`Total: ${total.toFixed(2)} QAR`, 110, yPos);

    doc.save(`quotation-${Date.now()}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  const { subtotal, vat, total } = calculateTotals();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Create New Quotation</h1>

      {/* Customer Selection */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Customer *</label>
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Select a customer --</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>{customer.company_name}</option>
          ))}
        </select>
      </div>

      {/* Line Items */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quotation Items</h2>

        <div className="mb-6 p-4 border border-gray-300 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <input
                type="text"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Item description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price (QAR) *</label>
              <input
                type="number"
                value={newItem.unit_price}
                onChange={(e) => setNewItem({ ...newItem, unit_price: parseFloat(e.target.value) || 0 })}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
              <input
                type="text"
                disabled
                value={(newItem.quantity * newItem.unit_price).toFixed(2)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={addItem}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>

        {items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 mb-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price (QAR)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total (QAR)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        min="1"
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <input
                        type="number"
                        value={item.unit_price}
                        onChange={(e) => updateItem(item.id, 'unit_price', parseFloat(e.target.value) || 0)}
                        step="0.01"
                        min="0"
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{item.total.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-end">
          <div className="w-full md:w-1/3">
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
              <span className="font-medium text-gray-700">Subtotal:</span>
              <span className="font-medium text-gray-900">{subtotal.toFixed(2)} QAR</span>
            </div>
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
              <span className="font-medium text-gray-700">VAT ({settings.vat_rate}%):</span>
              <span className="font-medium text-gray-900">{vat.toFixed(2)} QAR</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="font-bold text-blue-600">{total.toFixed(2)} QAR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => router.push('/quotations')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleGeneratePDF}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
        >
          Generate PDF
        </button>
        <button
          onClick={handleSaveQuotation}
          disabled={saving}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {saving ? 'Saving...' : 'Save Quotation'}
        </button>
      </div>
    </div>
  );
}