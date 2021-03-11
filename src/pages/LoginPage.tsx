import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { loginSucceeded } from '../actions';
import { postData, putData } from '../api';
import LoginLinks from '../components/LoginLinks';
import { Form, Input, Label } from '../styled/Form';
import { H1, P, BulletUL, Li } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import PasswordField from '../components/PasswordField';
import { selectDevice } from '../selectors/index';
import styled from '@emotion/styled';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '../components/Tooltip';

const RememberMe = styled(Field)`
  margin-bottom: 20px;
`;

const InfoIcon = styled(FontAwesomeIcon)`
  padding-top: 3px;
  padding-bottom: 3px;
`;

const LoginPage = () => {
  const [stateMFA, setStateMFA] = useState<any>(null);
  const device: any = useSelector(selectDevice);
  const dispatch = useDispatch();
  let state = '';

  const isArray = (a: any): boolean => {
    return !!a && a.constructor === Array;
  };

  if (Date.parse(device?.expiry) <= Date.now()) {
    device.token = null;
  }

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
        let body: any = {
          email: values.email,
          password: values.password,
        };

        if (device && device.token !== null) {
          body.device = device.token;
        }
        postData('/api/v1/auth/login/', body)
          .then((response) => {
            actions.setSubmitting(false);
            if (
              response.data.token === null &&
              response.data.mfa_required_multi
            ) {
              setStateMFA(response.data.mfa_required_multi);
            } else {
              dispatch(loginSucceeded(response));
            }
          })
          .catch((error) => {
            if (error.response) {
              actions.setErrors({
                password:
                  error.response.data.non_field_errors || 'Failed to login.',
              });
            } else {
              actions.setErrors({
                password: 'Failed to login.',
              });
            }

            actions.setSubmitting(false);
          });
      }}
      render={(props) => (
        <Form onSubmit={props.handleSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="Email" autoFocus />

          <P>
            <ErrorMessage name="email" />
          </P>
          <Label>Password</Label>
          <PasswordField
            error={props.touched.password && props.errors.password}
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
    />
  );

  if (stateMFA !== null) {
    form = (
      <Formik
        key={'2fa'}
        initialValues={{
          token: '',
          state: '',
          remember: [],
        }}
        validationSchema={Yup.object().shape({
          token: Yup.string().required('Must enter your verification code.'),
        })}
        onSubmit={(values, actions) => {
          let remember = false;
          if (values.remember[0] === 'true') {
            remember = true;
          }

          putData('/api/v1/auth/login/', {
            token: values.token,
            state: state,
            remember_device: remember,
          })
            .then((response) => {
              actions.setSubmitting(false);
              dispatch(loginSucceeded(response));
            })
            .catch((error) => {
              actions.setErrors({
                token: error.response.data.detail || 'Failed to login.',
              });
              actions.setSubmitting(false);
            });
        }}
        render={(props) => {
          let mfaTypes = null;
          const listMFA = [];

          if (isArray(stateMFA)) {
            stateMFA.map((s: any) => listMFA.push(s));
          } else {
            listMFA.push(stateMFA);
          }
          mfaTypes = listMFA.map((s) => {
            if (s.type === 'OTP_TOKEN') {
              state = s.state;
              return (
                <Li>Enter the 6-digit code from your authenticator app.</Li>
              );
            } else if (s.type === 'SMS_TOKEN') {
              state = s.state;
              return (
                <Li>
                  Enter the 6-digit code that was sent via SMS to{' '}
                  {s.phone_number.slice(0).replace(/.(?=....)/g, '*')}.
                </Li>
              );
            }
            return null;
          });

          return (
            <Form onSubmit={props.handleSubmit}>
              <Label htmlFor="token">Verification Code</Label>
              {listMFA.length > 1 ? (
                <P>
                  You have several MFA options enabled on your account. You can
                  either:
                </P>
              ) : (
                <P>
                  You have{' '}
                  <Tooltip label="Multi-factor authentication is a security feature that requires a user to authenticate with a one-time code in addition to the account password.">
                    <>
                      MFA <InfoIcon icon={faQuestionCircle} />
                    </>
                  </Tooltip>{' '}
                  enabled on your account:
                </P>
              )}
              <BulletUL>{mfaTypes}</BulletUL>

              <Input
                name="token"
                placeholder="Code"
                autoComplete="one-time-code"
                autoFocus
              />

              <P>
                <ErrorMessage name="token" />
              </P>
              <label>
                <RememberMe type="checkbox" name="remember" value="true" />{' '}
                Remember this device for 60 days
              </label>
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
          );
        }}
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
