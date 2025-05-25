import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import html2pdf from 'html2pdf.js';

export default function BillGenerator({ jobCard, onUpdate }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadBill = () => {
    setIsGenerating(true);
    const element = document.getElementById('bill-content');
    const opt = {
      margin: 10,
      filename: `IBILLS_${jobCard.cardNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save().finally(() => {
      setIsGenerating(false);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Service Bill</h2>
        <button
          onClick={handleDownloadBill}
          disabled={isGenerating}
          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          {isGenerating ? 'Generating...' : 'Download Bill'}
        </button>
      </div>
      
      <div id="bill-content" className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black">IBILLS Lanka Automobile Service</h1>
          <p className="text-gray-600">123 Garage Road, Colombo, Sri Lanka</p>
          <p className="text-gray-600">Tel: +94 11 234 5678 | Email: info@ibills.lk</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium text-black border-b border-gray-200 pb-2 mb-2">Customer Details</h3>
            <p className="text-gray-800">{jobCard.customer.name}</p>
            <p className="text-gray-600">{jobCard.customer.contact}</p>
            {jobCard.customer.email && <p className="text-gray-600">{jobCard.customer.email}</p>}
            {jobCard.customer.address && <p className="text-gray-600">{jobCard.customer.address}</p>}
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-black border-b border-gray-200 pb-2 mb-2">Job Card Details</h3>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-600">Job Card #:</p>
              <p className="text-gray-800">{jobCard.cardNumber}</p>
              
              <p className="text-gray-600">Date:</p>
              <p className="text-gray-800">{new Date(jobCard.date).toLocaleDateString()}</p>
              
              <p className="text-gray-600">Vehicle:</p>
              <p className="text-gray-800">{jobCard.vehicle.make} {jobCard.vehicle.model} ({jobCard.vehicle.registrationNo})</p>
              
              <p className="text-gray-600">Mileage:</p>
              <p className="text-gray-800">{jobCard.vehicle.currentMileage} km</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-black border-b border-gray-200 pb-2 mb-2">Services Performed</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Charge (LKR)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobCard.services.map((service, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.technician || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      service.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{service.charge.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {jobCard.parts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-black border-b border-gray-200 pb-2 mb-2">Parts Used</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part #</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobCard.parts.map((part, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{part.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.partNumber || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{part.unitPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{(part.quantity * part.unitPrice).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex justify-end">
            <div className="w-full max-w-md">
              <div className="grid grid-cols-2 gap-4">
                <p className="text-gray-600">Subtotal:</p>
                <p className="text-right">LKR {jobCard.bill.subtotal.toFixed(2)}</p>
                
                {jobCard.bill.discount > 0 && (
                  <>
                    <p className="text-gray-600">Discount:</p>
                    <p className="text-right">- LKR {jobCard.bill.discount.toFixed(2)}</p>
                  </>
                )}
                
                {jobCard.bill.tax > 0 && (
                  <>
                    <p className="text-gray-600">Tax ({jobCard.bill.tax}%):</p>
                    <p className="text-right">LKR {(jobCard.bill.subtotal * (jobCard.bill.tax / 100)).toFixed(2)}</p>
                  </>
                )}
                
                <p className="text-lg font-medium text-black">Total:</p>
                <p className="text-lg font-medium text-black text-right">LKR {jobCard.bill.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Customer Signature</p>
              <div className="mt-8 h-16 border-b border-gray-300"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Authorized Signature</p>
              <div className="mt-8 h-16 border-b border-gray-300"></div>
            </div>
          </div>
          <p className="mt-8 text-xs text-gray-500 text-center">
            Thank you for choosing IBILLS Lanka Automobile Service. For any inquiries, please contact us at +94 11 234 5678.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Bill Settings</h3>
        <Formik
          initialValues={{
            tax: jobCard.bill.tax || 0,
            discount: jobCard.bill.discount || 0,
            paid: jobCard.bill.paid || false,
          }}
          onSubmit={(values) => {
            onUpdate({
              bill: {
                ...jobCard.bill,
                ...values,
              }
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="tax" className="block text-sm font-medium text-gray-700">
                  Tax (%)
                </label>
                <Field
                  type="number"
                  name="tax"
                  id="tax"
                  min="0"
                  max="100"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                  Discount (LKR)
                </label>
                <Field
                  type="number"
                  name="discount"
                  id="discount"
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
              
              <div className="flex items-end">
                <div className="flex items-center h-10">
                  <Field
                    type="checkbox"
                    name="paid"
                    id="paid"
                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="paid" className="ml-2 block text-sm text-gray-700">
                    Mark as Paid
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}