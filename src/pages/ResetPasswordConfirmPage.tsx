import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { postData } from '../api';
import { selectPasswordResetToken } from '../selectors';
import { Link } from 'react-router-dom';
import { Form, Input, Label } from '../styled/Form';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';

const ResetPasswordConfirmPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const token = useSelector(selectPasswordResetToken);
  return (
    <React.Fragment>
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
              errors.password = 'You must set a new password.';
            }
            return errors;
          }}
          onSubmit={values => {
            postData('/api/v1/auth/resetPasswordConfirm/', {
              password: values.password,
              token,
            })
              .then(() => {
                setSubmitted(true);
              })
              .catch(error => {
                console.log('error', error.response.data);
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
              />
              {touched.password && errors.password && (
                <div className="text-red">{errors.password}</div>
              )}
              <div>
                <Button type="submit">Reset</Button>
              </div>
            </Form>
          )}
        />
      )}
    </React.Fragment>
  );
};

export default ResetPasswordConfirmPage;
