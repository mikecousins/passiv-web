import React from 'react';
import ShadowBox from '../../styled/ShadowBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Number from '../Number';
import {
  CashBalance,
  CashGroup,
  Cash,
  CashType,
  Center,
  Title,
} from '../../styled/PortfolioGroupDetails';
import { Balance, Error } from '../../types/groupInfo';

type Props = {
  balances: Balance[] | null;
  error: Error | null;
  tourClass?: string;
};

const PortfolioGroupCash = ({ balances, error, tourClass }: Props) => (
  <ShadowBox background="#BEE0DB" className={tourClass}>
    <Cash>
      <Title>Cash</Title>
      <CashBalance>
        {balances ? (
          balances.map((balance) => (
            <CashGroup key={balance.currency.id}>
              <CashType>
                <span title={balance.currency.name}>
                  {balance.currency.code}
                </span>
              </CashType>
              <CashType>
                <Number value={balance.cash} currency />
              </CashType>
            </CashGroup>
          ))
        ) : (
          <CashType>
            <Center>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </Center>
          </CashType>
        )}
      </CashBalance>
    </Cash>
  </ShadowBox>
);

export default PortfolioGroupCash;
