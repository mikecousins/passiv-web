import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OverviewTab from '../components/OverviewTab';
import { selectCurrentGroupId } from '../selectors/groups';
import { selectAccounts } from '../selectors/accounts';
import AccountTab from '../components/AccountTab';
import GroupSettingsTab from '../components/GroupSettingsTab';
import styled from '@emotion/styled';

export const SubNav = styled.div`
  border-bottom: 1px solid #e5e5e5;
  margin: 0px 0 30px;

  a {
    color: #2a2d34;
    display: inline-block;
    font-weight: 600;
    padding: 10px 50px 17px;
    text-decoration: none;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom: 3px solid #03a287;
    }
  }
`;

const GroupPage = () => {
  const groupId = useSelector(selectCurrentGroupId);
  const accounts = useSelector(selectAccounts);
  return (
    <React.Fragment>
      <SubNav>
        <Link to={`/app/group/${groupId}`}>Overview</Link>
        {accounts &&
          accounts.map(account => {
            if (account.portfolio_group === groupId) {
              return (
                <Link
                  to={`/app/group/${groupId}/account/${account.id}`}
                  key={account.id}
                >
                  {account.name}
                </Link>
              );
            }
            return null;
          })}
        <Link to={`/app/group/${groupId}/settings`}>Settings</Link>
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
