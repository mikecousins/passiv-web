import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectSettings } from '../../selectors';
import { loadSettings } from '../../actions';
import { putData } from '../../api';
import { ToggleButton, StateText } from '../../styled/ToggleButton';
import { OptionsTitle, DisabledBox } from '../../styled/GlobalElements';

const NewSymbolNotificationSettings = () => {
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  const updateNotification = () => {
    if (!settings) {
      return;
    }

    let newSettings = { ...settings };
    newSettings.receive_new_symbol_notifications = !settings.receive_new_symbol_notifications;
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
    <React.Fragment>
      <OptionsTitle>Detect New Securities:</OptionsTitle>
      <ToggleButton onClick={updateNotification}>
        {settings.receive_new_symbol_notifications ? (
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
      <DisabledBox>
        Passiv will detect when new securities are added to your account outside
        of Passiv and send an email prompt asking how you want to include it in
        your portfolio.
      </DisabledBox>
    </React.Fragment>
  );
};

export default NewSymbolNotificationSettings;
