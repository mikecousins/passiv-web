import React, { useState } from 'react';
import { H1, H2, P, BorderContainer } from '../../styled/GlobalElements';
import {
  aDarkStyle,
  Container2Column,
  Container1Column,
  GrowBox,
  LogoContainer,
  LinkContainer,
  AuthBox,
  OpenBox,
  AuthLink,
  AuthP,
  H1DarkStyle,
  H2DarkStyle,
  VerticalPadding,
} from '../../styled/Setup';
import PasswordField from '../../components/PasswordField';
import { Formik, ErrorMessage } from 'formik';
import { Form, Input, Label } from '../../styled/Form';
import ShadowBox from '../../styled/ShadowBox';
import { Button } from '../../styled/Button';
import { Link } from 'react-router-dom';
import { postData } from '../../api';
import * as Yup from 'yup';

import WealthicaConnectionCancelButton from './WealthicaConnectionCancelButton';
import WealthicaPasswordField from './WealthicaPasswordField';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  institutionData: any;
  onLoginSuccess: any;
  handleCancel: any;
};

const WealthicaEnterLoginCredentials = ({
  institutionData,
  onLoginSuccess,
  handleCancel,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [failedVerification, setFailedVerification] = useState(false);

  let brokerage_name =
    institutionData.external_brokerage_details.external_brokerage_name;
  let brokerage_id =
    institutionData.external_brokerage_details.external_brokerage_id;
  let required_credentials = institutionData.required_credentials;

  let initialValues: { [input_name: string]: string } = {};
  required_credentials.forEach(
    (required_credential: string) => (initialValues[required_credential] = ''),
  );

  let getValuesToSubmit = (values: any) => {
    let required_credential_dict: { [input_name: string]: string } = {};
    required_credentials.forEach(
      (required_credential: string) =>
        (required_credential_dict[required_credential] =
          values[required_credential]),
    );

    let valuesToSubmit = {
      required_credentials: required_credential_dict,
      external_brokerage_id: brokerage_id,
    };

    return valuesToSubmit;
  };

  let titleWord = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  let error_message: any = null;
  if (failedVerification) {
    error_message = (
      <P color="red"> Unable to log in with provided credentials. </P>
    );
  }

  let form = (
    <Formik
      key={'login'}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        setIsSubmitting(true);
        let submitted_values = getValuesToSubmit(values);
        postData('/api/v1/wealthica/connect/authorize', submitted_values)
          .then((response) => {
            onLoginSuccess(response);
          })
          .catch((error) => {
            setIsSubmitting(false);
            setFailedVerification(true);
          });
      }}
      render={(props) => (
        <ShadowBox>
          <H2> {brokerage_name} </H2>
          <P>
            {' '}
            Please enter the credentials you use to login to {brokerage_name}
          </P>
          <BorderContainer>
            <Form onSubmit={props.handleSubmit}>
              {required_credentials.map((required_credential: string) => {
                let form_labels_and_fields = null;

                let required_credential_title = titleWord(required_credential);
                let required_credential_lower = required_credential.toLowerCase();

                if (required_credential_lower !== 'password') {
                  form_labels_and_fields = (
                    <React.Fragment>
                      <Label>{required_credential_title}</Label>
                      <Input
                        name={required_credential}
                        placeholder={required_credential_title}
                        autoFocus
                      />
                    </React.Fragment>
                  );
                } else {
                  form_labels_and_fields = (
                    <React.Fragment>
                      <Label>Password</Label>
                      <WealthicaPasswordField />
                    </React.Fragment>
                  );
                }
                return form_labels_and_fields;
              })}
              {error_message}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <p>
                    <FontAwesomeIcon icon={faSpinner} spin /> &nbsp; Verifying
                    Credentials{' '}
                  </p>
                ) : (
                  <p>Submit</p>
                )}
              </Button>
              <WealthicaConnectionCancelButton
                disabled={isSubmitting}
                handleCancel={handleCancel}
              />
            </Form>
          </BorderContainer>
        </ShadowBox>
      )}
    />
  );

  return (
    <React.Fragment>
      <AuthP>
        Your log in credentials will be transmitted to Wealthica and stored in
        their database according to their privacy policy. Passiv does not store
        your credentials!
      </AuthP>

      {form}
    </React.Fragment>
  );
};

export default WealthicaEnterLoginCredentials;

// <Label htmlFor="email">Email</Label>
// <Input name="email" placeholder="Email" autoFocus />
// <Button
//   type="submit"
// >
//   Sign In
// </Button>
