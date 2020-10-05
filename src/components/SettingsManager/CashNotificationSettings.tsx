import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { selectSettings } from '../../selectors';
import { loadSettings } from '../../actions';
import { putData } from '../../api';
import { ToggleButton, StateText } from '../../styled/ToggleButton';
import {
  Edit,
  SubSetting,
  OptionsTitle,
  DisabledBox,
} from '../../styled/GlobalElements';
import { NumericTextInput } from '../../styled/Form';
import { SmallButton } from '../../styled/Button';
import Number from './../Number';
import { Settings } from '../../types/settings';

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

const CashNotificationSettings = () => {
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();
  const [editingThreshold, setEditingThreshold] = useState(false);
  const [cashThreshold, setCashThreshold] = useState();

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

  const disabled = !settings.receive_cash_notifications;

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

  return (
    <React.Fragment>
      {console.log(settings)}
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
        {settings.receive_cash_notifications ? (
          <React.Fragment>
            <SubSetting>
              <OptionsTitle>Cash Notification Threshold:</OptionsTitle>
              {!editingThreshold ? (
                <React.Fragment>
                  <Number
                    value={parseFloat(settings.cash_email_threshold)}
                    percentage
                    decimalPlaces={calcDecimalPlaces(cashThreshold)}
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
                    disabled={disabled}
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
          <React.Fragment></React.Fragment>
        )}
      </ToggleButton>
      <DisabledBox>
        Receive an email notification when new cash or dividends arrive in your
        account.
      </DisabledBox>
    </React.Fragment>
  );
};

export default CashNotificationSettings;
