import React from 'react';
import { useSelector } from 'react-redux';
import { selectAccountBalances } from '../../selectors/accounts';
import OrderImpact from './OrderImpact';
import { Title } from '../../styled/GlobalElements';

type Props = {
  impacts: any[];
};

const OrderImpacts = ({ impacts }: Props) => {
  const accountBalances = useSelector(selectAccountBalances);
  let filteredAccountIds: string[] = [];

  impacts.forEach((impact) => {
    let accountBalanceData = accountBalances[impact.account]['data'];
    let filteredAccountBalance = accountBalanceData!.filter(
      (data) => data.currency.id === impact.currency,
    );

    if (
      filteredAccountBalance.length > 0 &&
      (filteredAccountBalance[0].cash !== impact.remaining_cash ||
        impact.estimated_commissions > 0 ||
        impact.forex_fees > 0)
    ) {
      if (!filteredAccountIds.includes(impact.account)) {
        filteredAccountIds.push(impact.account);
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

  console.log(impactsByAccount);

  return (
    <React.Fragment>
      <Title>Estimated results</Title>
      {impactsByAccount.map((impact, index) => (
        <OrderImpact key={index} impacts={impact} />
      ))}
    </React.Fragment>
  );
};

export default OrderImpacts;
