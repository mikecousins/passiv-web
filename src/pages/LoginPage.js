import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginSucceeded } from '../actions';
import { postData } from '../api';
import { selectLoggedIn } from '../selectors';
import LoginLinks from '../components/LoginLinks';
import { Form, Input, Label } from '../styled/Form';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';

const LoginPage = props => {
  if (props.loggedIn) {
    let nextPath = '/app/dashboard';
    if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.nextPathname
    ) {
      nextPath = props.location.state.nextPathname;
    }
    return <Redirect to={nextPath} />;
  } else {
    return (
      <React.Fragment>
        <H1>Welcome back!</H1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={(values, actions) => {
            postData('/api/v1/auth/login/', {
              email: values.email,
              password: values.password,
            })
              .then(response => {
                actions.setSubmitting(false);
                props.loginSucceeded(response);
              })
              .catch(error => {
                actions.setErrors({
                  password:
                    error.response.data.non_field_errors || 'Failed to login.',
                });
                actions.setSubmitting(false);
              });
          }}
          render={props => (
            <Form onSubmit={props.handleSubmit}>
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="Email" />

              <P>
                <ErrorMessage name="email" />
              </P>
              <Label>Password</Label>
              <Input
                error={props.touched.password && props.errors.password}
                type="password"
                name="password"
                placeholder="Password"
              />
              <P>
                <ErrorMessage name="password" />
              </P>
              <div>
                <Button
                  type="submit"
                  disabled={!props.isValid || props.isSubmitting}
                  data-cy="login-button"
                >
                  Sign In
                </Button>
                <LoginLinks page="login" />
              </div>
            </Form>
          )}
        />
      </React.Fragment>
    );
  }
};

const select = state => ({
  loggedIn: selectLoggedIn(state),
});

const actions = { loginSucceeded: loginSucceeded };

export default connect(
  select,
  actions,
)(LoginPage);
