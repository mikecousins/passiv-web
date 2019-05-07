import React from 'react';
import { connect } from 'react-redux';
import { selectCurrencies } from '../selectors';
import { selectAccounts } from '../selectors/accounts';
import styled from '@emotion/styled';
import Number from './Number';
import { Table } from '../styled/GlobalElements';

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

export const OrderImpact = ({ impacts, accounts, currencies }) => {
  const filteredAccount = accounts.filter(
    account => account.id === impacts[0].account,
  )[0];

  const filteredCurrencyCode = impact => {
    let currencyCode = currencies.filter(
      currency => currency.id === impact.currency,
    )[0].code;
    return currencyCode;
  };

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
                {impacts.map(impact => (
                  <p>
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
                {impacts.map(impact => (
                  <p>
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
                {impacts.map(impact => (
                  <p>
                    {' '}
                    <Number value={impact.forex_fees} currency /> {'  '}{' '}
                    {filteredCurrencyCode(impact)}{' '}
                  </p>
                ))}
              </BalanceContainer>
            </MetaHorizontal>
          </ForexFeesDiv>
        </Table>
      </AccountContainer>
    </React.Fragment>
  );
};

const select = state => ({
  accounts: selectAccounts(state),
  currencies: selectCurrencies(state),
});

export default connect(select)(OrderImpact);
