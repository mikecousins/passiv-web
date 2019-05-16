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

const HiddenInput = styled(Input)`
  color: red;
  display: none;
`;

export class ContactForm extends React.Component {
  state = {
    timestamp: null,
  };

  componentDidMount(nextProps) {
    this.setState({ timestamp: new Date() });
  }

  render() {
    return (
      <GreenBox>
        <Formik
          initialValues={{
            name: '',
            url: '',
            email: '',
            message: '',
            le: this.props.settings ? this.props.settings.email : '',
            lm: '',
          }}
          initialStatus={{ submitted: false }}
          validationSchema={Yup.object().shape({
            le: Yup.string()
              .email('Must be a valid email')
              .required('Required'),
            lm: Yup.string().required('Required'),
          })}
          onSubmit={(values, actions) => {
            let now = new Date();
            if (
              values.name !== '' ||
              values.url !== '' ||
              values.message !== '' ||
              values.email !== '' ||
              values.lm.includes('https://vk.cc') ||
              now - this.state.timestamp < 12000
            ) {
              // if either of these fields have data, it was submitted by a bot so we do nothing
              actions.setSubmitting(false);
            } else {
              postData('/api/v1/feedback/', {
                email: values.le,
                message: values.lm,
              })
                .then(response => {
                  actions.setSubmitting(false);
                  actions.setStatus({ submitted: true });
                })
                .catch(error => {
                  actions.setErrors({
                    errors: error.response.data.errors || 'Failed to submit.',
                  });
                  actions.setSubmitting(false);
                });
            }
          }}
          render={props => (
            <Form onSubmit={props.handleSubmit}>
              <legend>
                <H2>Send us a Message</H2>
              </legend>
              <HiddenInput
                id="name"
                name="name"
                placeholder="This field is a trap for bots, don't enter anything here."
                disabled={props.status.submitted}
              />
              <HiddenInput
                id="url"
                name="url"
                placeholder="This field is a trap for bots, don't enter anything here."
                disabled={props.status.submitted}
              />
              <HiddenInput
                id="email"
                name="email"
                placeholder="This field is a trap for bots, don't enter anything here."
                disabled={props.status.submitted}
              />
              <HiddenInput
                id="message"
                name="message"
                placeholder="This field is a trap for bots, don't enter anything here."
                disabled={props.status.submitted}
              />
              <Label htmlFor="le">Email</Label>
              <Input
                id="le"
                name="le"
                placeholder="john.smith@gmail.com"
                error={props.touched.email && props.errors.email}
                disabled={props.status.submitted}
              />
              <P>
                <ErrorMessage name="le" />
              </P>
              <Label htmlFor="lm">Message</Label>
              <Textarea
                component="textarea"
                id="lm"
                name="lm"
                placeholder="Tell us what's on your mind."
                error={props.touched.message && props.errors.message}
                disabled={props.status.submitted}
              />
              <P>
                <ErrorMessage name="lm" />
              </P>
              {props.status.submitted ? (
                <div>
                  <Button onClick={props.handleReset}>Reset</Button>
                  {props.status.submitted && "Thanks, we'll be in touch soon!"}
                </div>
              ) : (
                <div>
                  <Button
                    type="submit"
                    disabled={
                      !props.isValid ||
                      props.isSubmitting ||
                      props.status.submitted
                    }
                  >
                    Submit Message
                  </Button>
                  {props.status.submitted && 'Submitted!'}
                </div>
              )}
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
