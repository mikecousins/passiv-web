import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { selectSettings } from '../../selectors';
import { selectCanReceiveDriftNotifications } from '../../selectors/subscription';
import { loadSettings } from '../../actions';
import { putData } from '../../api';
import { ToggleButton, StateText } from '../../styled/ToggleButton';
import Number from './../Number';
import { NumericTextInput } from '../../styled/Form';
import { SmallButton } from '../../styled/Button';
import {
  Edit,
  SubSetting,
  DisabledBox,
  OptionsTitle,
  ErrorBox,
} from '../../styled/GlobalElements';
import { Settings } from '../../types/settings';

const DriftNotificationSettings = () => {
  const settings = useSelector(selectSettings);
  const canReceiveDriftNotifications = useSelector(
    selectCanReceiveDriftNotifications,
  );
  const dispatch = useDispatch();
  const [editingThreshold, setEditingThreshold] = useState(false);
  const [driftThreshold, setDriftThreshold] = useState('');
  const [outOfLimitErrorMessage, setOutOfLimitErrorMessage] = useState('');

  const calcDecimalPlaces = (number: number) => {
    let decimalPlaces = 4;
    const asString = String(number);
    if (asString.indexOf('.') >= 0) {
      const pieces = asString.split('.');
      if (pieces.length === 2) {
        decimalPlaces = pieces[1].length;
      }
    }
    return decimalPlaces;
  };

  useEffect(() => {
    if (settings) {
      setDriftThreshold(settings.drift_threshold);
    }
  }, [settings]);

  useEffect(() => {
    setTimeout(() => setOutOfLimitErrorMessage(''), 5000);
  }, [outOfLimitErrorMessage]);

  const updateNotification = () => {
    if (!settings) {
      return;
    }

    let newSettings: Settings = { ...settings };
    newSettings.receive_drift_notifications = !settings.receive_drift_notifications;

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

    newSettings.drift_threshold = driftThreshold;

    putData('/api/v1/settings/', newSettings)
      .then(() => {
        dispatch(loadSettings());
      })
      .catch(() => {
        dispatch(loadSettings());
        setOutOfLimitErrorMessage(
          `${driftThreshold}% is out of limit. Please choose a threshold between 0% and 100%.`,
        );
      });

    setEditingThreshold(false);
  };

  if (!settings) {
    return null;
  }

  const disabled = !canReceiveDriftNotifications;

  let contents = (
    <React.Fragment>
      <OptionsTitle>Drift Notifications:</OptionsTitle>
      {settings.receive_drift_notifications && !disabled ? (
        <React.Fragment>
          <ToggleButton onClick={updateNotification} disabled={disabled}>
            <React.Fragment>
              <FontAwesomeIcon icon={faToggleOn} />
              <StateText>on</StateText>
            </React.Fragment>
          </ToggleButton>
          <SubSetting>
            <OptionsTitle>Drift Threshold:</OptionsTitle>
            {!editingThreshold ? (
              <React.Fragment>
                <Number
                  value={parseFloat(settings.drift_threshold)}
                  percentage
                  decimalPlaces={calcDecimalPlaces(parseFloat(driftThreshold))}
                />
                <Edit
                  onClick={() => setEditingThreshold(true)}
                  disabled={disabled}
                >
                  <FontAwesomeIcon icon={faPen} />
                  Edit
                </Edit>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NumericTextInput
                  value={driftThreshold}
                  onChange={(e) => setDriftThreshold(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      finishEditingThreshold();
                    }
                  }}
                  disabled={!canReceiveDriftNotifications}
                />{' '}
                %
                <SmallButton
                  onClick={finishEditingThreshold}
                  disabled={disabled}
                >
                  Done
                </SmallButton>
              </React.Fragment>
            )}
          </SubSetting>
          <ErrorBox>{outOfLimitErrorMessage}</ErrorBox>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ToggleButton onClick={updateNotification} disabled={disabled}>
            <FontAwesomeIcon icon={faToggleOff} />
            <StateText>off</StateText>
          </ToggleButton>
          {disabled && (
            <DisabledBox>
              Drift notifications are an Elite feature. Subscribe to get
              notifications when your portfolio accuracy falls too low.
            </DisabledBox>
          )}
        </React.Fragment>
      )}
      {!disabled && (
        <DisabledBox>
          Receive an email notification when your portfolio accuracy falls too
          low.
        </DisabledBox>
      )}
    </React.Fragment>
  );

  return contents;
};

export default DriftNotificationSettings;
