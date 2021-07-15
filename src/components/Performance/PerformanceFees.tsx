import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faCaretUp,
  faCaretDown,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { CashReturn, SubHeader, toDollarString } from './Performance';
import { useSelector } from 'react-redux';
import {
  selectCommissions,
  selectFees,
  selectForexFees,
} from '../../selectors/performance';
import Tooltip from '../Tooltip';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

const PerformanceFees = () => {
  const commissions = useSelector(selectCommissions);
  const forexFees = useSelector(selectForexFees);
  const fees = useSelector(selectFees);
  let totalFees;
  if (
    (commissions || commissions === 0) &&
    (forexFees || forexFees === 0) &&
    (fees || fees === 0)
  ) {
    totalFees = commissions + forexFees + fees;
  }

  if (!totalFees && totalFees !== 0) {
    return (
      <MarginBottom>
        <FontAwesomeIcon icon={faSpinner} spin />
      </MarginBottom>
    );
  }

  const feeString = toDollarString(totalFees);

  const positive = !(feeString[0] === '-');

  const TooltipBreakdown = () => {
    if (
      (commissions || commissions === 0) &&
      (forexFees || forexFees === 0) &&
      (fees || fees === 0)
    ) {
      return (
        <div>
          <br />
          Commissions:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
          {toDollarStringWithCents(commissions)}
          <br />
          Forex
          Fees:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
          {toDollarStringWithCents(forexFees)} <br />
          Other Fees:&nbsp;&nbsp;${toDollarStringWithCents(fees)} <br />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <Tooltip
        label="Total fees. This includes trade commissions, forex fees, ADR fees, and others."
        additionalComponent={<TooltipBreakdown />}
      >
        <div>
          <SubHeader>
            Fees and Commission{' '}
            <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 12 }} />
          </SubHeader>
          <CashReturn className={positive ? 'positive' : 'negative'}>
            ${feeString}{' '}
            {positive ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </CashReturn>
        </div>
      </Tooltip>
    </React.Fragment>
  );
};

export default PerformanceFees;

export const toDollarStringWithCents = (dollars: number) => {
  let dollarString = dollars.toFixed(2);
  let index = dollarString.length - 6;
  while ((index > 0 && dollarString[0] !== '-') || index > 1) {
    dollarString =
      dollarString.slice(0, index) + ',' + dollarString.slice(index);
    index -= 3;
  }
  return dollarString;
};
