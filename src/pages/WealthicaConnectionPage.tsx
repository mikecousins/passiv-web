import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reloadEverything } from '../actions';
import { Redirect } from 'react-router-dom';

import { H1DarkStyle } from '../styled/Setup';
import ShadowBox from '../styled/ShadowBox';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import WealthicaSelectBrokerages from '../components/Wealthica/WealthicaSelectBrokerages';
import WealthicaEnterLoginCredentials from '../components/Wealthica/WealthicaEnterLoginCredentials';
import WealthicaSecurityQuestion from '../components/Wealthica/WealthicaSecurityQuestion';
import WealthicaConnectionFailed from '../components/Wealthica/WealthicaConnectionFailed';

type Props = {
  onboarding?: boolean;
};

const WealthicaConnectionPage = ({ onboarding }: Props) => {
  const [selectingBrokerage, setSelectingBrokerage] = useState(true);
  const [enterLoginCredentials, setEnterLoginCredentials] = useState(false);
  const [answerSecurityQuestion, setAnswerSecurityQuestion] = useState(false);
  const [connectionFail, setConnectionFail] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [syncing_status, setSyncingStatus] = useState(null);
  const [institutionData, setInstitutionData] = useState<any>();

  const dispatch = useDispatch();

  const handleSuccess = () => {
    dispatch(reloadEverything());
    setEnterLoginCredentials(false);
    setAnswerSecurityQuestion(false);
    setSyncingStatus(null);
    setInstitutionData(null);
    setConnectionFail(false);
    setConnectionSuccess(true);
  };

  const handleFail = () => {
    setEnterLoginCredentials(false);
    setAnswerSecurityQuestion(false);
    setSyncingStatus(null);
    setInstitutionData(null);
    setConnectionFail(true);
  };

  const handleCancel = () => {
    setEnterLoginCredentials(false);
    setAnswerSecurityQuestion(false);
    setConnectionFail(false);
    setSyncingStatus(null);
    setInstitutionData(null);
    setSelectingBrokerage(true);
  };

  const setAndCheckSyncingStatus = (new_syncing_status: any) => {
    setSyncingStatus(new_syncing_status);
    if (new_syncing_status.passiv_sync_complete) {
      handleSuccess();
    } else if (new_syncing_status.sync_status === 'error') {
      if (new_syncing_status.sync_error.name === 'SecurityQuestionError') {
        setAnswerSecurityQuestion(true);
      } else {
        setConnectionFail(true);
      }
    }
  };

  const onInstitutionDataInit = (institutionData: any) => {
    if (institutionData == null) {
      setConnectionFail(true);
    } else {
      setInstitutionData(institutionData);
      setEnterLoginCredentials(true);
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
        isUpdate={false}
        authorizationId={null}
      />
    );
  } else if (answerSecurityQuestion) {
    content = (
      <WealthicaSecurityQuestion
        syncing_status={syncing_status}
        handleCancel={handleCancel}
        handleFail={handleFail}
        handleSuccess={setAndCheckSyncingStatus}
      />
    );
  } else if (connectionFail) {
    content = (
      <WealthicaConnectionFailed
        handleRetry={handleCancel}
        handleCancel={null}
      />
    );
  } else if (connectionSuccess) {
    return <Redirect to="/app/setup-groups" />;
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
