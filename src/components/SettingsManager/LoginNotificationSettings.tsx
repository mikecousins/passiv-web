import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectSettings } from '../../selectors';
import { loadSettings } from '../../actions';
import { putData } from '../../api';
import { ToggleButton, StateText } from '../../styled/ToggleButton';
import { OptionsTitle, DisabledBox } from '../../styled/GlobalElements';
import { Settings } from '../../types/settings';

const LoginNotificationSettings = () => {
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();
  const [cashThreshold, setCashThreshold] = useState('');

  useEffect(() => {
    if (settings) {
      setCashThreshold(
        settings && parseFloat(settings.cash_email_threshold).toString(),
      );
    }
  }, [settings]);

  const updateNotification = () => {
    if (!settings) {
      return;
    }
    let newSettings: Settings = { ...settings };
    newSettings.receive_cash_notifications = !settings.receive_cash_notifications;
    putData('/api/v1/settings/', newSettings)
      .then(() => {
        dispatch(loadSettings());
      })
      .catch(() => {
        dispatch(loadSettings());
      });
  };

  const finishEditingThreshold = () => {
    if (!settings) {
      return;
    }

    let newSettings: Settings = { ...settings };

    newSettings.cash_email_threshold = cashThreshold;

    putData('/api/v1/settings/', newSettings)
      .then(() => {
        dispatch(loadSettings());
      })
      .catch(() => {
        dispatch(loadSettings());
      });
  };

  const updateSummaryThresholdNotification = () => {
    if (!settings) {
      return;
    }
    let newSettings: Settings = { ...settings };
    newSettings.apply_cash_email_threshold_to_summary_email = !settings.apply_cash_email_threshold_to_summary_email;
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

  let contents = (
    <React.Fragment>
      <OptionsTitle>Login Notifications:</OptionsTitle>
      {settings.receive_cash_notifications ? (
        <React.Fragment>
          <ToggleButton onClick={updateNotification}>
            <React.Fragment>
              <FontAwesomeIcon icon={faToggleOn} />
              <StateText>on</StateText>
            </React.Fragment>
          </ToggleButton>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ToggleButton onClick={updateNotification}>
            <FontAwesomeIcon icon={faToggleOff} />
            <StateText>off</StateText>
          </ToggleButton>
        </React.Fragment>
      )}
      <DisabledBox>
        Receive an email notification whenever you log into your Passiv account.
      </DisabledBox>
    </React.Fragment>
  );

  return contents;
};

export default LoginNotificationSettings;
