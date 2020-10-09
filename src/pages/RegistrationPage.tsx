import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSucceeded, registerFailed } from '../actions';
import { postData } from '../api';
import * as Yup from 'yup';
import { selectLoggedIn, selectReferralCode } from '../selectors';
import { selectQueryTokens } from '../selectors/router';
import LoginLinks from '../components/LoginLinks';
import { Form, Input, Label } from '../styled/Form';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import PasswordRequirements from '../components/PasswordRequirements';
import PasswordField from '../components/PasswordField';
import styled from '@emotion/styled';

type Props = {
  location: any;
};

const HiddenField = styled.div`
  display: none;
`;

const RegistrationPage = ({ location }: Props) => {
  const loggedIn = useSelector(selectLoggedIn);
  const referralCode = useSelector(selectReferralCode);
  const queryParams = useSelector(selectQueryTokens);
  const dispatch = useDispatch();

  let formatted_email = '';

  if (queryParams.email !== undefined) {
    formatted_email = queryParams.email;
    window.history.replaceState({}, '', '/app/register/');
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
            referralCode: referralCode,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('A name or nickname is required.'),
            email: Yup.string()
              .email('Must be a valid email.')
              .required('An email is required.'),
            password: Yup.string().required('A password is required.'),
          })}
          onSubmit={(values, actions) => {
            postData('/api/v1/auth/register/', {
              name: values.name,
              email: values.email,
              password: values.password,
              referralCode: values.referralCode,
            })
              .then((response) => {
                // login
                actions.setSubmitting(false);
                dispatch(loginSucceeded(response));
              })
              .catch((error) => {
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
            touched,
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
                error={touched.name && errors.name}
              />
              <P>
                <ErrorMessage name="name" />
              </P>
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type="text"
                name="email"
                placeholder="Email"
                error={touched.email && errors.email}
              />
              <P>
                <ErrorMessage name="email" />
              </P>
              <Label htmlFor="password">Password</Label>
              <PasswordField error={touched.password && errors.password} />

              <P>
                <ErrorMessage name="password" />
              </P>

              <PasswordRequirements />

              {referralCode && (
                <HiddenField>
                  <Label htmlFor="referrer">Referral Code</Label>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.referralCode}
                    border={errors.referralCode && '1px solid red'}
                    type="text"
                    name="referralCode"
                    placeholder="Referral Code"
                  />
                </HiddenField>
              )}

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
