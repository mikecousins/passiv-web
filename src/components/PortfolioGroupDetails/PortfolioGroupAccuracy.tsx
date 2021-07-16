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
import { selectSettings } from '../../selectors';

type AccuracyType = {
  belowThreshold: boolean;
};
const Accuracy = styled.div<AccuracyType>`
  text-align: center;
  font-size: 34px;
  font-weight: 600;
  background: var(--brand-grey);
  border-radius: 4px;
  box-shadow: var(--box-shadow);
  padding: 20px 20px 20px;
  margin-bottom: 20px;
  color: ${(props) =>
    props.belowThreshold ? 'var(--brand-orange)' : 'var(--brand-green)'};
  display: block;
  h2 {
    color: #fff;
    font-size: 22px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const Mask = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  width: 200px;
  height: 100px;
  margin: 20px auto 10px;
`;

type SemiCircleType = {
  belowThreshold: boolean;
};
const SemiCircle = styled.div<SemiCircleType>`
  position: relative;
  display: block;
  width: 200px;
  height: 100px;
  background: ${(props) =>
    props.belowThreshold ? 'var(--brand-orange)' : 'var(--brand-green)'};
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

const SemiCircleMask = styled.div<GaugeProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 201px;
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
    width: 200px;
    height: 100px;
    background: #fff;
    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
  }
`;

const PercentBox = styled.div`
  margin-top: -49px;
  position: relative;
  z-index: 2;
`;

type Props = {
  accuracy: number | null;
  loading: boolean;
  tourClass?: string;
};

const PortfolioGroupAccuracy = ({ accuracy, loading, tourClass }: Props) => {
  const setupComplete = useSelector(selectCurrentGroupSetupComplete);
  const error = useSelector(selectCurrentGroupInfoError);
  const settings = useSelector(selectSettings);
  const belowDriftThreshold =
    settings && settings.receive_drift_notifications && accuracy
      ? accuracy < +settings?.drift_threshold
      : false;

  let accuracyDisplay = null;
  let explanation = '';
  if (error || accuracy === null) {
    explanation = 'Unable to calculate accuracy';
    accuracyDisplay = (
      <div>
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </div>
    );
  } else if (loading) {
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
      if (belowDriftThreshold) {
        explanation = 'Accuracy is below drift threshold';
        accuracyDisplay = (
          <div>
            <Number value={accuracy} percentage decimalPlaces={0} />
          </div>
        );
      }
    } else {
      explanation = 'There is no target set for this portfolio';
      accuracyDisplay = (
        <div>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      );
    }
  }
  return (
    <Accuracy
      className={tourClass}
      belowThreshold={
        belowDriftThreshold || accuracy === null || !setupComplete
      }
    >
      <H2>
        Accuracy&nbsp;
        <Tooltip
          label="How close your holdings are to your desired target, where 100% indicates
      your holdings are perfectly on target."
        >
          <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 12 }} />
        </Tooltip>
      </H2>

      <Mask>
        <SemiCircle
          belowThreshold={
            belowDriftThreshold || accuracy === null || !setupComplete
          }
        ></SemiCircle>
        <SemiCircleMask
          accuracy={setupComplete === true ? accuracy : null}
        ></SemiCircleMask>
      </Mask>

      <PercentBox>
        {accuracyDisplay}
        <small style={{ fontSize: '12px' }}>{explanation}</small>
      </PercentBox>
    </Accuracy>
  );
};

export default PortfolioGroupAccuracy;
