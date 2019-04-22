import React from 'react';
import CredentialsManager from '../components/CredentialsManager';
import SubscriptionManager from '../components/SubscriptionManager';
import ConnectionsManager from '../components/ConnectionsManager';
import styled from '@emotion/styled';

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

const SettingsPage = props => {
  return (
    <React.Fragment>
      <Container2Column>
        <CredentialsManager />
        <SubscriptionManager />
      </Container2Column>
      <ConnectionsManager />
    </React.Fragment>
  );
};

export default SettingsPage;
