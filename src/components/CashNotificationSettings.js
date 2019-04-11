import React from 'react';
import { connect } from 'react-redux';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { H3 } from '../styled/GlobalElements';
import { selectSettings } from '../selectors';
import { loadSettings } from '../actions';
import { putData } from '../api';
import styled from '@emotion/styled';

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

class CashNotificationSettings extends React.Component {
  updateNotification = () => {
    let newSettings = Object.assign({}, this.props.settings);
    newSettings.receive_cash_notifications = !this.props.settings
      .receive_cash_notifications;
    putData('/api/v1/settings/', newSettings)
      .then(response => {
        this.props.refreshSettings();
      })
      .catch(error => {
        this.props.refreshSettings();
      });
  };

  render() {
    const { settings } = this.props;

    if (!settings) {
      return null;
    }

    return (
      <React.Fragment>
        <DividingLine>
          <H3>
            {' '}
            Receive Cash Notifications:
            <button onClick={this.updateNotification}>
              {settings.receive_cash_notifications ? (
                <FontAwesomeIcon icon={faToggleOn} />
              ) : (
                <FontAwesomeIcon icon={faToggleOff} />
              )}
            </button>
          </H3>
        </DividingLine>
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
)(CashNotificationSettings);
