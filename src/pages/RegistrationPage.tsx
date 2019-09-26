import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSucceeded, registerFailed } from '../actions';
import { postData } from '../api';
import * as Yup from 'yup';
import { selectLoggedIn } from '../selectors';
import LoginLinks from '../components/LoginLinks';
import { Form, Input, Label } from '../styled/Form';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import Tooltip from '../components/Tooltip';

type Props = {
  location: any;
};

const RegistrationPage = ({ location }: Props) => {
  const loggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();

  let formatted_email = '';

  // TODO rewrite this using qs
  if (JSON.stringify(window.location.search) !== '""') {
    const searchString = window.location.search;
    const splitStrings = searchString.split('=');
    formatted_email = unescape(splitStrings[2]);
    window.history.replaceState({}, '', '/app/register');
  }

  if (loggedIn) {
    let nextPath = '/app/dashboard';
    if (location && location.state && location.state.nextPathname) {
      nextPath = location.state.nextPathname;
    }
    return <Redirect to={nextPath} />;
  } else {
    return (
      <React.Fragment>
        <H1>Create your Account</H1>
        <Formik
          initialValues={{
            name: '',
            email: formatted_email,
            password: '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Required'),
            email: Yup.string()
              .email('Must be a valid email')
              .required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={(values, actions) => {
            postData('/api/v1/auth/register/', {
              name: values.name,
              email: values.email,
              password: values.password,
            })
              .then(response => {
                // login
                actions.setSubmitting(false);
                dispatch(loginSucceeded(response));
              })
              .catch(error => {
                let errors: any = {};
                if (error.response.data.errors.password) {
                  errors.password = error.response.data.errors.password.join(
                    ' ',
                  );
                }
                if (error.response.data.errors.email) {
                  errors.email = error.response.data.errors.email.join(' ');
                }
                actions.setErrors(errors);
                actions.setSubmitting(false);
                dispatch(registerFailed(error));
              });
          }}
          render={({
            errors,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="name">Name</Label>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                name="name"
                placeholder="Ex: Jane Smith"
              />
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type="text"
                name="email"
                placeholder="Email"
              />
              <P>
                <ErrorMessage name="email" />
              </P>
              <Label htmlFor="password">Password</Label>
              <Tooltip label="Your password must contain at least 8 characters. Your password can&#39;t be a commonly used password. Your password can&#39;t be entirely numeric.">
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  border={errors.password && '1px solid red'}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </Tooltip>

              <P>
                <ErrorMessage name="password" />
              </P>
              <div>
                <Button type="submit" disabled={!isValid}>
                  Register
                </Button>
                <LoginLinks page="register" />
              </div>
            </Form>
          )}
        />
      </React.Fragment>
    );
  }
};

export default RegistrationPage;
