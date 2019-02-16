import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { selectTotalGroupHoldings, selectIsDemoMode } from '../selectors';
import styled from '@emotion/styled';
import Number from './Number';

export const TotalContainer = styled.div`
  text-align: right;
  margin-bottom: 22px;
  padding: 10px 0 20px;

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
    text-align: right;
    color: #787878;
    display: block;
    margin-bottom: 12px;
    text-transform: uppercase;
  }
`;

const TotalHoldings = (props) => {
  const { demoMode, totalHoldings } = props;
  let displayTotal = <FontAwesomeIcon icon={faSpinner} spin />;
  if (demoMode) {
    displayTotal = <span>$-------.--</span>;
  } else if (totalHoldings) {
    displayTotal = <Number value={totalHoldings} currency />;
  }
  return (
    <TotalContainer>
      <h2>Total Holdings</h2>
      <span>{displayTotal}</span>
    </TotalContainer>
  );
}

const select = state => ({
  totalHoldings: selectTotalGroupHoldings(state),
  demoMode: selectIsDemoMode(state),
});

export default connect(select)(TotalHoldings);
