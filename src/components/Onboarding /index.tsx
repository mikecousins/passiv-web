import React, { useState } from 'react';
import styled from '@emotion/styled';
import OnboardingProgress from './OnboardingProgress';
import Intro from './Intro';

const Container = styled.div`
  padding: 20px 20px 0px 20px;
`;

const Onboarding = () => {
  const [step, setStep] = useState(1);

  return (
    <Container>
      <OnboardingProgress currentStep={2} />
      {step === 1 && <Intro />}
    </Container>
  );
};

export default Onboarding;
