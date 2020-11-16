import React, { useState } from 'react';
import { H2, P, BorderContainer } from '../../styled/GlobalElements';
import { AuthP } from '../../styled/Setup';
import { Formik } from 'formik';
import { Form, Input, Label } from '../../styled/Form';
import ShadowBox from '../../styled/ShadowBox';
import { Button } from '../../styled/Button';
import { postData } from '../../api';

import WealthicaConnectionCancelButton from './WealthicaConnectionCancelButton';
import WealthicaPasswordField from './WealthicaPasswordField';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  institutionData: any;
  onLoginSuccess: any;
  handleCancel: any;
  isUpdate: boolean;
  authorizationId: string | null;
};

const WealthicaEnterLoginCredentials = ({
  institutionData,
  onLoginSuccess,
  handleCancel,
  isUpdate,
  authorizationId,
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
      authorization_id: authorizationId,
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

  const handleSubmitPost = (isUpdate: boolean, submitted_values: any) => {
    if (isUpdate) {
      postData('/api/v1/wealthica/connect/authorize/update', submitted_values)
        .then((response) => {
          onLoginSuccess(response.data);
        })
        .catch((error) => {
          setIsSubmitting(false);
          setFailedVerification(true);
        });
    } else {
      postData('/api/v1/wealthica/connect/authorize', submitted_values)
        .then((response) => {
          onLoginSuccess(response.data);
        })
        .catch((error) => {
          setIsSubmitting(false);
          setFailedVerification(true);
        });
    }
  };

  let form = (
    <Formik
      key={'login'}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        setIsSubmitting(true);
        let submitted_values = getValuesToSubmit(values);
        handleSubmitPost(isUpdate, submitted_values);
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
                    <React.Fragment key={required_credential_title}>
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
                    <React.Fragment key={required_credential_title}>
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
                label={'Cancel'}
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
