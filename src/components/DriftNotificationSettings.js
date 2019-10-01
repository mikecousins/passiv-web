import React from 'react';
import { connect } from 'react-redux';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { selectSettings } from '../selectors';
import { selectCanReceiveDriftNotifications } from '../selectors/subscription';
import { loadSettings } from '../actions';
import { putData } from '../api';
import { ToggleButton, StateText } from '../styled/ToggleButton';
import Number from './Number';
import { InputTarget } from '../styled/Form';
import { SmallButton } from '../styled/Button';
import styled from '@emotion/styled';
import {
  Edit,
  SubSetting,
  DisabledBox,
  OptionsTitle,
} from '../styled/GlobalElements';

export const DriftBox = styled.div``;

class DriftNotificationSettings extends React.Component {
  state = {
    editingThreshold: false,
    driftThreshold: this.props.settings && this.props.settings.drift_threshold,
  };

  // TODO remove this, it's deprecated
  componentWillReceiveProps(nextProps) {
    this.setState({
      driftThreshold: nextProps.settings && nextProps.settings.drift_threshold,
    });
  }

  updateNotification = () => {
    let newSettings = Object.assign({}, this.props.settings);
    newSettings.receive_drift_notifications = !this.props.settings
      .receive_drift_notifications;

    putData('/api/v1/settings/', newSettings)
      .then(response => {
        this.props.refreshSettings();
      })
      .catch(error => {
        this.props.refreshSettings();
      });
  };

  onEnter = e => {
    if (e.key === 'Enter') {
      this.finishEditingThreshold();
    }
  };

  startEditingThreshold() {
    this.setState({ editingThreshold: true });
  }

  finishEditingThreshold() {
    let newSettings = Object.assign({}, this.props.settings);

    newSettings.drift_threshold = this.state.driftThreshold;

    putData('/api/v1/settings/', newSettings)
      .then(response => {
        this.props.refreshSettings();
      })
      .catch(error => {
        this.props.refreshSettings();
      });

    this.setState({ editingThreshold: false });
  }

  render() {
    const { settings } = this.props;

    if (!settings) {
      return null;
    }

    const disabled = !this.props.canReceiveDriftNotifications;

    let contents = (
      <React.Fragment>
        <OptionsTitle>Drift Notifications:</OptionsTitle>
        {settings.receive_drift_notifications && !disabled ? (
          <React.Fragment>
            <ToggleButton onClick={this.updateNotification} disabled={disabled}>
              <React.Fragment>
                <FontAwesomeIcon icon={faToggleOn} />
                <StateText>on</StateText>
              </React.Fragment>
            </ToggleButton>
            <SubSetting>
              <OptionsTitle>Drift Threshold:</OptionsTitle>
              {!this.state.editingThreshold ? (
                <React.Fragment>
                  <Number
                    value={settings.drift_threshold}
                    percentage
                    decimalPlaces={0}
                  />
                  <Edit
                    onClick={() => this.startEditingThreshold()}
                    disabled={disabled}
                  >
                    <FontAwesomeIcon icon={faPen} />
                    Edit
                  </Edit>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <InputTarget
                    value={this.state.driftThreshold}
                    onChange={event => {
                      this.setState({ driftThreshold: event.target.value });
                    }}
                    onKeyPress={this.onEnter}
                    disabled={!this.props.canReceiveDriftNotifications}
                  />{' '}
                  %
                  <SmallButton
                    onClick={() => this.finishEditingThreshold()}
                    disabled={disabled}
                  >
                    Done
                  </SmallButton>
                </React.Fragment>
              )}
            </SubSetting>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ToggleButton onClick={this.updateNotification} disabled={disabled}>
              <React.Fragment>
                <FontAwesomeIcon icon={faToggleOff} />
                <StateText>off</StateText>
              </React.Fragment>
            </ToggleButton>
            {disabled && (
              <DisabledBox>
                Drift notifications are an Elite feature. Subscribe to get
                notifications when your portfolio accuracy falls too low.
              </DisabledBox>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );

    // if (disabled) {
    //   return <DisabledBox>{contents}</DisabledBox>;
    // } else {
    return <DriftBox>{contents}</DriftBox>;
    // }
  }
}

const select = state => ({
  settings: selectSettings(state),
  canReceiveDriftNotifications: selectCanReceiveDriftNotifications(state),
});

const actions = {
  refreshSettings: loadSettings,
};

export default connect(
  select,
  actions,
)(DriftNotificationSettings);
