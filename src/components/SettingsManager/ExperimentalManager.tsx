import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { selectSettings } from '../../selectors';
import {
  faToggleOn,
  faToggleOff,
  faClipboard,
  faClipboardCheck,
  faRedoAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../styled/Button';
import ShadowBox from '../../styled/ShadowBox';
import { H2, P, OptionsTitle } from '../../styled/GlobalElements';
import { ToggleButton, StateText } from '../../styled/ToggleButton';
import { Settings } from '../../types/settings';
import { putData } from '../../api';
import { loadSettings } from '../../actions';

const ExperimentalManager = () => {
  // const authorizations = useSelector(selectAuthorizations);
  // const isDemo = useSelector(selectIsDemo);
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  const updateModelPortfolio = () => {
    if (!settings) {
      return;
    }
    let newSettings: Settings = { ...settings };
    newSettings.model_portfolios_enabled = !settings.model_portfolios_enabled;
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
    <ShadowBox>
      <H2>Experimental Features</H2>
      <P>You can try out new Passiv features before they're fully baked!</P>
      <div>
        <OptionsTitle>Model Portfolios:</OptionsTitle>
        <ToggleButton onClick={updateModelPortfolio}>
          {settings.model_portfolios_enabled ? (
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
      </div>
    </ShadowBox>
  );
};

export default ExperimentalManager;
