import React from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerStartedAsync } from '../actions';
import { selectLoggedIn } from '../selectors';
import LoginLinks from '../components/LoginLinks';
import { Form, Input, Label } from '../styled/Form';
import { H1 } from '../styled/GlobalElements';
import { Button } from '../styled/Button';

const RegistrationPage = (props) => {
  if (props.loggedIn) {
    let nextPath = '/app/dashboard';
    if (props && props.location && props.location.state && props.location.state.nextPathname) {
      nextPath = props.location.state.nextPathname;
    }
    return <Redirect to={nextPath} />;
} else {
  return (
    <React.Fragment>
      <H1>Create an Account</H1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: ''
        }}
        validate={values => {
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
          props.startRegister(values);
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
            <Label htmlFor="name">
              Name
            </Label>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="name"
              placeholder="Ex: Jane Smith"
            />
            {touched.name && errors.name && (
              <div className="f-error-message">
                {errors.name}
              </div>
            )}
            <Label htmlFor="email">
              Email
            </Label>
            <Input onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              type="text"
              name="email"
              placeholder="Email"
            />
            {touched.email && errors.email && (
              <div className="f-error-message">
                {errors.email}
              </div>
            )}
            <Label htmlFor="password">
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
              <div className="f-error-message">
                {errors.password}
              </div>
            )}
            <div>
              <Button
                type="submit"
              >
                Register
              </Button>
              <LoginLinks page="register" />
            </div>
          </Form>
        )}
      />
    </React.Fragment>);
  }
}

const select = state => ({
  loggedIn: selectLoggedIn(state),
});

const actions = { startRegister: registerStartedAsync };

export default connect(select, actions)(RegistrationPage);
