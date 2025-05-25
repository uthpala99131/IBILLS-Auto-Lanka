import { useState } from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PartSchema = Yup.object().shape({
  parts: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Part name is required'),
      partNumber: Yup.string(),
      quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
      unitPrice: Yup.number().min(0, 'Price cannot be negative').required('Price is required'),
    })
  ),
});

export default function PartsList({ parts, onUpdate, readOnly = false }) {
  const [editingIndex, setEditingIndex] = useState(null);

  return (
    <Formik
      initialValues={{ parts }}
      validationSchema={PartSchema}
      onSubmit={(values) => {
        onUpdate(values.parts);
        setEditingIndex(null);
      }}
      enableReinitialize
    >
      {({ values, handleSubmit }) => (
        <Form className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Parts Used</h2>
            {!readOnly && (
              <button
                type="button"
                onClick={() => {
                  values.parts.push({
                    name: '',
                    partNumber: '',
                    quantity: 1,
                    unitPrice: 0,
                  });
                  setEditingIndex(values.parts.length - 1);
                }}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Add Part
              </button>
            )}
          </div>
          
          {values.parts.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No parts added yet</p>
            </div>
          ) : (
            <FieldArray name="parts">
              {() => (
                <div className="space-y-4">
                  {values.parts.map((part, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      {editingIndex === index ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor={`parts.${index}.name`} className="block text-sm font-medium text-gray-700">
                              Part Name *
                            </label>
                            <Field
                              type="text"
                              name={`parts.${index}.name`}
                              id={`parts.${index}.name`}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            />
                            <ErrorMessage name={`parts.${index}.name`} component="div" className="mt-1 text-sm text-red-600" />
                          </div>
                          
                          <div>
                            <label htmlFor={`parts.${index}.partNumber`} className="block text-sm font-medium text-gray-700">
                              Part Number
                            </label>
                            <Field
                              type="text"
                              name={`parts.${index}.partNumber`}
                              id={`parts.${index}.partNumber`}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor={`parts.${index}.quantity`} className="block text-sm font-medium text-gray-700">
                              Quantity *
                            </label>
                            <Field
                              type="number"
                              name={`parts.${index}.quantity`}
                              id={`parts.${index}.quantity`}
                              min="1"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            />
                            <ErrorMessage name={`parts.${index}.quantity`} component="div" className="mt-1 text-sm text-red-600" />
                          </div>
                          
                          <div>
                            <label htmlFor={`parts.${index}.unitPrice`} className="block text-sm font-medium text-gray-700">
                              Unit Price (LKR) *
                            </label>
                            <Field
                              type="number"
                              name={`parts.${index}.unitPrice`}
                              id={`parts.${index}.unitPrice`}
                              min="0"
                              step="0.01"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            />
                            <ErrorMessage name={`parts.${index}.unitPrice`} component="div" className="mt-1 text-sm text-red-600" />
                          </div>
                          
                          <div className="md:col-span-2 flex justify-end space-x-2">
                            <button
                              type="button"
                              onClick={() => setEditingIndex(null)}
                              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleSubmit}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{part.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {part.partNumber && `Part #: ${part.partNumber} • `}
                              Qty: {part.quantity} × LKR {part.unitPrice.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">LKR {(part.quantity * part.unitPrice).toFixed(2)}</p>
                            {!readOnly && (
                              <div className="mt-2 flex space-x-2">
                                <button
                                  type="button"
                                  onClick={() => setEditingIndex(index)}
                                  className="text-xs text-red-600 hover:text-red-800"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newParts = [...values.parts];
                                    newParts.splice(index, 1);
                                    onUpdate(newParts);
                                  }}
                                  className="text-xs text-gray-600 hover:text-gray-800"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
          )}
        </Form>
      )}
    </Formik>
  );
}