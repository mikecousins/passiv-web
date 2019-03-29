import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { postData } from '../api';
import { selectLoggedIn, selectPasswordResetToken } from '../selectors';
import { Link } from 'react-router-dom';
import { Form, Input, Label } from '../styled/Form';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';

class ResetPasswordConfirmPage extends Component {
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
          <H1>Choose a new Password</H1>
          {this.state.submitted ? (
            <P>
              Your password has been reset. <Link to="/app/login">Login!</Link>
            </P>
          ) : (
            <Formik
              initialValues={{
                password: '',
              }}
              validate={values => {
                const errors = {};
                if (!values.password || values.password.trim() === '') {
                  errors.password = 'You must set a new password.';
                }
                return errors;
              }}
              onSubmit={(values, actions) => {
                postData('/api/v1/auth/resetPasswordConfirm/', {
                  password: values.password,
                  token: this.props.token,
                })
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
                  <Label htmlFor="password">Password</Label>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    border={errors.password && '1px solid red'}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  {touched.password && errors.password && (
                    <div className="text-red">{errors.password}</div>
                  )}
                  <div>
                    <Button type="submit">Reset</Button>
                  </div>
                </Form>
              )}
            />
          )}
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

export default connect(
  select,
  actions,
)(ResetPasswordConfirmPage);
