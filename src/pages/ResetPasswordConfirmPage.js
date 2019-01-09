import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { postDataNoAuth } from '../api';
import { baseUrl } from '../actions';
import { selectLoggedIn, selectPasswordResetToken } from '../selectors';
import { Link } from 'react-router-dom';

class ResetPasswordConfirmPage extends Component {
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
        <h1>Confirm Password Reset</h1>
        {
          this.state.submitted ? (
            <div>
              Your password has been reset. <Link className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" to="/app/login">
                Login!
              </Link>
            </div>
          ) : (
            <Formik
              initialValues={{
                password: '',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.password || values.password.trim() === '') {
                  errors.password = 'You must set a new password.';
                }
                return errors;
              }}
              onSubmit={(values, actions) => {
                postDataNoAuth(`${baseUrl}/api/v1/auth/resetPasswordConfirm/`, {password: values.password, token: this.props.token})
                  .then(response => {
                    this.setState({submitted: true})
                    console.log('success', response);
                  })
                  .catch(error => {console.log('error', error)});
              }}
              render={formikProps => (
                <form>
                  <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {formikProps.touched.password && formikProps.errors.password && (
                    <div className="text-red">
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
                      Reset
                    </button>
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
  token: selectPasswordResetToken(state),
});

const actions = {};

export default connect(select, actions)(ResetPasswordConfirmPage);
