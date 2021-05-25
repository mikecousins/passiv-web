import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import OnboardingProgress from './OnboardingProgress';
import Intro from './Intro';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from '../../selectors';
import AuthorizationPage from '../../pages/AuthorizationPage';
import { selectRouter } from '../../selectors/router';
import Accounts from '../Accounts/index';

const Container = styled.div`
  padding: 20px 20px 0px 20px;
`;

const Onboarding = () => {
  const hasConnection = useSelector(selectIsAuthorized);
  const [step, setStep] = useState(1);
  const router = useSelector(selectRouter);

  useEffect(() => {
    const queryStep = router.location.query.step;
    if (queryStep) {
      setStep(+queryStep);
    } else if (hasConnection) {
      setStep(3);
    }
  }, [hasConnection]);

  console.log(step);

  return (
    <Container>
      <OnboardingProgress currentStep={step} />
      {step === 1 && <Intro handleNextStep={() => setStep(step + 1)} />}
      {step === 2 && (
        <AuthorizationPage
          onboarding={true}
          handleLastStep={() => setStep(step - 1)}
        />
      )}
      {step === 3 && <Accounts />}
      {step === 4 && <div></div>}
    </Container>
  );
};

export default Onboarding;
