import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { Form, Input, Label, Textarea } from '../../styled/Form';
import { H2, P } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import { postData } from '../../api';
import { selectSettings } from '../../selectors';

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
            email: this.props.settings ? this.props.settings.email : '',
            message: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .required('Required'),
            message: Yup.string().required('Required'),
          })}
          onSubmit={(values, actions) => {
            postData('/api/v1/feedback/', {
              email: values.email,
              message: values.message,
            })
              .then(response => {
                actions.setSubmitting(false);
              })
              .catch(error => {
                actions.setErrors({
                  errors: error.response.data.errors || 'Failed to login.',
                });
                actions.setSubmitting(false);
              });
          }}
          render={props => (
            <Form onSubmit={props.handleSubmit}>
              <legend>
                <H2>Send us a Message</H2>
              </legend>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="john.smith@gmail.com"
                error={props.touched.email && props.errors.email}
              />
              <P>
                <ErrorMessage name="email" />
              </P>
              <Label htmlFor="message">Message</Label>
              <Textarea
                component="textarea"
                id="message"
                name="message"
                placeholder="Tell us what's on your mind."
                error={props.touched.message && props.errors.message}
              />
              <P>
                <ErrorMessage name="message" />
              </P>
              <div>
                <Button
                  type="submit"
                  disabled={!props.isValid || props.isSubmitting}
                >
                  Submit Message
                </Button>
              </div>
            </Form>
          )}
        />
      </GreenBox>
    );
  }
}

const select = state => ({
  settings: selectSettings(state),
});
const actions = {};

export default connect(
  select,
  actions,
)(ContactForm);
