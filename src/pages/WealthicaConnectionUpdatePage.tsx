import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reloadEverything } from '../actions';
import { postData } from '../api';

import { H1DarkStyle } from '../styled/Setup';
import ShadowBox from '../styled/ShadowBox';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import WealthicaEnterLoginCredentials from '../components/Wealthica/WealthicaEnterLoginCredentials';
import WealthicaSecurityQuestion from '../components/Wealthica/WealthicaSecurityQuestion';
import WealthicaConnectionFailed from '../components/Wealthica/WealthicaConnectionFailed';

type Props = {
  onboarding?: boolean;
};

const WealthicaConnectionUpdatePage = ({ onboarding }: Props) => {
  const [enterLoginCredentials, setEnterLoginCredentials] = useState(false);
  const [answerSecurityQuestion, setAnswerSecurityQuestion] = useState(false);
  const [connectionFail, setConnectionFail] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [connectionCancel, setConnectionCancel] = useState(false);
  const [syncing_status, setSyncingStatus] = useState(null);
  const [institutionData, setInstitutionData] = useState<any>();

  const dispatch = useDispatch();

  let { authorizationID } = useParams();

  useEffect(() => {
    alert('Hello');
    if (!institutionData && !connectionFail) {
      postData(`/api/v1/wealthica/connect`, {
        authorization_id: authorizationID,
      })
        .then((response) => {
          onInstitutionDataInit(response.data);
        })
        .catch(() => {
          setConnectionFail(true);
        });
    }
  }, []);

  const handleSuccess = () => {
    dispatch(reloadEverything());
    setEnterLoginCredentials(false);
    setAnswerSecurityQuestion(false);
    setConnectionFail(false);
    setSyncingStatus(null);
    setInstitutionData(null);
    setConnectionSuccess(true);
  };

  const handleFail = () => {
    setEnterLoginCredentials(false);
    setAnswerSecurityQuestion(false);
    setConnectionFail(true);
  };

  const handleCancel = () => {
    setEnterLoginCredentials(false);
    setAnswerSecurityQuestion(false);
    setConnectionFail(false);
    setSyncingStatus(null);
    setInstitutionData(false);
    setConnectionCancel(true);
  };

  const handleRetry = () => {
    setEnterLoginCredentials(true);
    setAnswerSecurityQuestion(false);
    setConnectionFail(false);
    setSyncingStatus(null);
  };

  const setAndCheckSyncingStatus = (new_syncing_status: any) => {
    setSyncingStatus(new_syncing_status);

    if (new_syncing_status.passiv_sync_complete) {
      handleSuccess();
    } else if (
      new_syncing_status.sync_status === 'error' ||
      new_syncing_status.sync_status === 'syncing'
    ) {
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
    }
  };

  const onLoginSuccess = (syncing_status: any) => {
    setEnterLoginCredentials(false);
    setAndCheckSyncingStatus(syncing_status);
  };

  let content = <FontAwesomeIcon icon={faSpinner} spin />;

  if (enterLoginCredentials) {
    content = (
      <WealthicaEnterLoginCredentials
        institutionData={institutionData}
        onLoginSuccess={onLoginSuccess}
        handleCancel={handleCancel}
        isUpdate={true}
        authorizationId={authorizationID}
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
        handleRetry={handleRetry}
        handleCancel={handleCancel}
      />
    );
  } else if (connectionSuccess) {
    return <Redirect to="/app/setup-groups" />;
  } else if (connectionCancel) {
    return <Redirect to="/app/settings" />;
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

export default WealthicaConnectionUpdatePage;
