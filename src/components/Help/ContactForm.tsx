import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { Form, Input, Label, Textarea } from '../../styled/Form';
import { H2, P } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import { postData } from '../../api';
import { selectSettings } from '../../selectors';

const GreenBox = styled.div`
  background-color: var(--brand-light-green);
  border-radius: 4px;
  box-shadow: 1px 1px 20px #949494;
  flex: 1;
  padding: 30px 30px 30px;
  margin-bottom: 20px;
  h2 {
    margin-bottom: 25px;
    text-align: center;
  }
  form {
    margin: 0 auto;
  }
`;

const Header = styled(H2)`
  line-height: 150%;
  letter-spacing: 3.2px;
  text-transform: uppercase;
`;

const HiddenInput = styled(Input)`
  color: red;
  display: none;
`;

const ActionContainer = styled.div`
  text-align: center;
  P {
    font-weight: 500;
    font-size: 30px;
  }
  button {
    font-size: 20px;
    font-weight: 500;
    line-height: 150%;
    text-align: center;
    letter-spacing: 0.2px;
    padding: 10px 38px;
  }
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Attachments = styled.div`
  margin: 30px 0px;
  label {
    background-color: var(--brand-green);
    padding: 10px;
    width: fit-content;
    border-radius: 4rem;
    cursor: pointer;
  }
  div {
    background-color: white;
    padding: 10px;
    border: 1px solid;
    li {
      margin-bottom: 10px;
    }
  }
`;

// beta key
let recaptchaSiteKey = '6LdAQwEaAAAAADug0rrAhrHLQ9XaVWFngK_fEPkF';
if (
  process.env.REACT_APP_BASE_URL_OVERRIDE &&
  process.env.REACT_APP_BASE_URL_OVERRIDE === 'api.passiv.com'
) {
  recaptchaSiteKey = '6LdtHQ4aAAAAAAN8Tv0rSpCCrwCBpnRASfBSQjJ2';
}

const ContactForm = () => {
  const settings = useSelector(selectSettings);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  return (
    <GreenBox id="contact-form">
      <Formik
        initialValues={{
          name: '',
          url: '',
          email: '',
          message: '',
          attachments: '',
          le: settings ? settings.email : '',
          lm: '',
          lf: [],
        }}
        initialStatus={{ submitted: false }}
        validationSchema={Yup.object().shape({
          le: Yup.string().email('Must be a valid email').required('Required'),
          lm: Yup.string().required('Required'),
        })}
        onSubmit={(values, actions) => {
          // execute our recaptcha check
          if (recaptchaRef && recaptchaRef.current) {
            recaptchaRef.current.execute();
          }
          console.log(values.lf);

          // submit our values
          // postData('/api/v1/feedback/', {
          //   email: values.le,
          //   message: values.lm,
          //   attachments: values.lf,
          // })
          //   .then(() => {
          //     actions.setSubmitting(false);
          //     actions.setStatus({ submitted: true });
          //   })
          //   .catch(() => {
          //     actions.setSubmitting(false);
          //   });
        }}
        render={(props) => (
          <Form onSubmit={props.handleSubmit}>
            <legend>
              <Header>Send us a Message</Header>
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
            <HiddenInput
              id="attachments"
              name="attachments"
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
            <Error>
              <ErrorMessage name="le" />
            </Error>
            <Label htmlFor="lm">Message</Label>
            <Textarea
              component="textarea"
              id="lm"
              name="lm"
              placeholder="Tell us what's on your mind."
              error={props.touched.message && props.errors.message}
              disabled={props.status.submitted}
            />
            <Error>
              <ErrorMessage name="lm" />
            </Error>
            <Attachments>
              <Label htmlFor="file">Choose images to upload (PNG, JPG)</Label>
              <Input
                type="file"
                id="file"
                name="file"
                style={{
                  border: 'none',
                  height: '100%',
                  display: 'none',
                }}
                onChange={(event: any) => {
                  const newFiles = [
                    ...props.values.lf,
                    event.currentTarget.files[0],
                  ];

                  props.setFieldValue('lf', newFiles);
                }}
                disabled={props.status.submitted}
                multiple
                accept=".jpg, .jpeg, .png"
              />
              <div>
                {props.values.lf.length > 0 ? (
                  <>
                    <P>Files selected: </P>
                    <ul>
                      {props.values.lf.map((file: any) => {
                        return <li>{file.name}</li>;
                      })}
                    </ul>
                  </>
                ) : (
                  <P>No files selected for upload.</P>
                )}
              </div>
            </Attachments>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={recaptchaSiteKey}
              size="invisible"
            />
            <ActionContainer>
              {props.status.submitted ? (
                <div>
                  <P>Thanks, we'll be in touch soon!</P>
                  <Button onClick={props.handleReset}>Reset Form</Button>
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
                    Send Message
                  </Button>
                  {props.status.submitted && 'Submitted!'}
                </div>
              )}
            </ActionContainer>
          </Form>
        )}
      />
    </GreenBox>
  );
};

export default ContactForm;
