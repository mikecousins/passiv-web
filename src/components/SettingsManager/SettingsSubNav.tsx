import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { NavContainer, SubNav } from '../../pages/GroupPage';
import { selectPathname } from '../../selectors/router';
import AccountsManager from './AccountsManager';
import ConnectionsManager from './ConnectionsManager';
import CredentialsManager from './CredentialsManager';
import NotificationsManager from './NotificationsManager';

const SettingsSubNav = () => {
  const currentPath = useSelector(selectPathname);
  const overviewSelected = (pathname: string) => {
    if (pathname === currentPath) {
      return 'active';
    }
  };
  return (
    <div>
      <SubNav>
        <NavContainer>
          <Link className={overviewSelected('/settings')} to={'/settings'}>
            Profile
          </Link>
          <Link
            className={overviewSelected('/settings/notifications')}
            to={'/settings/notifications'}
          >
            Notifications
          </Link>
          <Link
            className={overviewSelected('/settings/connections')}
            to={'/settings/connections'}
          >
            Portfolios & Connections
          </Link>
          <Link
            className={overviewSelected('/settings/advanced')}
            to={'/settings/advanced'}
          >
            Advanced
          </Link>
        </NavContainer>
      </SubNav>
      <Route path="/settings" exact component={CredentialsManager} />
      <Route path="/settings/notifications" component={NotificationsManager} />
      <Route path="/settings/connections" component={ConnectionsManager} />
      <Route path="/settings/advanced" component={AccountsManager} />
    </div>
  );
};

export default SettingsSubNav;
