import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const JobCardSchema = Yup.object().shape({
  customer: Yup.object().shape({
    name: Yup.string().required('Customer name is required'),
    contact: Yup.string().required('Contact number is required'),
    email: Yup.string().email('Invalid email'),
    address: Yup.string(),
  }),
  vehicle: Yup.object().shape({
    make: Yup.string().required('Make is required'),
    model: Yup.string().required('Model is required'),
    year: Yup.number().min(1900, 'Invalid year').max(new Date().getFullYear() + 1, 'Invalid year'),
    registrationNo: Yup.string().required('Registration number is required'),
    vin: Yup.string(),
    currentMileage: Yup.number().required('Current mileage is required').min(0, 'Mileage cannot be negative'),
  }),
});

export default function JobCardForm({ initialValues, onSubmit, isSubmitting, readOnly = false }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={JobCardSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="customer.name" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <Field
                  type="text"
                  name="customer.name"
                  id="customer.name"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${readOnly ? 'bg-gray-100' : ''}`}
                  readOnly={readOnly}
                />
                <ErrorMessage name="customer.name" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              
              <div>
                <label htmlFor="customer.contact" className="block text-sm font-medium text-gray-700">
                  Contact Number *
                </label>
                <Field
                  type="text"
                  name="customer.contact"
                  id="customer.contact"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${readOnly ? 'bg-gray-100' : ''}`}
                  readOnly={readOnly}
                />
                <ErrorMessage name="customer.contact" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              
              <div>
                <label htmlFor="customer.email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  name="customer.email"
                  id="customer.email"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${readOnly ? 'bg-gray-100' : ''}`}
                  readOnly={readOnly}
                />
                <ErrorMessage name="customer.email" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              
              <div>
                <label htmlFor="customer.address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <Field
                  type="text"
                  name="customer.address"
                  id="customer.address"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${readOnly ? 'bg-gray-100' : ''}`}
                  readOnly={readOnly}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Vehicle Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="vehicle.make" className="block text-sm font-medium text-gray-700">
                  Make *
                </label>
                <Field
                  type="text"
                  name="vehicle.make"
                  id="vehicle.make"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${readOnly ? 'bg-gray-100' : ''}`}
                  readOnly={readOnly}
                />
                <ErrorMessage name="vehicle.make" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              
              <div>
                <label htmlFor="vehicle.model" className="block text-sm font-medium text-gray-700">
                  Model *
                </label>
                <Field
                  type="text"
                  name="vehicle.model"
                  id="vehicle.model"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${readOnly ? 'bg-gray-100' : ''}`}
                  readOnly={readOnly}
                />
                <ErrorMessage name="vehicle.model" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              
              <div>
                <label htmlFor="vehicle.year" className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <Field
                  type="number"
                  name="vehicle.year"
                  id="vehicle.year"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${readOnly ? 'bg-gray-100' : ''}`}
                  readOnly={readOnly}
                />
                <ErrorMessage name="vehicle.year" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              
              <div>
                <label htmlFor="vehicle.registrationNo" className="block text-sm font-medium text-gray-700">
                  Registration No *
                </label>
                <Field
                  type="text"
                  name="vehicle.registrationNo"
                  id="vehicle.registrationNo"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${readOnly ? 'bg-gray-100' : ''}`}
                  readOnly={readOnly}
                />
                <ErrorMessage name="vehicle.registrationNo" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              
              <div>
                <label htmlFor="vehicle.vin" className="block text-sm font-medium text-gray-700">
                  VIN (Chassis No)
                </label>
                <Field
                  type="text"
                  name="vehicle.vin"
                  id="vehicle.vin"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${readOnly ? 'bg-gray-100' : ''}`}
                  readOnly={readOnly}
                />
              </div>
              
              <div>
                <label htmlFor="vehicle.currentMileage" className="block text-sm font-medium text-gray-700">
                  Current Mileage (km) *
                </label>
                <Field
                  type="number"
                  name="vehicle.currentMileage"
                  id="vehicle.currentMileage"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${readOnly ? 'bg-gray-100' : ''}`}
                  readOnly={readOnly}
                />
                <ErrorMessage name="vehicle.currentMileage" component="div" className="mt-1 text-sm text-red-600" />
              </div>
            </div>
          </div>
          
          {!readOnly && (
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : 'Save Changes'}
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}