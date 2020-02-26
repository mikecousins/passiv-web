import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { selectSettings } from '../selectors';
import { loadSettings } from '../actions';
import { putData } from '../api';
import styled from '@emotion/styled';
import { ToggleButton, StateText } from '../styled/ToggleButton';
import { OptionsTitle } from '../styled/GlobalElements';

const DividingLine = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
`;

const CashNotificationSettings = () => {
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  const updateNotification = () => {
    if (!settings) {
      return;
    }

    let newSettings = { ...settings };
    newSettings.receive_cash_notifications = !settings.receive_cash_notifications;
    putData('/api/v1/settings/', newSettings)
      .then(() => {
        dispatch(loadSettings());
      })
      .catch(() => {
        dispatch(loadSettings());
      });
  };

  if (!settings) {
    return null;
  }

  return (
    <DividingLine>
      <OptionsTitle>Cash Notifications:</OptionsTitle>
      <ToggleButton onClick={updateNotification}>
        {settings.receive_cash_notifications ? (
          <React.Fragment>
            <FontAwesomeIcon icon={faToggleOn} />
            <StateText>on</StateText>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FontAwesomeIcon icon={faToggleOff} />
            <StateText>off</StateText>
          </React.Fragment>
        )}
      </ToggleButton>
    </DividingLine>
  );
};

export default CashNotificationSettings;
