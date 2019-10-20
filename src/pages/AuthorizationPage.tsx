import React from 'react';
import { useSelector } from 'react-redux';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectIsAuthorized } from '../selectors';
import QuestradeAuthorizationPicker from '../components/QuestradeAuthorizationPicker';

const AuthorizationPage = () => {
  const authorized = useSelector(selectIsAuthorized);

  if (authorized === undefined) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  return <QuestradeAuthorizationPicker />;
};

export default AuthorizationPage;
