import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { loginStartedAsync } from '../actions';
import { selectLoggedIn } from '../selectors';

const LoginPage = (props) => {
  if (props.loggedIn) {
    let nextPath = '/dashboard';
    if (props && props.location && props.location.state && props.location.state.nextPathname) {
      nextPath = props.location.state.nextPathname;
    }
    return <Redirect to={nextPath} />;
  } else {
    return (
      <React.Fragment>
        <h1>Welcome back!</h1>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validate={(values) => {
            const errors = {};
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
                  Sign In
                </button>
                <Link className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" to="#">
                  Forgot Password?
                </Link>
              </div>
            </form>
          )}
        />
      </React.Fragment>
    );
  }
}

const select = state => ({
  loggedIn: selectLoggedIn(state),
});

const actions = { startLogin: loginStartedAsync };

export default connect(select, actions)(LoginPage);
