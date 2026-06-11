import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface QuotationData {
  quotationNumber: string;
  date: string;
  customer: {
    name: string;
    company: string;
    mobile: string;
    email: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  vat: number;
  total: number;
  notes?: string;
}

export const generateQuotationPDF = (data: QuotationData) => {
  const doc = new jsPDF();

  // --- Header ---
  doc.setFontSize(22);
  doc.setTextColor(0, 51, 102); // Dark Blue
  doc.text('Al Andalus Printing Press', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Doha, Qatar | Tel: +974 1234 5678 | Email: info@alandaluspress.com', 105, 28, { align: 'center' });
  doc.text('www.alandaluspress.com', 105, 33, { align: 'center' });

  doc.setDrawColor(0, 51, 102);
  doc.setLineWidth(0.5);
  doc.line(20, 38, 190, 38);

  // --- Quotation Info ---
  doc.setFontSize(16);
  doc.setTextColor(0, 51, 102);
  doc.text('QUOTATION', 20, 50);

  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text(`Quotation #: ${data.quotationNumber}`, 140, 50);
  doc.text(`Date: ${data.date}`, 140, 55);

  // --- Customer Info ---
  doc.setFontSize(12);
  doc.text('Bill To:', 20, 65);
  doc.setFontSize(10);
  doc.text(data.customer.name, 20, 72);
  doc.text(data.customer.company, 20, 77);
  doc.text(`Mobile: ${data.customer.mobile}`, 20, 82);
  doc.text(`Email: ${data.customer.email}`, 20, 87);

  // --- Items Table ---
  autoTable(doc, {
    startY: 95,
    head: [['Description', 'Quantity', 'Unit Price (QAR)', 'Total (QAR)']],
    body: data.items.map(item => [
      item.description,
      item.quantity.toString(),
      item.unitPrice.toFixed(2),
      item.total.toFixed(2)
    ]),
    headStyles: { fillColor: [0, 51, 102] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });

  // --- Totals ---
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.text(`Subtotal:`, 140, finalY);
  doc.text(`${data.subtotal.toFixed(2)} QAR`, 170, finalY, { align: 'right' });

  doc.text(`VAT (5%):`, 140, finalY + 7);
  doc.text(`${data.vat.toFixed(2)} QAR`, 170, finalY + 7, { align: 'right' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total:`, 140, finalY + 15);
  doc.text(`${data.total.toFixed(2)} QAR`, 170, finalY + 15, { align: 'right' });

  // --- Notes & Terms ---
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  if (data.notes) {
    doc.text('Notes:', 20, finalY + 30);
    doc.text(data.notes, 20, finalY + 37, { maxWidth: 170 });
  }

  doc.text('Terms & Conditions:', 20, finalY + 60);
  doc.setFontSize(8);
  doc.text('1. Prices are valid for 30 days.', 20, finalY + 67);
  doc.text('2. 50% advance payment required.', 20, finalY + 72);
  doc.text('3. Delivery within 7-10 working days after approval.', 20, finalY + 77);

  // --- Footer ---
  doc.setFontSize(10);
  doc.text('Authorized Signature', 150, finalY + 100);
  doc.line(140, finalY + 95, 190, finalY + 95);

  // Save the PDF
  doc.save(`Quotation_${data.quotationNumber}.pdf`);
};