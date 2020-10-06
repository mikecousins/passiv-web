import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { selectSettings } from '../../selectors';
import { selectCanReceiveCashNotifications } from '../../selectors/subscription';
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
} from '../../styled/GlobalElements';
import { Settings } from '../../types/settings';

const DriftNotificationSettings = () => {
  const settings = useSelector(selectSettings);
  const canReceiveCashNotifications = useSelector(
    selectCanReceiveCashNotifications,
  );
  const dispatch = useDispatch();
  const [editingThreshold, setEditingThreshold] = useState(false);
  const [cashThreshold, setCashThreshold] = useState();

  useEffect(() => {
    setCashThreshold(settings && parseFloat(settings.cash_email_threshold));
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

    setEditingThreshold(false);
  };

  if (!settings) {
    return null;
  }

  const disabled = !canReceiveCashNotifications;

  let contents = (
    <React.Fragment>
      <OptionsTitle>Cash Notifications:</OptionsTitle>
      {settings.receive_cash_notifications && !disabled ? (
        <React.Fragment>
          <ToggleButton onClick={updateNotification} disabled={disabled}>
            <React.Fragment>
              <FontAwesomeIcon icon={faToggleOn} />
              <StateText>on</StateText>
            </React.Fragment>
          </ToggleButton>
          <SubSetting>
            <OptionsTitle>Cash Threshold:</OptionsTitle>
            {!editingThreshold ? (
              <React.Fragment>
                <Number
                  value={parseFloat(settings.cash_email_threshold)}
                  currency
                  decimalPlaces={2}
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
                  value={cashThreshold}
                  onChange={e => setCashThreshold(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      finishEditingThreshold();
                    }
                  }}
                  disabled={!canReceiveCashNotifications}
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
        </React.Fragment>
      )}
      {!disabled && (
        <DisabledBox>
          Receive an email notification when cash is waiting for you in your
          brokerage account.
        </DisabledBox>
      )}
    </React.Fragment>
  );

  return contents;
};

export default DriftNotificationSettings;
