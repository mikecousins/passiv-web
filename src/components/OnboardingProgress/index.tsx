import React from 'react';
import { useSelector } from 'react-redux';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectShowProgressFeature } from '../../selectors';

type Props = {
  step: number;
};

const OnboardingProgress = ({ step }: Props) => {
  const showProgressFeature = useSelector(selectShowProgressFeature);
  if (showProgressFeature) {
    return (
      <div>
        <div>
          {step === 1 && (
            <FontAwesomeIcon icon={faCheck} data-testid="welcome-selected" />
          )}
          Welcome
        </div>
        <div>
          {step === 2 && (
            <FontAwesomeIcon icon={faCheck} data-testid="connect-selected" />
          )}
          Connect
        </div>
        <div>
          {step === 3 && (
            <FontAwesomeIcon icon={faCheck} data-testid="group-selected" />
          )}
          Group
        </div>
        <div>
          {step === 4 && (
            <FontAwesomeIcon icon={faCheck} data-testid="targets-selected" />
          )}
          Targets
        </div>
        <div>
          {step === 5 && (
            <FontAwesomeIcon icon={faCheck} data-testid="summary-selected" />
          )}
          Summary
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default OnboardingProgress;
