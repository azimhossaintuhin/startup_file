import React from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import schema from './Loginschema'
import { useMutation, useQuery } from '@tanstack/react-query'

const Login = () => {
    //query for login

    const {} = useMutation({
        mutationFn: async (values) => {
            try {
                const response = await apiInstance.post('/auth/login', values)
                return response.data
            } catch (error) {
                throw new Error(error.response?.data?.message || 'Authentication error')
            }
        },
      
    })



  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values) => {
            console.log(values)
            // Add login API call here (e.g., API for authentication)
          }}
          validationSchema={schema}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  id="username"
                  name="username"
                  type="username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="usernaem" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
