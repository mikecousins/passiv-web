import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OverviewTab from '../components/OverviewTab';
import { selectCurrentGroupId } from '../selectors/groups';
import { selectAccounts } from '../selectors/accounts';
import AccountTab from '../components/AccountTab';
import GroupSettingsTab from '../components/GroupSettingsTab';
import styled from '@emotion/styled';
import { selectPathname } from '../selectors/router';

export const SubNav = styled.div`
  border-bottom: 1px solid #e5e5e5;
  margin: 0px 0 30px;
  overflow-x: auto;
  margin-right: -15px;
  a {
    color: #2a2d34;
    display: inline-block;
    font-weight: 600;
    padding: 10px 50px 17px;
    text-decoration: none;
    border-bottom: 3px solid transparent;
    @media (max-width: 900px) {
      padding: 10px 28px 17px;
    }
    &.active,
    &:hover {
      border-bottom: 3px solid #03a287;
    }
    &.active {
      border-bottom: 3px solid #2a2d34;
    }
  }
`;
export const NavContainer = styled.div`
  min-width: 752px;
  display: flex;
`;

const overviewSelected = (pathname: string, groupId: string | null) => {
  if (pathname === `/app/group/${groupId}`) {
    return 'active';
  }
};

const accountSelected = (
  pathname: string,
  groupId: string | null,
  accountId: string | null,
) => {
  if (pathname === `/app/group/${groupId}/account/${accountId}`) {
    return 'active';
  }
};

const settingsSelected = (pathname: string, groupId: string | null) => {
  if (pathname === `/app/group/${groupId}/settings`) {
    return 'active';
  }
};

const GroupPage = () => {
  const groupId = useSelector(selectCurrentGroupId);
  const accounts = useSelector(selectAccounts);
  const pathname = useSelector(selectPathname);

  return (
    <React.Fragment>
      <SubNav>
        <NavContainer>
          <Link
            className={overviewSelected(pathname, groupId)}
            to={`/app/group/${groupId}`}
          >
            Overview
          </Link>
          {accounts &&
            accounts.map(account => {
              if (account.portfolio_group === groupId) {
                return (
                  <Link
                    className={accountSelected(pathname, groupId, account.id)}
                    to={`/app/group/${groupId}/account/${account.id}`}
                    key={account.id}
                  >
                    {account.name}
                  </Link>
                );
              }
              return null;
            })}
          <Link
            className={settingsSelected(pathname, groupId)}
            to={`/app/group/${groupId}/settings`}
          >
            Group Settings
          </Link>
        </NavContainer>
      </SubNav>
      <Route path="/app/group/:groupId" exact component={OverviewTab} />
      <Route
        path="/app/group/:groupId/account/:accountId"
        component={AccountTab}
      />
      <Route path="/app/group/:groupId/settings" component={GroupSettingsTab} />
    </React.Fragment>
  );
};

export default GroupPage;
