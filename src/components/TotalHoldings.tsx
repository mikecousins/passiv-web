import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { selectSettings } from '../selectors';
import { selectTotalGroupHoldings } from '../selectors/groups';
import Number from './Number';
import { putData } from '../api';
import { loadSettings } from '../actions';
import CurrencySelector from './CurrencySelector';
import { selectCurrencies } from '../selectors/currencies';
import HiddenAccountsTooltip from './HiddenAccountsTooltip';

export const TotalContainer = styled.div`
  text-align: right;
  margin-bottom: 22px;
  padding: 10px 0 20px;
  @media (max-width: 900px) {
    padding: 10px 0;
  }
  &.smaller {
    margin-bottom: 10px;
    padding: 10px 0 5px;
  }
`;

export const Span = styled.span`
  font-size: 36px;
  font-weight: 500;
  letter-spacing: 0.8px;
  color: #000a12;
  &.smaller {
    font-size: 32px;
  }
`;

export const H2 = styled.span`
  font-weight: 900;
  letter-spacing: 0.8px;
  text-align: right;
  color: #787878;
  display: block;
  margin-bottom: 12px;
  text-transform: uppercase;
`;

export const TotalHoldings: FunctionComponent<Props> = ({ smaller }) => {
  const totalHoldings = useSelector(selectTotalGroupHoldings);
  const settings = useSelector(selectSettings);
  const currencies = useSelector(selectCurrencies);
  const dispatch = useDispatch();
  let displayTotal = <FontAwesomeIcon icon={faSpinner} spin />;
  if (settings === undefined) {
    return null;
  }
  const currency =
    currencies === null
      ? undefined
      : currencies.find(
          (currency) => currency.id === settings.preferred_currency,
        );
  if (totalHoldings !== null) {
    displayTotal = (
      <Number value={totalHoldings} currency={currency && currency.code} />
    );
  }
  return (
    <TotalContainer className={smaller ? 'smaller' : 'normal'}>
      <H2 className={smaller ? 'smaller' : 'normal'}>
        Total Holdings <HiddenAccountsTooltip />
      </H2>
      <Span className={smaller ? 'smaller' : 'normal'}>{displayTotal}</Span>
      {settings && (
        <CurrencySelector
          value={settings.preferred_currency}
          options={currencies}
          onChange={(newCurrency: string) => {
            settings.preferred_currency = newCurrency;
            putData('/api/v1/settings/', settings)
              .then(() => {
                dispatch(loadSettings());
              })
              .catch(() => {
                dispatch(loadSettings());
              });
          }}
        />
      )}
    </TotalContainer>
  );
};
TotalHoldings.defaultProps = { smaller: false };
type Props = {
  smaller: boolean;
};

export default TotalHoldings;
