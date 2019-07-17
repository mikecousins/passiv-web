import React from 'react';
import styled from '@emotion/styled';
import CredentialsManager from '../components/CredentialsManager';
import SubscriptionManager from '../components/SubscriptionManager';
import ConnectionsManager from '../components/ConnectionsManager';
import AccountsManager from '../components/AccountsManager';

export const Container2Column = styled.div`
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
    > div:first-of-type {
      width: 50%;
      margin-right: 30px;
    }
    > div:last-of-type {
      width: 50%;
    }
  }
`;

const SettingsPage = () => {
  return (
    <React.Fragment>
      <Container2Column>
        <CredentialsManager />
        <SubscriptionManager />
      </Container2Column>
      <ConnectionsManager />
      <AccountsManager />
    </React.Fragment>
  );
};

export default SettingsPage;
