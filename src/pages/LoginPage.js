import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginStartedAsync } from '../actions';
import { selectLoggedIn } from '../selectors';
import LoginLinks from '../components/LoginLinks';
import { Form, Input, Label } from '../styled/Form';
import { H1 } from '../styled/GlobalElements';
import { Button } from '../styled/Button';


const LoginPage = (props) => {
  if (props.loggedIn) {
    let nextPath = '/app/dashboard';
    if (props && props.location && props.location.state && props.location.state.nextPathname) {
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
            password: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .required('Required'),
            password: Yup.string()
              .required('Required')
          })}
          onSubmit={(values, actions) => {
            props.startLogin(values);
          }}
          render={({
            touched,
            errors,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                name="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" />
              <Label>
                Password
              </Label>
              <Input
                border={
                  errors.password && "1px solid red"
                }
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" />
              <div>
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
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
}

const select = state => ({
  loggedIn: selectLoggedIn(state),
});

const actions = { startLogin: loginStartedAsync };

export default connect(select, actions)(LoginPage);
