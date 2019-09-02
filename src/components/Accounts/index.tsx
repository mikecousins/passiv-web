import React from 'react';
import { useSelector } from 'react-redux';
import { selectAccounts } from '../../selectors/accounts';
import AccountRow from './AccountRow';
import AddPortfolioGroup from './AddPortfolioGroup';
import { Account } from '../../types/account';
import AccountGroup from './AccountGroup';

const Accounts = () => {
  const accounts = useSelector(selectAccounts);
  if (!accounts || accounts.length === 0) {
    return null;
  }

  // sort by group
  accounts.sort((a, b) => {
    if (a.portfolio_group < b.portfolio_group) {
      return -1;
    }
    if (a.portfolio_group > b.portfolio_group) {
      return 1;
    }
    return 0;
  });

  // create nested array by group
  const groupedAccounts: Account[][] = [];
  accounts.forEach(account => {
    let lastGroup = '';
    if (groupedAccounts.length > 0) {
      lastGroup =
        groupedAccounts[groupedAccounts.length - 1][0].portfolio_group;
    }

    if (account.portfolio_group === lastGroup) {
      groupedAccounts[groupedAccounts.length - 1].push(account);
    } else {
      groupedAccounts.push([account]);
    }
  });

  return (
    <React.Fragment>
      {groupedAccounts.map(group => (
        <AccountGroup
          name={group[0].portfolio_group}
          key={group[0].portfolio_group}
        >
          {group.map(account => (
            <AccountRow account={account} key={account.id} />
          ))}
        </AccountGroup>
      ))}
      <AddPortfolioGroup />
    </React.Fragment>
  );
};

export default Accounts;
