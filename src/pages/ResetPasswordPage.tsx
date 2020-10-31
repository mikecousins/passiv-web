import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { postData } from '../api';
import { selectLoggedIn } from '../selectors';
import LoginLinks from '../components/LoginLinks';
import { Form, Input, Label } from '../styled/Form';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import * as Yup from 'yup';

type Props = {
  location: any;
};

const ResetPasswordPage = ({ location }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const loggedIn = useSelector(selectLoggedIn);

  if (loggedIn) {
    let nextPath = '/app/dashboard';
    if (location && location.state && location.state.nextPathname) {
      nextPath = location.state.nextPathname;
    }
    return <Redirect to={nextPath} />;
  } else {
    return (
      <React.Fragment>
        <H1>Reset your Password</H1>
        {submitted ? (
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
                let errors: any = {};
                if (!values.email) {
                  errors.email = 'An email is required.';
                }
                return errors;
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email.')
                  .required('An email is required.'),
              })}
              onSubmit={(values, actions) => {
                postData('/api/v1/auth/resetPassword/', values)
                  .then(() => {
                    setSubmitted(true);
                  })
                  .catch(error => {
                    let errors: any = {};
                    if (
                      error.response.data &&
                      error.response.data.errors &&
                      error.response.data.errors.email
                    ) {
                      errors.email = error.response.data.errors.email.join(' ');
                    } else {
                      errors.email =
                        "Oops, we've hit an unexpected error. Please try again or contact support for assistance.";
                    }
                    actions.setErrors(errors);
                  });
              }}
            >
              {({
                touched,
                errors,
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
              }) => (
                <Form>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    type="text"
                    name="email"
                    placeholder="example@example.com"
                    error={touched.email && errors.email}
                  />
                  <P>
                    <ErrorMessage name="email" />
                  </P>
                  <div>
                    <Button type="submit" disabled={!isValid}>
                      Reset
                    </Button>
                    <LoginLinks page="reset" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </React.Fragment>
    );
  }
};

export default ResetPasswordPage;
