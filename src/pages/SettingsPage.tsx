import React from 'react';
import styled from '@emotion/styled';
import CredentialsManager from '../components/SettingsManager/CredentialsManager';
import GeneralManager from '../components/SettingsManager/GeneralManager';
import SubscriptionManager from '../components/SettingsManager/SubscriptionManager';
import ConnectionsManager from '../components/SettingsManager/ConnectionsManager';
import NotificationsManager from '../components/SettingsManager/NotificationsManager';
import AccountsManager from '../components/SettingsManager/AccountsManager';
import DemoNotes from '../components/DemoNotes';
import { selectIsDemo } from '../selectors';
import { useSelector } from 'react-redux';
import Tour from '../components/Tour/Tour';
import UpgradeButton from '../components/Tour/UpgradeButton';
import EliteFeatureTitle from '../components/Tour/EliteFeatureTitle';

const TOUR_STEPS = [
  {
    target: '.tour-edit-connections',
    content: (
      <div>
        A connection is a unique brokerage login. Your connection is always
        read-only when you first connect. You can enable trading by clicking
        <strong> Edit</strong>.<br />
        <a
          href="https://passiv.com/help/tutorials/how-to-manage-your-brokerage-connections/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '.tour-add-more-connections',
    title: <EliteFeatureTitle />,
    content: (
      <div>
        Elite users can have multiple connections. Connect your spouse’s
        accounts by clicking <strong>Add Another Connection</strong>.
        <br />
        <br />
        <UpgradeButton />
      </div>
    ),
    placement: 'right',
  },
  {
    target: '.tour-edit-groups',
    title: <EliteFeatureTitle />,
    content: (
      <>
        <div>
          Elite users can click on <strong> Edit Groups</strong> to manage their
          accounts. You can{' '}
          <a
            href="https://passiv.com/help/tutorials/how-to-set-up-multi-account-portfolios/"
            target="_blank"
            rel="noopener noreferrer"
          >
            group
          </a>{' '}
          them into portfolios to manage them together with the same target
          allocation. You can also{' '}
          <a
            href="https://passiv.com/help/tutorials/how-to-hide-accounts-in-passiv/"
            target="_blank"
            rel="noopener noreferrer"
          >
            hide
          </a>{' '}
          accounts that you don’t want to see in Passiv.
        </div>
        <br />
        <UpgradeButton />
      </>
    ),
    placement: 'right',
  },
];

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
      <Tour steps={TOUR_STEPS} name="settings_page_tour" />
      <Flex>
        <CredentialsManager />
        <NotificationsManager />
        {isDemo ? <DemoNotes /> : <SubscriptionManager />}
        <GeneralManager />
      </Flex>
      <ConnectionsManager />
      <AccountsManager />
    </React.Fragment>
  );
};

export default SettingsPage;
