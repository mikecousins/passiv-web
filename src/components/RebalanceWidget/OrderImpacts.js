import React from 'react';
import { useSelector } from 'react-redux';
import { selectAccountBalances } from '../../selectors/accounts';
import OrderImpact from './OrderImpact';
import { Title } from '../../styled/GlobalElements';

const OrderImpacts = ({ impacts }) => {
  const accountBalances = useSelector(selectAccountBalances);
  let filteredAccountIds = [];

  impacts.forEach(impact => {
    let accountBalanceData = accountBalances[impact.account]['data'];
    let filteredAccountBalance = accountBalanceData.filter(
      data => data.currency.id === impact.currency,
    );

    if (
      filteredAccountBalance.length > 0 &&
      (filteredAccountBalance[0].cash !== impact.remaining_cash ||
        impact.estimated_commissions > 0 ||
        impact.forex_fees > 0)
    ) {
      filteredAccountIds.push(impact.account);
    }
  });

  const uniqueFilteredAccountIds = [...new Set(filteredAccountIds)];

  let impactsByAccount = [];

  uniqueFilteredAccountIds.forEach(accountId => {
    let filteredImpact = impacts.filter(impact => impact.account === accountId);
    impactsByAccount.push(filteredImpact);
  });

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
