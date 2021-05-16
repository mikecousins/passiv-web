import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { Redirect } from 'react-router-dom';
import { postData } from '../api';
import { selectPasswordResetToken } from '../selectors';
import { Form, Input, Label } from '../styled/Form';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import PasswordRequirements from '../components/PasswordRequirements';
import { useDispatch } from 'react-redux';
import { loginSucceeded } from '../actions';

const SetNewPasswordPage = () => {
  const token = useSelector(selectPasswordResetToken);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  if (success) {
    return <Redirect to="/setup-groups" />;
  }

  return (
    <React.Fragment>
      <H1>Choose a new Password</H1>
      {
        <Formik
          initialValues={{
            password: '',
          }}
          validate={(values) => {
            const errors: any = {};
            if (!values.password || values.password.trim() === '') {
              errors.password = 'A new password is required.';
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            postData('/api/v1/auth/setNewPassword/', {
              password: values.password,
              token,
            })
              .then((response) => {
                actions.setSubmitting(false);
                dispatch(loginSucceeded(response));
                setSuccess(true);
              })
              .catch((error) => {
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
                actions.setSubmitting(false);
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
                error={touched.password && errors.password}
              />

              <P>
                <ErrorMessage name="password" />
              </P>

              <PasswordRequirements />
              <div>
                <Button type="submit">Set New Password</Button>
              </div>
            </Form>
          )}
        />
      }
    </React.Fragment>
  );
};

export default SetNewPasswordPage;
