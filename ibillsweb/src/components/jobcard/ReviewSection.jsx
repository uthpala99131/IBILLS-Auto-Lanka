"use client";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot be more than 5')
    .required('Rating is required'),
  comment: Yup.string(),
});

export default function ReviewSection({ review, onUpdate }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Customer Review</h2>
      
      {review?.rating ? (
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {review.rating} out of 5
            </span>
          </div>
          
          {review.comment && (
            <div className="mt-4">
              <p className="text-gray-700">{review.comment}</p>
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-500">
            Reviewed on {new Date(review.date).toLocaleDateString()}
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
            rating: 0,
            comment: '',
          }}
          validationSchema={ReviewSchema}
          onSubmit={(values, { setSubmitting }) => {
            onUpdate({
              ...values,
              date: new Date(),
            }).finally(() => {
              setSubmitting(false);
            });
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="border border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFieldValue('rating', rating)}
                        className="focus:outline-none"
                      >
                        <svg
                          className={`h-8 w-8 ${rating <= values.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <ErrorMessage name="rating" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                    Comments
                  </label>
                  <Field
                    as="textarea"
                    name="comment"
                    id="comment"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}