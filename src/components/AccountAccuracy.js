import React from 'react';
import { connect } from 'react-redux';
import { faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { H2} from '../styled/GlobalElements';
import styled from '@emotion/styled';
import Number from './Number';
import { selectCurrentGroupSetupComplete } from '../selectors';

export const Accuracy = styled.div`
  text-align: center;
  font-size: 34px;
  font-weight: 600;
  background: var(--brand-grey);
  border-radius: 4px;
  box-shadow: var(--box-shadow);
  padding: 20px 20px 20px;
  margin-bottom: 20px;
  color: var(--brand-green);
  h2 {
    color: #fff;
    font-size: 22px;
    margin-bottom: 20px;
    text-align: center;
  }
  div {
    margin-bottom: 8px;
    justify-content: flex-start;
    margin-right: 10px;
  }
`;

const AccountAccuracy = (props) => {
  return (

    <Accuracy>
      <H2>Accuracy</H2>
      {!props.accuracy && <div><FontAwesomeIcon icon={faSpinner} spin /></div>}
      {props.setupComplete && props.accuracy &&
      <Number value={props.accuracy} percentage decimalPlaces={0} />}
      {!props.setupComplete && props.accuracy && <div><FontAwesomeIcon icon={faExclamationTriangle} /></div>}
    </Accuracy>
  )

};

const select = state => ({
  setupComplete: selectCurrentGroupSetupComplete(state),
});

export default connect(select)(AccountAccuracy);
