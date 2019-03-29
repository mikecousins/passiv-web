import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { postData } from '../api';
import { selectLoggedIn } from '../selectors';
import LoginLinks from '../components/LoginLinks';
import { Form, Input, Label } from '../styled/Form';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';

class ResetPasswordPage extends Component {
  state = {
    submitted: false,
  };
  render() {
    if (this.props.loggedIn) {
      let nextPath = '/app/dashboard';
      if (
        this.props &&
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.nextPathname
      ) {
        nextPath = this.props.location.state.nextPathname;
      }
      return <Redirect to={nextPath} />;
    } else {
      return (
        <React.Fragment>
          <H1>Reset your Password</H1>
          {this.state.submitted ? (
            <P>
              Your password reset request has been sent. Go check your email and
              follow the instructions.
            </P>
          ) : (
            <div>
              <P>
                Enter the email address used for your Passiv account and we will
                send a password reset link to your email.
              </P>
              <Formik
                initialValues={{
                  email: '',
                }}
                validate={values => {
                  let errors = {};
                  if (!values.email) {
                    errors.email = 'Email is required';
                  }
                  return errors;
                }}
                onSubmit={(values, actions) => {
                  postData('/api/v1/auth/resetPassword/', values)
                    .then(response => {
                      this.setState({ submitted: true });
                    })
                    .catch(error => {
                      console.log('error', error.response.data);
                    });
                }}
                render={({
                  touched,
                  errors,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      type="text"
                      name="email"
                      placeholder="example@example.com"
                    />
                    {touched.email && errors.email && (
                      <div className="text-red">{errors.email}</div>
                    )}
                    <div>
                      <Button type="submit">Reset</Button>
                      <LoginLinks page="reset" />
                    </div>
                  </Form>
                )}
              />
            </div>
          )}
        </React.Fragment>
      );
    }
  }
}

const select = state => ({
  loggedIn: selectLoggedIn(state),
});

const actions = {};

export default connect(
  select,
  actions,
)(ResetPasswordPage);
