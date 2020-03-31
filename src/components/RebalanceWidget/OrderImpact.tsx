import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { selectCurrencies } from '../../selectors';
import { selectAccounts } from '../../selectors/accounts';
import Number from '../Number';
import { Table } from '../../styled/GlobalElements';

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
`;

const WarningTitle = styled.div`
  display: inline-block;
  width: 100px;
  font-weight: 700;
  text-align: center;
  font-size: 18px;
  position: relative;
`;

const WarningTitleBox = styled.div`
  margin: auto;
`;

const WarningContent = styled.div`
  display: inline-block;
  width: calc(100% - 100px);
  padding: 10px;
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

const BalanceContainer = styled.div`
  margin: 5px;
`;

type Props = {
  impacts: any[];
};

export const OrderImpact = ({ impacts }: Props) => {
  const accounts = useSelector(selectAccounts);
  const currencies = useSelector(selectCurrencies);
  const filteredAccount = accounts.find(
    account => account.id === impacts[0].account,
  );

  if (!filteredAccount) {
    return null;
  }

  const filteredCurrencyCode = (impact: any) => {
    if (!currencies) {
      return null;
    }
    let currencyCode = currencies.find(
      currency => currency.id === impact.currency,
    )!.code;
    return currencyCode;
  };

  let showNegativeCashWarning = false;
  impacts.map((impact, index) => {
    if (impact.remaining_cash < 0) {
      showNegativeCashWarning = true;
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
              <WarningTitleBox>Warning:</WarningTitleBox>
            </WarningTitle>
            <WarningContent>
              This set of trades may result in a negative cash balance in one or
              more of your accounts.
            </WarningContent>
          </Warning>
        )}
      </AccountContainer>
    </React.Fragment>
  );
};

export default OrderImpact;
