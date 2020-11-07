import React, { useState } from 'react';
import { H1DarkStyle } from '../styled/Setup';
import ShadowBox from '../styled/ShadowBox';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import WealthicaSelectBrokerages from '../components/Wealthica/WealthicaSelectBrokerages';
import WealthicaEnterLoginCredentials from '../components/Wealthica/WealthicaEnterLoginCredentials';
import WealthicaSecurityQuestion from '../components/Wealthica/WealthicaSecurityQuestion';
import WealthicaConnectionStatusConfirmation from '../components/Wealthica/WealthicaConnectionStatusConfirmation';

type Props = {
  onboarding?: boolean;
};

const WealthicaConnectionPage = ({ onboarding }: Props) => {
  const [selectingBrokerage, setSelectingBrokerage] = useState(true);
  const [enterLoginCredentials, setEnterLoginCredentials] = useState(false);
  const [answerSecurityQuestion, setAnswerSecurityQuestion] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [connectionFail, setConnectionFail] = useState(false);
  const [syncing_status, setSyncingStatus] = useState(null);

  const [connectionInProgress, setConnectionInProgress] = useState(false);

  const [institutionData, setInstitutionData] = useState<any>();

  const setAndCheckSyncingStatus = (syncing_status: any) => {
    setSyncingStatus(syncing_status);

    if (syncing_status.passiv_sync_complete) {
      setConnectionSuccess(true);
      setConnectionInProgress(false);
    } else if (syncing_status.sync_status === 'error') {
      if (syncing_status.sync_error.name === 'SecurityQuestionError') {
        setAnswerSecurityQuestion(true);
      } else {
        setConnectionFail(true);
        setConnectionInProgress(false);
      }
    }
  };

  const handleCancel = () => {
    setEnterLoginCredentials(false);
    setAnswerSecurityQuestion(false);
    setConnectionSuccess(false);
    setConnectionFail(false);
    setSyncingStatus(null);
    setConnectionInProgress(false);
    setInstitutionData(null);
    setSelectingBrokerage(true);
  };

  const onInstitutionDataInit = (institutionData: any) => {
    if (institutionData == null) {
      setConnectionFail(true);
    } else {
      setInstitutionData(institutionData);
      setEnterLoginCredentials(true);
      setConnectionInProgress(true);
      setSelectingBrokerage(false);
    }
  };

  const onLoginSuccess = (syncing_status: any) => {
    setEnterLoginCredentials(false);
    setAndCheckSyncingStatus(syncing_status);
  };

  let content = <FontAwesomeIcon icon={faSpinner} spin />;

  if (selectingBrokerage) {
    content = (
      <WealthicaSelectBrokerages
        onInstitutionDataInit={onInstitutionDataInit}
        onboarding={onboarding}
      />
    );
  } else if (enterLoginCredentials) {
    content = (
      <WealthicaEnterLoginCredentials
        institutionData={institutionData}
        onLoginSuccess={onLoginSuccess}
        handleCancel={handleCancel}
      />
    );
  } else if (answerSecurityQuestion) {
    content = <WealthicaSecurityQuestion />;
  } else if (connectionSuccess || connectionFail) {
    content = <WealthicaConnectionStatusConfirmation />;
  }

  return (
    <React.Fragment>
      <ShadowBox background="#2a2d34">
        <H1DarkStyle>Wealthica Connect</H1DarkStyle>
        {content}
      </ShadowBox>
    </React.Fragment>
  );
};

export default WealthicaConnectionPage;
