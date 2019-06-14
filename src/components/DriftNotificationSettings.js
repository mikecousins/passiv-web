import React from 'react';
import { connect } from 'react-redux';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { selectSettings } from '../selectors';
import { loadSettings } from '../actions';
import { putData } from '../api';
import styled from '@emotion/styled';
import { ToggleButton, StateText } from '../styled/ToggleButton';
import Number from './Number';
import { InputTarget } from '../styled/Form';
import { SmallButton } from '../styled/Button';

import { Edit, SubSetting } from '../styled/GlobalElements';

const DividingLine = styled.div`
  border-top: 1px solid #eee;
  margin-top: 10px;
  padding-top: 10px;
  &:first-of-type {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

class DriftNotificationSettings extends React.Component {
  state = {
    editingThreshold: false,
    driftThreshold: this.props.settings && this.props.settings.drift_threshold,
  };

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

    return (
      <React.Fragment>
        <strong>Receive Drift Notifications:</strong>{' '}
        {settings.receive_drift_notifications ? (
          <React.Fragment>
            <ToggleButton onClick={this.updateNotification}>
              <React.Fragment>
                <FontAwesomeIcon icon={faToggleOn} />
                <StateText>on</StateText>
              </React.Fragment>
            </ToggleButton>
            <SubSetting>
              <p>
                Drift Threshold: &nbsp;
                {!this.state.editingThreshold ? (
                  <React.Fragment>
                    <Number
                      value={settings.drift_threshold}
                      percentage
                      decimalPlaces={0}
                    />
                    <Edit onClick={() => this.startEditingThreshold()}>
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
                    />{' '}
                    %
                    <SmallButton onClick={() => this.finishEditingThreshold()}>
                      Done
                    </SmallButton>
                  </React.Fragment>
                )}
              </p>
            </SubSetting>
          </React.Fragment>
        ) : (
          <ToggleButton onClick={this.updateNotification}>
            <React.Fragment>
              <FontAwesomeIcon icon={faToggleOff} />
              <StateText>off</StateText>
            </React.Fragment>
          </ToggleButton>
        )}
      </React.Fragment>
    );
  }
}

const select = state => ({
  settings: selectSettings(state),
});

const actions = {
  refreshSettings: loadSettings,
};

export default connect(
  select,
  actions,
)(DriftNotificationSettings);
