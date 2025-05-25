"use client";
import { useState } from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ServiceSchema = Yup.object().shape({
  services: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required('Service description is required'),
      technician: Yup.string(),
      status: Yup.string().required(),
      charge: Yup.number().min(0, 'Charge cannot be negative').required('Charge is required'),
    })
  ),
});

export default function ServiceList({ services, onUpdate, readOnly = false }) {
  const [editingIndex, setEditingIndex] = useState(null);

  return (
    <Formik
      initialValues={{ services }}
      validationSchema={ServiceSchema}
      onSubmit={(values) => {
        onUpdate(values.services);
        setEditingIndex(null);
      }}
      enableReinitialize
    >
      {({ values, handleSubmit }) => (
        <Form className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Services</h2>
            {!readOnly && (
              <button
                type="button"
                onClick={() => {
                  values.services.push({
                    description: '',
                    technician: '',
                    status: 'Pending',
                    charge: 0,
                  });
                  setEditingIndex(values.services.length - 1);
                }}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Add Service
              </button>
            )}
          </div>
          
          <FieldArray name="services">
            {() => (
              <div className="space-y-4">
                {values.services.map((service, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    {editingIndex === index ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={`services.${index}.description`} className="block text-sm font-medium text-gray-700">
                            Description *
                          </label>
                          <Field
                            as="textarea"
                            name={`services.${index}.description`}
                            id={`services.${index}.description`}
                            rows={2}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          />
                          <ErrorMessage name={`services.${index}.description`} component="div" className="mt-1 text-sm text-red-600" />
                        </div>
                        
                        <div>
                          <label htmlFor={`services.${index}.technician`} className="block text-sm font-medium text-gray-700">
                            Technician
                          </label>
                          <Field
                            type="text"
                            name={`services.${index}.technician`}
                            id={`services.${index}.technician`}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`services.${index}.status`} className="block text-sm font-medium text-gray-700">
                            Status
                          </label>
                          <Field
                            as="select"
                            name={`services.${index}.status`}
                            id={`services.${index}.status`}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </Field>
                        </div>
                        
                        <div>
                          <label htmlFor={`services.${index}.charge`} className="block text-sm font-medium text-gray-700">
                            Charge (LKR) *
                          </label>
                          <Field
                            type="number"
                            name={`services.${index}.charge`}
                            id={`services.${index}.charge`}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          />
                          <ErrorMessage name={`services.${index}.charge`} component="div" className="mt-1 text-sm text-red-600" />
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
                          <h3 className="text-sm font-medium text-gray-900">{service.description}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {service.technician && `Technician: ${service.technician} • `}
                            Status: <span className={`font-medium ${
                              service.status === 'Completed' ? 'text-green-600' : 
                              service.status === 'In Progress' ? 'text-yellow-600' : 'text-gray-600'
                            }`}>{service.status}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">LKR {service.charge.toFixed(2)}</p>
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
                                  const newServices = [...values.services];
                                  newServices.splice(index, 1);
                                  onUpdate(newServices);
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
        </Form>
      )}
    </Formik>
  );
}