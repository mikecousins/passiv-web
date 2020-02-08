import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import {
  Edit,
  SubSetting,
  DisabledBox,
  OptionsTitle,
} from '../styled/GlobalElements';

const DriftNotificationSettings = () => {
  const settings = useSelector(selectSettings);
  const canReceiveDriftNotifications = useSelector(
    selectCanReceiveDriftNotifications,
  );
  const dispatch = useDispatch();
  const [editingThreshold, setEditingThreshold] = useState(false);
  const [driftThreshold, setDriftThreshold] = useState();

  useEffect(() => {
    setDriftThreshold(settings && settings.drift_threshold);
  }, [settings]);

  const updateNotification = () => {
    let newSettings = { ...settings };
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
    let newSettings = { ...settings };

    newSettings.drift_threshold = driftThreshold;

    putData('/api/v1/settings/', newSettings)
      .then(() => {
        dispatch(loadSettings());
      })
      .catch(() => {
        dispatch(loadSettings());
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
                  value={settings.drift_threshold}
                  percentage
                  decimalPlaces={0}
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
                <InputTarget
                  value={driftThreshold}
                  onChange={e => setDriftThreshold(e.target.value)}
                  onKeyPress={e => {
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
    </React.Fragment>
  );

  // if (disabled) {
  //   return <DisabledBox>{contents}</DisabledBox>;
  // } else {
  return <div>{contents}</div>;
  // }
};

export default DriftNotificationSettings;
