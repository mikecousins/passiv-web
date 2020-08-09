import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginSucceeded } from '../actions';
import { postData, putData } from '../api';
import LoginLinks from '../components/LoginLinks';
import { Form, Input, Label } from '../styled/Form';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';

const LoginPage = () => {
  const [stateMFA, setStateMFA] = useState<any>(null);
  const dispatch = useDispatch();

  let form = (
    <Formik
      key={'login'}
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email.')
          .required('An email is required.'),
        password: Yup.string().required('A password is required.'),
      })}
      onSubmit={(values, actions) => {
        postData('/api/v1/auth/login/', {
          email: values.email,
          password: values.password,
        })
          .then(response => {
            actions.setSubmitting(false);
            if (response.data.token === null && response.data.mfa_required) {
              setStateMFA(response.data.mfa_required);
            } else {
              dispatch(loginSucceeded(response));
            }
          })
          .catch(error => {
            actions.setErrors({
              password:
                error.response.data.non_field_errors || 'Failed to login.',
            });
            actions.setSubmitting(false);
          });
      }}
    >
      {props => (
        <Form>
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="Email" autoFocus />

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
    </Formik>
  );

  if (stateMFA !== null) {
    form = (
      <Formik
        key={'2fa'}
        initialValues={{
          token: '',
        }}
        validationSchema={Yup.object().shape({
          token: Yup.string().required('Must enter your verification code.'),
        })}
        onSubmit={(values, actions) => {
          putData('/api/v1/auth/login/', {
            token: values.token,
            state: stateMFA && stateMFA.state,
          })
            .then(response => {
              actions.setSubmitting(false);
              dispatch(loginSucceeded(response));
            })
            .catch(error => {
              actions.setErrors({
                token: error.response.data.detail || 'Failed to login.',
              });
              actions.setSubmitting(false);
            });
        }}
        render={props => (
          <Form onSubmit={props.handleSubmit}>
            <Label htmlFor="token">Verification Code</Label>
            <Input name="token" placeholder="Code" autoFocus />

            <P>
              <ErrorMessage name="token" />
            </P>
            <div>
              <Button
                type="submit"
                disabled={!props.isValid || props.isSubmitting}
                data-cy="login-button"
              >
                Submit
              </Button>
              <LoginLinks page="login" />
            </div>
          </Form>
        )}
      />
    );
  }
  return (
    <React.Fragment>
      <H1>Welcome back!</H1>
      {form}
    </React.Fragment>
  );
};

export default LoginPage;
