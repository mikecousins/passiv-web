import React from 'react';
import CredentialsManager from '../components/SettingsManager/CredentialsManager';
import SubscriptionManager from '../components/SettingsManager/SubscriptionManager';
import DemoNotes from '../components/DemoNotes';
import { selectIsDemo } from '../selectors';
import { useSelector } from 'react-redux';
import { Flex } from './SettingsPage';

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
