import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import OnboardingProgress from './OnboardingProgress';
import Intro from './Intro';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from '../../selectors';
import ConnectBrokerage from '../ConnectBrokerage';

const Container = styled.div`
  padding: 20px 20px 0px 20px;
`;

const Onboarding = () => {
  const hasConnection = useSelector(selectIsAuthorized);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (hasConnection) {
      setStep(3);
    }
  }, []);

  return (
    <Container>
      <OnboardingProgress currentStep={step} />
      {step === 1 && <Intro handleNextStep={() => setStep(step + 1)} />}
      {step === 2 && <ConnectBrokerage />}
    </Container>
  );
};

export default Onboarding;
