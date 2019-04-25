import React from 'react';
import { connect } from 'react-redux';
import {
  faSpinner,
  faExclamationTriangle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';
import { H2 } from '../styled/GlobalElements';
import Number from './Number';
import {
  selectCurrentGroupSetupComplete,
  selectCurrentGroupInfoError,
} from '../selectors';

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

export const PortfolioGroupAccuracy = ({
  accuracy,
  loading,
  setupComplete,
  error,
}) => {
  let accuracyDisplay = null;
  if (loading || accuracy === undefined) {
    accuracyDisplay = (
      <div>
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    );
  } else if (error) {
    accuracyDisplay = (
      <div>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          data-tip="Unable to calculate accuracy."
        />
      </div>
    );
  } else {
    if (setupComplete) {
      accuracyDisplay = (
        <Number value={accuracy} percentage decimalPlaces={0} />
      );
    } else {
      accuracyDisplay = (
        <div>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            data-tip="There is no target set for this portfolio, follow the instructions under the Target Portfolio."
          />
        </div>
      );
    }
  }
  return (
    <Accuracy>
      <H2>
        Accuracy&nbsp;
        <FontAwesomeIcon
          icon={faQuestionCircle}
          style={{ fontSize: 12 }}
          data-tip="How close your holdings are to your desired target, where 100% indicates your holdings are perfectly on target."
        />
      </H2>
      {accuracyDisplay}
    </Accuracy>
  );
};

const select = state => ({
  setupComplete: selectCurrentGroupSetupComplete(state),
  error: selectCurrentGroupInfoError(state),
});

export default connect(select)(PortfolioGroupAccuracy);
