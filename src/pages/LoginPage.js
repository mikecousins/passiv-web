import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
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
          validate={values => {
            let errors = {};

            let regex = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

            if (!values.email) {
              errors.email = 'Email is required';
            }else if (regex.test(values.email)) {
              errors.email = "Invalid email address";
            }

            if (!values.password) {
              errors.password = 'Password is required';
            }
            return errors;
          }}
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
          }) => (
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type="text"
                name="email"
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <div className="text-red">
                  {errors.email}
                </div>
              )}
              <Label>
                Password
              </Label>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                border={
                  errors.password && "1px solid red"
                }
                type="password"
                name="password"
                placeholder="Password"
              />
              {touched.password && errors.password && (
                <div className="text-red">
                  {errors.password}
                </div>
              )}
              <div>
                <Button
                  type="submit"
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
