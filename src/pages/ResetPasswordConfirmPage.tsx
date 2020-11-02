import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { postData } from '../api';
import { selectPasswordResetToken } from '../selectors';
import { Form, Label } from '../styled/Form';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import PasswordRequirements from '../components/PasswordRequirements';
import PasswordField from '../components/PasswordField';

const ResetPasswordConfirmPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const token = useSelector(selectPasswordResetToken);
  return (
    <>
      <H1>Choose a new Password</H1>
      {submitted ? (
        <P>
          Your password has been reset. <Link to="/app/login">Login!</Link>
        </P>
      ) : (
        <Formik
          initialValues={{
            password: '',
          }}
          validate={values => {
            const errors: any = {};
            if (!values.password || values.password.trim() === '') {
              errors.password = 'A new password is required.';
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            postData('/api/v1/auth/resetPasswordConfirm/', {
              password: values.password,
              token,
            })
              .then(() => {
                setSubmitted(true);
              })
              .catch(error => {
                let errors: any = {};
                if (
                  error.response.data &&
                  error.response.data.errors &&
                  error.response.data.errors.password
                ) {
                  errors.password = error.response.data.errors.password.join(
                    ' ',
                  );
                } else if (
                  error.response.data &&
                  error.response.data.errors &&
                  error.response.data.errors.token
                ) {
                  errors.password = error.response.data.errors.token;
                } else {
                  errors.password =
                    "Oops, we've hit an unexpected error. Please try again or contact support for assistance.";
                }
                actions.setErrors(errors);
              });
          }}
        >
          {({ touched, errors, values, handleChange, handleBlur }) => (
            <Form>
              <Label htmlFor="password">Password</Label>
              <PasswordField error={touched.password && errors.password} />

              <P>
                <ErrorMessage name="password" />
              </P>

              <PasswordRequirements />
              <div>
                <Button type="submit">Reset</Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ResetPasswordConfirmPage;
