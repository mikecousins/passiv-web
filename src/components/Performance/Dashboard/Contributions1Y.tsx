import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { selectContributions1Y } from '../../../selectors/performance';
import { selectGlobalPreferredCurrency } from '../../../selectors/groups';
import Number from '../../Number';

export const ContributionsContainer = styled.div`
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
  h2 {
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 0.8px;
    text-align: right;
    color: #787878;
    display: block;
    margin-bottom: 12px;
    text-transform: uppercase;
    span {
      color: #000a12;
      font-size: 13px;
      letter-spacing: 0;
      margin-right: 5px;
    }
  }
`;

export const Num = styled.span`
  font-size: 36px;
  font-weight: 500;
  letter-spacing: 0.8px;
  color: #000a12;
  &.smaller {
    font-size: 32px;
  }
`;

export const Contributions1Y: FunctionComponent<Props> = ({ smaller }) => {
  const contributions1Y = useSelector(selectContributions1Y);
  const preferredCurrency = useSelector(selectGlobalPreferredCurrency);
  let displayContributions = <FontAwesomeIcon icon={faSpinner} spin />;
  if (
    contributions1Y !== null &&
    contributions1Y !== undefined &&
    preferredCurrency !== null
  ) {
    displayContributions = (
      <Number
        value={contributions1Y.contributions}
        currency={preferredCurrency && preferredCurrency.code}
      />
    );
  }
  return (
    <ContributionsContainer className={smaller ? 'smaller' : 'normal'}>
      <h2>
        <span>Last 12 Months </span> Contributions
      </h2>
      <Num className={smaller ? 'smaller' : 'normal'}>
        {displayContributions}
      </Num>
    </ContributionsContainer>
  );
};
Contributions1Y.defaultProps = { smaller: false };
type Props = {
  smaller: boolean;
};

export default Contributions1Y;
