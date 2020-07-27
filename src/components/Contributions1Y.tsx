import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { selectContributions1Y } from '../selectors/performance';
import Number from './Number';
import { putData } from '../api';
import { loadSettings } from '../actions';
import CurrencySelector from './CurrencySelector';

export const ContributionsContainer = styled.div`
  text-align: left;
  margin-bottom: 22px;
  padding: 10px 0 20px;
  @media (max-width: 900px) {
    padding: 10px 0;
  }
  span {
    font-size: 36px;
    font-weight: 500;
    letter-spacing: 0.8px;
    color: #000a12;
  }

  h2 {
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 0.8px;
    text-align: left;
    color: #787878;
    display: block;
    margin-bottom: 12px;
    text-transform: uppercase;
  }
`;

export const Contributions1Y = () => {
  const contributions1Y = useSelector(selectContributions1Y);
  const dispatch = useDispatch();
  let displayContributions = <FontAwesomeIcon icon={faSpinner} spin />;
  if (contributions1Y !== null && contributions1Y !== undefined) {
    displayContributions = (
      <Number value={contributions1Y.contributions} currency />
    );
  }
  return (
    <ContributionsContainer>
      <h2>Contributions (Last 12 Months)</h2>
      <span>{displayContributions}</span>
    </ContributionsContainer>
  );
};

export default Contributions1Y;
