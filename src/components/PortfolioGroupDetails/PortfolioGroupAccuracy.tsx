import React from 'react';
import { useSelector } from 'react-redux';
import {
  faSpinner,
  faExclamationTriangle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '../Tooltip';
import styled from '@emotion/styled';
import { H2 } from '../../styled/GlobalElements';
import Number from '../Number';
import {
  selectCurrentGroupSetupComplete,
  selectCurrentGroupInfoError,
} from '../../selectors/groups';

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
  display: block;
  h2 {
    color: #fff;
    font-size: 22px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

export const Mask = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  width: 200px;
  height: 100px;
  margin: 20px auto 10px;
`;
export const SemiCircle = styled.div`
  position: relative;
  display: block;
  width: 200px;
  height: 100px;
  background: #04a287;
  border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 2;
    display: block;
    width: 140px;
    height: 70px;
    margin-left: -70px;
    background: #2a2d35;
    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
  }
`;

type GaugeProps = {
  accuracy: number | null;
};

export const SemiCircleMask = styled.div<GaugeProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 202px;
  background: transparent;

  //This transform deg is what needs to be changed based on percentage
  transform: rotate(
      ${(props: GaugeProps) =>
        String(props.accuracy == null ? 0 : (props.accuracy / 100) * 180)}deg
    )
    translate3d(0, 0, 0);

  transform-origin: center center;
  backface-visibility: hidden;
  transition: all 0.3s ease-in-out;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0%;
    z-index: 2;
    display: block;
    width: 202px;
    height: 102px;
    margin: -1px 0 0 -1px;
    background: #fff;
    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
  }
`;

export const PercentBox = styled.div`
  margin-top: -49px;
  position: relative;
  z-index: 2;
`;

type Props = {
  accuracy: number | null;
  loading: boolean;
};

export const PortfolioGroupAccuracy = ({ accuracy, loading }: Props) => {
  const setupComplete = useSelector(selectCurrentGroupSetupComplete);
  const error = useSelector(selectCurrentGroupInfoError);

  let accuracyDisplay = null;
  if (error) {
    accuracyDisplay = (
      <div>
        <Tooltip label="Unable to calculate accuracy.">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </Tooltip>
      </div>
    );
  } else if (loading || accuracy === null) {
    accuracyDisplay = (
      <div>
        <FontAwesomeIcon icon={faSpinner} spin />
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
          <Tooltip label="There is no target set for this portfolio, follow the instructions under the Target Portfolio.">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </Tooltip>
        </div>
      );
    }
  }
  return (
    <Accuracy>
      <H2>
        Accuracy&nbsp;
        <Tooltip label="How close your holdings are to your desired target, where 100% indicates your holdings are perfectly on target.">
          <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 12 }} />
        </Tooltip>
      </H2>

      <Mask>
        <SemiCircle></SemiCircle>
        <SemiCircleMask accuracy={accuracy}></SemiCircleMask>
      </Mask>

      <PercentBox>{accuracyDisplay}</PercentBox>
    </Accuracy>
  );
};

export default PortfolioGroupAccuracy;
