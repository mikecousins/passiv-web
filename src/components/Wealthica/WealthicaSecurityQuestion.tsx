import React, { useState } from 'react';
import { H2, P, BorderContainer } from '../../styled/GlobalElements';
import { AuthP } from '../../styled/Setup';
import { Formik } from 'formik';
import { Form, Input, Label } from '../../styled/Form';
import ShadowBox from '../../styled/ShadowBox';
import { Button } from '../../styled/Button';
import { postData } from '../../api';

import WealthicaConnectionCancelButton from './WealthicaConnectionCancelButton';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  syncing_status: any;
  handleCancel: any;
  handleSuccess: any;
  handleFail: any;
};

const WealthicaEnterSecurityCredentials = ({
  syncing_status,
  handleCancel,
  handleSuccess,
  handleFail,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  let institution_id = syncing_status._id;
  let external_brokerage_id =
    syncing_status.external_brokerage_details.external_brokerage_id;
  let external_brokerage_name =
    syncing_status.external_brokerage_details.external_brokerage_name;

  let security_question = '';

  if (syncing_status.sync_error) {
    security_question = syncing_status.sync_error.message;
  }

  let error_message = (
    <P color="red">
      {' '}
      Login to {external_brokerage_name} requires your answer to a security
      question.{' '}
    </P>
  );

  let form = (
    <Formik
      key={'login'}
      initialValues={{
        institution_id: `${institution_id}`,
        external_brokerage_id: `${external_brokerage_id}`,
        security_answer: '',
      }}
      onSubmit={(values, actions) => {
        setIsSubmitting(true);

        postData('/api/v1/wealthica/connect/authorize/complete', values)
          .then((response) => {
            values.security_answer = '';
            setIsSubmitting(false);
            handleSuccess(response.data);
          })
          .catch((error) => {
            setIsSubmitting(false);
            handleFail();
          });
      }}
      render={(props) => (
        <ShadowBox>
          <H2> {external_brokerage_name} </H2>

          {error_message}

          <BorderContainer>
            <Form onSubmit={props.handleSubmit}>
              <React.Fragment key={'security_answer'}>
                <Label>{security_question}</Label>
                <Input
                  name={'security_answer'}
                  placeholder={'Type Your Answer'}
                  autoFocus
                />
              </React.Fragment>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <p>
                    <FontAwesomeIcon icon={faSpinner} spin /> &nbsp; Verifying
                    Security Answer{' '}
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
        For your safety, Wealthica does not store the answer to your security
        question. They may ask you to answer a security question again in the
        future.
      </AuthP>

      {form}
    </React.Fragment>
  );
};

export default WealthicaEnterSecurityCredentials;
