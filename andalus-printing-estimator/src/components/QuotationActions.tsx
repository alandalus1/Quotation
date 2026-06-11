'use client';

import { QRCodeSVG } from 'qrcode.react';
import { generateQuotationPDF } from '@/lib/pdfGenerator';

interface QuotationActionsProps {
  quotation: any;
}

export default function QuotationActions({ quotation }: QuotationActionsProps) {
  const handleDownloadPDF = () => {
    generateQuotationPDF({
      quotationNumber: quotation.quotation_number,
      date: new Date(quotation.created_at).toLocaleDateString(),
      customer: {
        name: quotation.customers?.contact_person || 'N/A',
        company: quotation.customers?.company_name || 'N/A',
        mobile: quotation.customers?.mobile || 'N/A',
        email: quotation.customers?.email || 'N/A',
      },
      items: [
        {
          description: quotation.products?.name || 'Printing Job',
          quantity: quotation.quantity,
          unitPrice: quotation.unit_price,
          total: quotation.total_amount,
        },
      ],
      subtotal: quotation.total_amount / 1.05, // Simplified
      vat: quotation.total_amount - (quotation.total_amount / 1.05),
      total: quotation.total_amount,
      notes: quotation.notes,
    });
  };

  const handleShareWhatsApp = () => {
    const message = `Hello, here is your quotation from Al Andalus Printing Press.\nQuotation #: ${quotation.quotation_number}\nTotal: ${quotation.total_amount} QAR`;
    const url = `https://wa.me/${quotation.customers?.mobile?.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">Actions</h3>
      <div className="flex space-x-2">
        <button
          onClick={handleDownloadPDF}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
        <button
          onClick={handleShareWhatsApp}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Share WhatsApp
        </button>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <span className="text-sm text-gray-500">Scan to verify</span>
        <QRCodeSVG value={`https://alandaluspress.com/verify/${quotation.id}`} size={128} />
      </div>
    </div>
  );
}