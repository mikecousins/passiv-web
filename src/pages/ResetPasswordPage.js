import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { postDataNoAuth } from '../api';
import { baseUrl } from '../actions';
import { selectLoggedIn } from '../selectors';
import LoginLinks from '../components/LoginLinks';

class ResetPasswordPage extends Component {
  state = {
    submitted: false,
  }
  render() {
    if (this.props.loggedIn) {
      let nextPath = '/app/dashboard';
      if (this.props && this.props.location && this.props.location.state && this.props.location.state.nextPathname) {
        nextPath = this.props.location.state.nextPathname;
      }
      return <Redirect to={nextPath} />;
    } else {
      return (
      <React.Fragment>
        <h1>Password Reset</h1>
        {
          this.state.submitted ? (
            <div>
              Your password reset request has been sent. Go check your email and follow the instructions.
            </div>
          ) : (
            <Formik
              initialValues={{
                email: '',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email || values.email.trim() === '') {
                  errors.email = 'Email is required';
                }
                return errors;
              }}
              onSubmit={(values, actions) => {
                postDataNoAuth(`${baseUrl}/api/v1/auth/resetPassword/`, values)
                  .then(response => {
                    this.setState({submitted: true})
                    console.log('success', response);
                  })
                  .catch(error => {console.log('error', error)});
              }}
              render={formikProps => (
                <form>
                  <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <Field
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {formikProps.touched.email && formikProps.errors.email && (
                    <div className="text-red">
                      {formikProps.errors.email}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={formikProps.handleSubmit}
                      disabled={formikProps.isSubmitting || !formikProps.isValid || !formikProps.dirty}
                    >
                      Reset
                    </button>
                    <LoginLinks page="reset" />
                  </div>
                </form>
              )}
            />
          )
        }

      </React.Fragment>
    );
    }
  }
}




const select = state => ({
  loggedIn: selectLoggedIn(state),
});

const actions = {};

export default connect(select, actions)(ResetPasswordPage);
