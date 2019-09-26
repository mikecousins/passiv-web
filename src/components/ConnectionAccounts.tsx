import React from 'react';
import { useSelector } from 'react-redux';
import { selectAccounts } from '../selectors/accounts';
import { H3, P } from '../styled/GlobalElements';

type Props = {
  authorizationId: string;
};

const ConnectionAccounts = ({ authorizationId }: Props) => {
  const accounts = useSelector(selectAccounts);

  return (
    <div>
      <H3> This connection contains the following accounts: </H3>
      <div>
        {accounts
          .filter(a => a.brokerage_authorization === authorizationId)
          .map(account => (
            <P key={account.id}>
              {account.name} ({account.number})
            </P>
          ))}
      </div>
    </div>
  );
};

export default ConnectionAccounts;
