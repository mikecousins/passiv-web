import React from 'react';
import { Field, Formik } from 'formik';
import { Link } from 'react-router-dom';

const RegistrationPage = (props) => (
  <React.Fragment>
    <h1>Register</h1>
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: ''
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name || values.name.trim() === '') {
          errors.name = 'Name is required';
        }
        if (!values.email || values.email.trim() === '') {
          errors.email = 'Email is required';
        }
        if (!values.password || values.password.trim() === '') {
          errors.password = 'Password is required';
        }
        return errors;
      }}
      onSubmit={(values, actions) => {
        props.startLogin();
      }}
      render={formikProps => (
        <form>
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <Field name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" />
          {formikProps.touched.name && formikProps.errors.name && (
            <div className="f-error-message">
              {formikProps.errors.name}
            </div>
          )}
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <Field name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" />
          {formikProps.touched.email && formikProps.errors.email && (
            <div className="f-error-message">
              {formikProps.errors.email}
            </div>
          )}
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <Field name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" />
          {formikProps.touched.password && formikProps.errors.password && (
            <div className="f-error-message">
              {formikProps.errors.password}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={formikProps.handleSubmit}
              disabled={formikProps.isSubmitting || !formikProps.isValid || !formikProps.dirty}
            >
              Register
            </button>
            <Link className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" to="/app/login">
              Already Registered?
            </Link>
          </div>
        </form>
      )}
    />
  </React.Fragment>
);

export default RegistrationPage;
