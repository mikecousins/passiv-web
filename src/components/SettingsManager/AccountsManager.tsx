import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthorizations } from '../../selectors';
import Accounts from './../Accounts';
import ShadowBox from '../../styled/ShadowBox';

const AccountsManager = () => {
  const authorizations = useSelector(selectAuthorizations);

  if (!authorizations) {
    return null;
  } else if (authorizations.length === 0) {
    return null;
  }

  return (
    <ShadowBox className="tour-edit-groups">
      <Accounts />
    </ShadowBox>
  );
};

export default AccountsManager;
