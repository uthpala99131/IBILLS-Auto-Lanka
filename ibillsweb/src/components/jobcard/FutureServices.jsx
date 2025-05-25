import { useState } from 'react';
import { Formik, Form, FieldArray, Field } from 'formik';

const serviceTypes = [
  { name: 'Oil Change', interval: 5000 },
  { name: 'Air Filter Replacement', interval: 15000 },
  { name: 'Cabin Air Filter Replacement', interval: 20000 },
  { name: 'Fuel Filter Replacement', interval: 30000 },
  { name: 'Spark Plug Replacement', interval: 40000 },
  { name: 'Transmission Fluid Change', interval: 60000 },
  { name: 'Timing Belt Replacement', interval: 80000 },
  { name: 'Brake Fluid Flush', interval: 20000 },
  { name: 'Coolant Flush', interval: 30000 },
];

export default function FutureServices({ futureServices, currentMileage, onUpdate }) {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Recommended Future Services</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          {showAddForm ? 'Cancel' : 'Add Service'}
        </button>
      </div>
      
      {showAddForm && (
        <Formik
          initialValues={{
            serviceType: '',
            recommendedMileage: currentMileage + 5000,
            description: '',
          }}
          onSubmit={(values, { resetForm }) => {
            onUpdate([...futureServices, {
              serviceType: values.serviceType,
              recommendedMileage: values.recommendedMileage,
              description: values.description,
            }]);
            resetForm();
            setShowAddForm(false);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                    Service Type
                  </label>
                  <Field
                    as="select"
                    name="serviceType"
                    id="serviceType"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    onChange={(e) => {
                      setFieldValue('serviceType', e.target.value);
                      const selectedService = serviceTypes.find(s => s.name === e.target.value);
                      if (selectedService) {
                        setFieldValue('recommendedMileage', currentMileage + selectedService.interval);
                      }
                    }}
                  >
                    <option value="">Select a service type</option>
                    {serviceTypes.map((service) => (
                      <option key={service.name} value={service.name}>{service.name}</option>
                    ))}
                  </Field>
                </div>
                
                <div>
                  <label htmlFor="recommendedMileage" className="block text-sm font-medium text-gray-700">
                    Recommended Mileage
                  </label>
                  <Field
                    type="number"
                    name="recommendedMileage"
                    id="recommendedMileage"
                    min={currentMileage + 1}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    id="description"
                    rows={1}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Add Service
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      
      {futureServices.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No future services recommended yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {futureServices.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{service.serviceType}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Recommended at: {service.recommendedMileage} km (current: {currentMileage} km)
                  </p>
                  {service.description && (
                    <p className="text-sm text-gray-700 mt-2">{service.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newServices = [...futureServices];
                    newServices.splice(index, 1);
                    onUpdate(newServices);
                  }}
                  className="text-xs text-gray-600 hover:text-gray-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}