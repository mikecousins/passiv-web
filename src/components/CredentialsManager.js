import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  selectSettings,
  selectIsDemo,
  selectPhoneNumber,
  select2FAEnabled,
  selectSMS2FAFeature,
} from '../selectors';
import { loadSettings } from '../actions';
import { postData, putData, deleteData } from '../api';

import APIAccessSettings from './APIAccessSettings';

import styled from '@emotion/styled';
import { InputNonFormik } from '../styled/Form';
import { H2, Edit, Span, A, OptionsTitle, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import ShadowBox from '../styled/ShadowBox';

const InputContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 18px;
`;

const MiniInputNonFormik = styled(InputNonFormik)`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  padding: 15px 12px;
`;

const TextContainer = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Badge2FA = styled.div`
  text-align: center;
  font-weight: 600;
  display: inline-block;
  background-color: #04a287;
  border: none;
  color: white;
  padding: 4px 6px 4px;
  margin: none;
  border-radius: 4px;
`;

const Active2FABadge = styled(Badge2FA)`
  background-color: #04a287;
`;

const Disabled2FABadge = styled(Badge2FA)`
  background-color: orange;
`;

const ErrorMessage = styled(ShadowBox)`
  background-color: orange;
`;

export class CredentialsManager extends React.Component {
  state = {
    name: this.props.settings && this.props.settings.name,
    email: this.props.settings && this.props.settings.email,
    candidatePhoneNumber: '',
    verificationCode: '',
    state2FA: null,
    phoneNumber2FA: null,
    editing2FA: false,
    confirming2FA: false,
    error2FA: null,
    loading2FA: false,
    editingName: false,
    passwordResetSent: false,
  };

  // TODO remove this, it's deprecated
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.settings && nextProps.settings.name,
      email: nextProps.settings && nextProps.settings.email,
    });
  }

  startEditingName() {
    this.setState({ editingName: true });
  }

  startEditing2FA() {
    this.setState({
      editing2FA: true,
      candidatePhoneNumber: '',
      verificationCode: '',
      error2FA: null,
      state2FA: null,
      phoneNumber2FA: null,
    });
  }

  cancelEditing2FA() {
    this.setState({
      editing2FA: false,
      confirming2FA: false,
      candidatePhoneNumber: '',
      verificationCode: '',
      error2FA: null,
      loading2FA: false,
      state2FA: null,
      phoneNumber2FA: null,
    });
  }

  verifyPhoneNumber() {
    this.setState({ loading2FA: true, error2FA: null });
    postData('/api/v1/auth/sms/', { phone: this.state.phoneNumber })
      .then(response => {
        this.setState({
          confirming2FA: true,
          loading2FA: false,
          state2FA: response.data.mfa_required.state,
          phoneNumber2FA: response.data.mfa_required.phone_number,
        });
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          error2FA: error.response && error.response.data.detail,
          loading2FA: false,
        });
      });
  }

  submitCode() {
    this.setState({ loading2FA: true, error2FA: null });
    postData('/api/v1/auth/smsVerify/', {
      token: this.state.verificationCode,
      state: this.state.state2FA,
    })
      .then(response => {
        this.props.refreshSettings();
        this.cancelEditing2FA();
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          error2FA: error.response.data.detail,
          loading2FA: false,
        });
      });
  }

  disable2FA() {
    this.setState({ loading2FA: true });
    deleteData('/api/v1/auth/sms/')
      .then(response => {
        this.setState({ loading2FA: false });
        this.props.refreshSettings();
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          error2FA: error.response.data.detail,
          loading2FA: false,
        });
      });
  }

  onEnter = e => {
    if (e.key === 'Enter') {
      this.finishEditing();
    }
  };

  finishEditing() {
    if (this.state.name !== this.props.settings.name) {
      let settings = Object.assign({}, this.props.settings);
      if (this.state.name === '') {
        settings.name = null;
      } else {
        settings.name = this.state.name;
      }

      putData('/api/v1/settings/', settings)
        .then(response => {
          this.props.refreshSettings();
        })
        .catch(error => {
          this.props.refreshSettings();
        });
    }
    this.setState({ editingName: false });
  }

  sendPasswordReset() {
    postData('/api/v1/auth/resetPassword/', { email: this.state.email })
      .then(response => {
        this.setState({ passwordResetSent: true });
      })
      .catch(error => {
        this.setState({ passwordResetSent: false });
      });
  }

  sendPasswordResetOkay() {
    this.setState({ passwordResetSent: false });
  }

  render() {
    let error2FA = null;
    if (this.state.error2FA != null) {
      error2FA = <ErrorMessage>{this.state.error2FA}</ErrorMessage>;
    }
    let sms_2fa = null;
    if (this.props.is2FAEnabled) {
      sms_2fa = (
        <React.Fragment>
          <Active2FABadge>Active</Active2FABadge>
          <Edit
            onClick={() => !this.props.isDemo && this.disable2FA()}
            disabled={this.props.isDemo}
          >
            {this.state.loading2FA ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              'Disable'
            )}
          </Edit>
          {error2FA}
          <div>
            <Span>
              Your verified phone number:{' '}
              <strong>{this.props.phoneNumber}</strong>
            </Span>
          </div>
        </React.Fragment>
      );
    } else {
      if (this.state.editing2FA === false) {
        sms_2fa = (
          <React.Fragment>
            <Disabled2FABadge>Not Enabled</Disabled2FABadge>
            <Edit
              onClick={() => !this.props.isDemo && this.startEditing2FA()}
              disabled={this.props.isDemo || this.state.loading2FA}
            >
              Enable
            </Edit>
          </React.Fragment>
        );
      } else {
        if (this.state.confirming2FA === false) {
          sms_2fa = (
            <React.Fragment>
              <P>
                Activating this option will require you to enter a 6-digit code
                each time you login. If you lose access to your phone number,
                you will be unable to login in the future.
              </P>
              <P>Just verify your phone number:</P>
              <MiniInputNonFormik
                value={this.state.phoneNumber}
                placeholder={'Your phone number'}
                onChange={event => {
                  this.setState({ phoneNumber: event.target.value });
                }}
              />
              {error2FA}
              <Edit
                onClick={() => !this.props.isDemo && this.cancelEditing2FA()}
                disabled={this.props.isDemo}
              >
                Cancel
              </Edit>
              <Button onClick={() => this.verifyPhoneNumber()}>
                {this.state.loading2FA ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  'Submit'
                )}
              </Button>
            </React.Fragment>
          );
        } else {
          sms_2fa = (
            <React.Fragment>
              <MiniInputNonFormik
                value={this.state.verificationCode}
                placeholder={'Your verification code'}
                onChange={event => {
                  this.setState({ verificationCode: event.target.value });
                }}
              />
              {error2FA}
              <Edit
                onClick={() => !this.props.isDemo && this.cancelEditing2FA()}
                disabled={this.props.isDemo}
              >
                Cancel
              </Edit>
              <Button onClick={() => this.submitCode()}>
                {this.state.loading2FA ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  'Verify'
                )}
              </Button>
            </React.Fragment>
          );
        }
      }
    }

    return (
      <div>
        <ShadowBox>
          <H2>Passiv Credentials</H2>
          <TextContainer>
            {this.state.editingName ? (
              <InputContainer>
                <MiniInputNonFormik
                  value={this.state.name === null ? '' : this.state.name}
                  onChange={event => {
                    this.setState({ name: event.target.value });
                  }}
                  onKeyPress={this.onEnter}
                  placeholder={'Your name'}
                />
                <Button onClick={() => this.finishEditing()}>Done</Button>
              </InputContainer>
            ) : (
              <InputContainer>
                <OptionsTitle>Name:</OptionsTitle>{' '}
                {this.state.name === null ? '[no name set]' : this.state.name}
                <Edit
                  onClick={() => !this.props.isDemo && this.startEditingName()}
                  disabled={this.props.isDemo}
                >
                  <FontAwesomeIcon icon={faPen} />
                  Edit
                </Edit>
              </InputContainer>
            )}
          </TextContainer>
          <TextContainer>
            <InputContainer>
              <OptionsTitle>Email:</OptionsTitle> {this.state.email}
            </InputContainer>
          </TextContainer>
          <TextContainer>
            <InputContainer>
              {' '}
              {this.state.passwordResetSent ? (
                <React.Fragment>
                  <Span>A password reset email has been sent to you.</Span>
                  <Edit onClick={() => this.sendPasswordResetOkay()}>Okay</Edit>
                </React.Fragment>
              ) : (
                <A
                  onClick={() => !this.props.isDemo && this.sendPasswordReset()}
                  disabled={this.props.isDemo}
                >
                  Change Password
                </A>
              )}
            </InputContainer>
          </TextContainer>
          {this.props.SMS2FAFeatureEnabled && (
            <TextContainer>
              <InputContainer>
                <OptionsTitle>SMS 2FA:</OptionsTitle> {sms_2fa}
              </InputContainer>
            </TextContainer>
          )}
          <TextContainer>
            <InputContainer>
              <APIAccessSettings />
            </InputContainer>
          </TextContainer>
        </ShadowBox>
      </div>
    );
  }
}

const select = state => ({
  settings: selectSettings(state),
  isDemo: selectIsDemo(state),
  SMS2FAFeatureEnabled: selectSMS2FAFeature(state),
  is2FAEnabled: select2FAEnabled(state),
  phoneNumber: selectPhoneNumber(state),
});
const actions = {
  refreshSettings: loadSettings,
};

export default connect(select, actions)(CredentialsManager);
