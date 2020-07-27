import React from 'react';
import styled from '@emotion/styled';
import CredentialsManager from '../components/SettingsManager/CredentialsManager';
import SubscriptionManager from '../components/SettingsManager/SubscriptionManager';
import DemoNotes from '../components/DemoNotes';
import { selectIsDemo } from '../selectors';
import { useSelector } from 'react-redux';

export const Flex = styled.div`
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > div {
      width: 49%;
      margin-bottom: 2%;
    }
    h2 {
      margin-bottom: 15px;
    }
  }
`;

const SettingsPage = () => {
  const isDemo = useSelector(selectIsDemo);
  return (
    <React.Fragment>
      <Flex>
        <CredentialsManager />
        {isDemo ? <DemoNotes /> : <SubscriptionManager />}
      </Flex>
    </React.Fragment>
  );
};

export default SettingsPage;
