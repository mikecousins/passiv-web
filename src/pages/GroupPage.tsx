import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OverviewTab from '../components/OverviewTab';
import { selectCurrentGroupId } from '../selectors/groups';
import { selectAccounts } from '../selectors/accounts';
import AccountTab from '../components/AccountTab';
import GroupSettingsTab from '../components/GroupSettingsTab';

const GroupPage = () => {
  const groupId = useSelector(selectCurrentGroupId);
  const accounts = useSelector(selectAccounts);
  return (
    <React.Fragment>
      <div>
        <Link to={`/app/group/${groupId}`}>Overview</Link>
        {accounts &&
          accounts.map(account => {
            if (account.portfolio_group === groupId) {
              return (
                <Link
                  to={`/app/group/${groupId}/${account.id}`}
                  key={account.id}
                >
                  {account.name}
                </Link>
              );
            }
            return null;
          })}
        <Link to={`/app/group/${groupId}/settings`}>Settings</Link>
      </div>
      <Route path="/app/group/:groupId" exact component={OverviewTab} />
      <Route path="/app/group/:groupId/:accountId" component={AccountTab} />
      <Route path="/app/group/:groupId/settings" component={GroupSettingsTab} />
    </React.Fragment>
  );
};

export default GroupPage;
