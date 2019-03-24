import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import { Form, Input, Label, InputNonFormik, Textarea } from '../../styled/Form';
import { H2, P } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import ShadowBox from '../../styled/ShadowBox';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const GreenBox = styled.div`
  background-color: var(--brand-green);
  border-radius: 4px;
  box-shadow: 1px 1px 20px #949494;
  padding: 30px 30px 30px;
  margin-bottom: 20px;
  max-width: 600px;
  h2 {
    margin-bottom: 25px;
  }
  form {
    max-width: 100%;
  }
`;

export class ContactForm extends React.Component {

  render() {
    return (
      <GreenBox>
          <Formik
            initialValues={{
              email: '',
              message: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .required('Required'),
              message: Yup.string()
                .required('Required')
            })}
            onSubmit={(values, actions) => {

            }}
            render={(props) => (
              <Form onSubmit={props.handleSubmit}>
                <legend>
                  <H2>Send us a Message</H2>
                </legend>
                <Label htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="email@example.com"
                />
                <P>
                  <ErrorMessage name="email" />
                </P>
                <Label htmlFor="message">
                  Message
                </Label>
                <Textarea
                id="message"
                name="message"
                placeholder="Start a message ..."
                />
                <div>
                  <Button
                    type="submit"
                  >
                    Submit Message
                  </Button>
                </div>
              </Form>
            )}
          />
      </GreenBox>
    )
  }
}

export default ContactForm;
