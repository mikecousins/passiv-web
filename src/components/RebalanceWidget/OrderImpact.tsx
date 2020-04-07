import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { selectCurrencies } from '../../selectors/currencies';
import {
  selectAccounts,
  selectAccountBalances,
} from '../../selectors/accounts';
import Number from '../Number';
import { Table, A, P, Title } from '../../styled/GlobalElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ShadowBox from '../../styled/ShadowBox';

const MetaHorizontal = styled.div`
  text-align: left;
  span {
    font-weight: 600;
    margin-bottom: 8px;
    display: inline-block;
    margin-right: 6px;
    text-align: left;
  }
`;

const AccountDiv = styled.div`
  min-width: 25%;
`;
const CommissionsDiv = styled.div`
  min-width: 15%;
`;
const RemainingCashDiv = styled.div`
  min-width: 15%;
`;
const ForexFeesDiv = styled.div`
  min-width: 25%;
`;

const Warning = styled.div`
  min-width: 12%;
  background-color: orange;
  margin-top: 10px;
  padding: 10px;
  box-shadow: var(--box-shadow);
  border-radius: 4px;
  color: var(--brand-grey);
  font-size: 18px;
`;

const WarningTitle = styled.div`
  display: inline-block;
  width: 100px;
  font-weight: 700;
  text-align: center;
  position: relative;
`;

const WarningTitleBox = styled.div`
  margin: auto;
`;

const WarningContent = styled.div`
  display: inline-block;
  width: calc(100% - 250px);
  padding: 10px;
  font-size: 1em;
`;

const WarningDetailToggle = styled.div`
  display: inline-block;
  width: 150px;
  padding: 10px;
  font-size: 1em;
  text-align: right;
`;

const WarningDetail = styled(ShadowBox)`
  display: inline-block;
  margin: 20px;
  font-size: 1em;
`;

const AccountContainer = styled.div`
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  padding-bottom: 10px;
  &:first-of-type {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const Bold = styled.span`
  font-weight: 600;
`;

const BalanceContainer = styled.div`
  margin: 5px;
`;

type Props = {
  impacts: any[];
};

export const OrderImpact = ({ impacts }: Props) => {
  const [showWarningDetail, setShowWarningDetail] = useState<boolean>(false);

  const accounts = useSelector(selectAccounts);
  const currencies = useSelector(selectCurrencies);
  const balances = useSelector(selectAccountBalances);

  const getAccountBalances = (accountId: string) => {
    return balances[accountId].data;
  };

  const getBalanceByAccountCurrency = (
    accountId: string,
    currencyId: string,
  ) => {
    if (accountId != null && currencyId != null) {
      if (balances !== null) {
        let accountBalances = getAccountBalances(accountId);
        let balance =
          accountBalances &&
          accountBalances.find((b) => b.currency.id === currencyId);
        return balance && balance.cash;
      }
    }
    return null;
  };

  const filteredAccount = accounts.find(
    (account) => account.id === impacts[0].account,
  );

  const toggleWarningDetail = () => {
    setShowWarningDetail(!showWarningDetail);
  };

  if (!filteredAccount) {
    return null;
  }

  const filteredCurrencyCode = (impact: any) => {
    if (!currencies) {
      return null;
    }
    let currencyCode = currencies.find(
      (currency) => currency.id === impact.currency,
    )!.code;
    return currencyCode;
  };

  let showNegativeCashWarning = false;
  impacts.map((impact, index) => {
    if (impact.remaining_cash < 0) {
      let originalBalance = getBalanceByAccountCurrency(
        impact.account,
        impact.currency,
      );
      if (originalBalance != null && impact.remaining_cash < originalBalance) {
        showNegativeCashWarning = true;
      }
    }
    return null;
  });

  return (
    <React.Fragment>
      <AccountContainer>
        <Table>
          <AccountDiv>
            <MetaHorizontal>
              <span>
                {filteredAccount.name} ({filteredAccount.number})
              </span>
            </MetaHorizontal>
          </AccountDiv>
          <CommissionsDiv>
            <MetaHorizontal>
              <p>Trade commissions:</p>
              <BalanceContainer>
                {impacts.map((impact, index) => (
                  <p key={index}>
                    {' '}
                    <Number
                      value={impact.estimated_commissions}
                      currency
                    />{' '}
                    {'  '} {filteredCurrencyCode(impact)}{' '}
                  </p>
                ))}
              </BalanceContainer>
            </MetaHorizontal>
          </CommissionsDiv>
          <RemainingCashDiv>
            <MetaHorizontal>
              <p>Remaining cash:</p>
              <BalanceContainer>
                {impacts.map((impact, index) => (
                  <p key={index}>
                    {' '}
                    <Number value={impact.remaining_cash} currency /> {'  '}{' '}
                    {filteredCurrencyCode(impact)}{' '}
                  </p>
                ))}
              </BalanceContainer>
            </MetaHorizontal>
          </RemainingCashDiv>
          <ForexFeesDiv>
            <MetaHorizontal>
              <p>Forex fees:</p>
              <BalanceContainer>
                {impacts.map((impact, index) => (
                  <p key={index}>
                    {' '}
                    <Number value={impact.forex_fees} currency /> {'  '}{' '}
                    {filteredCurrencyCode(impact)}{' '}
                  </p>
                ))}
              </BalanceContainer>
            </MetaHorizontal>
          </ForexFeesDiv>
        </Table>
        {showNegativeCashWarning && (
          <Warning>
            <WarningTitle>
              <WarningTitleBox>Notice:</WarningTitleBox>
            </WarningTitle>
            <WarningContent>
              This set of trades will result in a <Bold>temporary</Bold>{' '}
              negative cash balance in one of your currencies.
            </WarningContent>
            <WarningDetailToggle>
              <A onClick={() => toggleWarningDetail()}>
                {showWarningDetail ? (
                  <span>
                    Hide Detail <FontAwesomeIcon icon={faCaretUp} />
                  </span>
                ) : (
                  <span>
                    Show Detail <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                )}
              </A>
            </WarningDetailToggle>

            {showWarningDetail && (
              <WarningDetail>
                <Title>Negative Cash Warnings</Title>
                <P>
                  A negative cash balance can happen when you don't have enough
                  of the right currency to place the trades, but still have
                  enough cash overall. In this case, your broker will lend you
                  some of the lacking currency to allow you to place the trades,
                  as long as your net cash balance is still positive. In
                  registered accounts, your broker will settle up with a foreign
                  currency exchange at the end of the day.
                </P>
                <P>
                  Passiv's trade calculations take this into account since it's
                  a common feature of placing trades. You can see an estimate of
                  the exchange fee that your broker charges in the summary
                  above.
                </P>
                <P>
                  For margin accounts, the foreign currency exchange may not
                  take place automatically. In this case, you can manually
                  exchange currency, add cash to cover it, or just keep the
                  currency loan and pay the interest to hold it.
                </P>
              </WarningDetail>
            )}
          </Warning>
        )}
      </AccountContainer>
    </React.Fragment>
  );
};

export default OrderImpact;
