import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { selectContributions1Y } from '../../../selectors/performance';
import Number from '../../Number';

export const ContributionsContainer = styled.div`
  text-align: right;
  margin-bottom: 22px;
  padding: 10px 0 20px;
  @media (max-width: 900px) {
    padding: 10px 0;
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
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0.8px;
  color: #000a12;
`;

export const Contributions1Y = () => {
  const contributions1Y = useSelector(selectContributions1Y);
  let displayContributions = <FontAwesomeIcon icon={faSpinner} spin />;
  if (contributions1Y !== null && contributions1Y !== undefined) {
    displayContributions = (
      <Number value={contributions1Y.contributions} currency />
    );
  }
  return (
    <ContributionsContainer>
      <h2>
        <span>Last 12 Months </span> Contributions
      </h2>
      <Num>{displayContributions}</Num>
    </ContributionsContainer>
  );
};

export default Contributions1Y;
