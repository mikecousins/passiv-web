import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectAccounts,
  selectAccountBalances,
} from '../../selectors/accounts';
import { selectAuthorizations } from '../../selectors';
import OrderImpact from './OrderImpact';
import { Title } from '../../styled/GlobalElements';
import styled from '@emotion/styled';

const Order = styled.div`
  margin-top: 30px;
`;

type Props = {
  impacts: any[];
};

const OrderImpacts = ({ impacts }: Props) => {
  const accountBalances = useSelector(selectAccountBalances);
  let filteredAccountIds: string[] = [];
  const accounts = useSelector(selectAccounts);
  const authorizations = useSelector(selectAuthorizations);

  impacts.forEach((impact) => {
    const account = accounts.find((account) => account.id === impact.account);
    const authorization = authorizations!.find(
      (authorization) => authorization.id === account!.brokerage_authorization,
    );

    if (authorization && authorization.brokerage.allows_trading) {
      let accountBalanceData = accountBalances[impact.account]['data'];
      let filteredAccountBalance = accountBalanceData!.filter(
        (data) => data.currency.id === impact.currency,
      );

      if (
        filteredAccountBalance.length > 0 &&
        (filteredAccountBalance[0].cash !== impact.remaining_cash ||
          impact.estimated_commissions >= 0 ||
          impact.forex_fees >= 0)
      ) {
        if (!filteredAccountIds.includes(impact.account)) {
          filteredAccountIds.push(impact.account);
        }
      }
    }
  });

  let impactsByAccount: any[] = [];

  filteredAccountIds.forEach((accountId) => {
    let filteredImpact = impacts.filter(
      (impact) => impact.account === accountId,
    );
    impactsByAccount.push(filteredImpact);
  });

  return (
    <Order>
      <Title>Estimated results</Title>
      {impactsByAccount.map((impact, index) => (
        <OrderImpact key={index} impacts={impact} />
      ))}
    </Order>
  );
};

export default OrderImpacts;
