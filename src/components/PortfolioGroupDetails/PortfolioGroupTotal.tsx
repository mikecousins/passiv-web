import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import ShadowBox from '../../styled/ShadowBox';
import {
  Title,
  Total,
  Center,
  CashGroup,
  CashType,
} from '../../styled/PortfolioGroupDetails';
import Number from '../Number';
import { Error } from '../../types/groupInfo';
import { Currency } from '../../types/currency';

type Props = {
  error?: Error | null;
  equity?: any;
  currency?: Currency | null;
};

const PortfolioGroupTotal = ({ error, equity, currency }: Props) => {
  let equityValue = null;
  if (error) {
    equityValue = (
      <Center>
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </Center>
    );
  } else {
    equityValue =
      equity !== null ? (
        <Number value={equity} currency />
      ) : (
        <FontAwesomeIcon icon={faSpinner} spin />
      );
  }

  return (
    <ShadowBox background="#04a287">
      <Total>
        <Title>Total Value</Title>
        <CashGroup>
          {!error && (
            <CashType>
              <span title={currency ? currency.name : ''}>
                {currency && currency.code}
              </span>
            </CashType>
          )}
          {equity !== undefined && <CashType>{equityValue}</CashType>}
        </CashGroup>
      </Total>
    </ShadowBox>
  );
};

export default PortfolioGroupTotal;
