'use client';
import React, { useEffect, useRef, useState } from 'react';

export const InvoiceGenerator = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const invoiceRef = useRef();

  useEffect(() => {
    const now = new Date();
    setCurrentDateTime(now.toLocaleString());
  }, []);

  const customer = {
    name: 'abcd efgh',
    vehicleNumber: 'XYZ-7890',
  };

  const parts = [
    { name: 'Brake Pad', quantity: 2, price: 1400 },
    { name: 'Oil Filter', quantity: 1, price: 1200 },
  ];

  const serviceCharge = 2000;
  const partsTotal = parts.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const totalAmount = serviceCharge + partsTotal;

  const handleDownloadPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default;

    const element = invoiceRef.current;
    const opt = {
      margin: 0.5,
      filename: `Invoice_${customer.vehicleNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="p-4">
      <div ref={invoiceRef} className="max-w-3xl p-10 mx-auto font-sans text-black bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="pb-6 mb-6 border-b border-gray-300">
          <h2 className="text-3xl font-extrabold text-red-600">IBILLS Auto Lanka</h2>
          <div className="mt-2 text-sm text-gray-700">
            <p>Date & Time: <span className="font-medium text-black">{currentDateTime}</span></p>
            <p>Customer Name: <span className="font-medium text-black">{customer.name}</span></p>
            <p>Vehicle Number: <span className="font-medium text-black">{customer.vehicleNumber}</span></p>
          </div>
        </div>

        {/* Table */}
        <div className="mb-6">
          <h3 className="mb-4 text-xl font-semibold text-red-600">Invoice Details</h3>
          <table className="w-full text-sm border border-collapse border-gray-300">
            <thead className="text-white bg-red-600">
              <tr>
                <th className="p-3 border border-gray-300">Part Name</th>
                <th className="p-3 border border-gray-300">Quantity</th>
                <th className="p-3 border border-gray-300">Unit Price (Rs.)</th>
                <th className="p-3 border border-gray-300">Total (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((part, idx) => (
                <tr key={idx} className="bg-white hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">{part.name}</td>
                  <td className="p-3 text-center border border-gray-300">{part.quantity}</td>
                  <td className="p-3 text-right border border-gray-300">{part.price.toFixed(2)}</td>
                  <td className="p-3 text-right border border-gray-300">{(part.quantity * part.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-gray-100">
                <td colSpan="3" className="p-3 font-medium text-right border border-gray-300">Service Charge (Rs):</td>
                <td className="p-3 font-medium text-right border border-gray-300">{serviceCharge.toFixed(2)}</td>
              </tr>
              <tr className="font-bold text-red-800 bg-red-100">
                <td colSpan="3" className="p-3 text-right border border-gray-300">Total Amount (Rs):</td>
                <td className="p-3 text-right border border-gray-300">{totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 font-bold text-white bg-red-600 rounded-md shadow-md hover:bg-red-700"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};
