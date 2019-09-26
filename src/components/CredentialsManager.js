import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { selectSettings, selectIsDemo } from '../selectors';
import { loadSettings } from '../actions';
import { postData, putData } from '../api';

import CashNotifcationSettings from './CashNotificationSettings';
import DriftNotifcationSettings from './DriftNotificationSettings';
import PreferredCurrencySetting from './PortfolioGroupSettings/PreferredCurrencySetting';

import styled from '@emotion/styled';
import { InputNonFormik } from '../styled/Form';
import { H2, Edit, Span, A } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import ShadowBox from '../styled/ShadowBox';

const InputContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 18px;
`;

const TextContainer = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

export class CredentialsManager extends React.Component {
  state = {
    name: this.props.settings && this.props.settings.name,
    email: this.props.settings && this.props.settings.email,
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
    return (
      <div>
        <ShadowBox>
          <H2>Passiv Credentials</H2>
          <TextContainer>
            {this.state.editingName ? (
              <InputContainer>
                <InputNonFormik
                  value={this.state.name === null ? '' : this.state.name}
                  onChange={event => {
                    this.setState({ name: event.target.value });
                  }}
                  onKeyPress={this.onEnter}
                />
                <Button onClick={() => this.finishEditing()}>Done</Button>
              </InputContainer>
            ) : (
              <InputContainer>
                <strong>Name:</strong>{' '}
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
              <strong>Email:</strong> {this.state.email}
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
        </ShadowBox>
        <ShadowBox>
          <H2>Notifications</H2>
          <CashNotifcationSettings />
          <DriftNotifcationSettings />
          <PreferredCurrencySetting
            settings={this.props.settings}
            update={event => {
              let settings = Object.assign({}, this.props.settings);
              settings.preferred_currency = event.target.value;
              putData('/api/v1/settings/', settings)
                .then(response => {
                  this.props.refreshSettings();
                })
                .catch(error => {
                  this.props.refreshSettings();
                });
            }}
          />
        </ShadowBox>
      </div>
    );
  }
}

const select = state => ({
  settings: selectSettings(state),
  isDemo: selectIsDemo(state),
});
const actions = {
  refreshSettings: loadSettings,
};

export default connect(
  select,
  actions,
)(CredentialsManager);
