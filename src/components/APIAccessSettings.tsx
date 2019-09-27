import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  faToggleOn,
  faToggleOff,
  faClipboard,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { selectSettings } from '../selectors';
import { selectCanUseAPI } from '../selectors/subscription';
import { loadSettings } from '../actions';
import { postData, deleteData } from '../api';
import styled from '@emotion/styled';
import { ToggleButton, StateText } from '../styled/ToggleButton';
import { OptionsTitle, DisabledBox } from '../styled/GlobalElements';
import { InputTarget } from '../styled/Form';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const DividingLine = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
`;

const WarningBox = styled.div`
  background-color: #fafcd5;
  font-size: inherit;
  padding: 15px;
  border-radius: 4px;
  line-height: 1.3em;
`;

const ReadOnlyInput = styled(InputTarget)`
  padding: 12px 20px 12px 18px;
  width: 200px;

  text-align: center;
  margin-left: 20px;
  margin-right: 10px;
  font-size: inherit;
`;

const APIAccessSettings = () => {
  const settings = useSelector(selectSettings);
  const canUseAPI = useSelector(selectCanUseAPI);
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();

  const updateAccess = () => {
    if (settings) {
      if (settings.api_enabled === true) {
        deleteData('/api/v1/auth/token')
          .then(() => {
            setToken('');
            dispatch(loadSettings());
          })
          .catch(() => {
            setToken('');
            dispatch(loadSettings());
          });
      } else {
        postData('/api/v1/auth/token', {})
          .then(response => {
            setToken(response.data.token);
            dispatch(loadSettings());
          })
          .catch(() => {
            setToken('');
            dispatch(loadSettings());
          });
      }
    }
  };

  if (!settings) {
    return null;
  }

  if (canUseAPI === undefined || canUseAPI === null) {
    return null;
  }

  const disabled = !(canUseAPI || settings.api_enabled);

  return (
    <DividingLine>
      <OptionsTitle>Allow API Access:</OptionsTitle>
      <ToggleButton onClick={updateAccess} disabled={disabled}>
        {settings.api_enabled ? (
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
      {disabled && (
        <DisabledBox>
          Connecting to Passiv's API is an Elite feature. Subscribe to generate
          an auth token for your own apps.
        </DisabledBox>
      )}
      {settings.api_enabled && (
        <React.Fragment>
          {token && token !== '' ? (
            <React.Fragment>
              <CopyToClipboard
                text={token}
                onCopy={() => {
                  alert('copied');
                  setCopied(true);
                }}
              >
                <React.Fragment>
                  <ReadOnlyInput value={token} readOnly={true} />
                  {copied ? (
                    <FontAwesomeIcon icon={faClipboardCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faClipboard} />
                  )}
                </React.Fragment>
              </CopyToClipboard>
              <WarningBox>
                This token will appear only once. If you lose it, you will need
                to generate a new one which will invalidate the old token.
              </WarningBox>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ReadOnlyInput value="********" readOnly={true} />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </DividingLine>
  );
};

export default APIAccessSettings;
