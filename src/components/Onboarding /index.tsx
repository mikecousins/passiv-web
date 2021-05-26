import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import OnboardingProgress from './OnboardingProgress';
import Intro from './Intro';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthorized } from '../../selectors';
import AuthorizationPage from '../../pages/AuthorizationPage';
import { selectRouter } from '../../selectors/router';
import Accounts from '../Accounts/index';
import SetupPortfolios from './SetupPortfolios';
import OnboardingFinished from './OnboardingFinished';
import { replace } from 'connected-react-router';
import { selectDashboardGroups } from '../../selectors/groups';

const Container = styled.div`
  padding: 20px 20px 0px 20px;
`;

const Onboarding = () => {
  const dispatch = useDispatch();
  const hasConnection = useSelector(selectIsAuthorized);
  const [step, setStep] = useState(1);
  const router = useSelector(selectRouter);
  const groups = useSelector(selectDashboardGroups);

  //TODO: MAKE THIS A SELECTOR (can be use in DashboardPage.tsx as well)
  let anySetupRemaining = false;
  let groupsSetupStatus = groups.map((group) => group.setupComplete);
  const verifyAnyFalse = (currentValue: any) => currentValue === false;

  anySetupRemaining = groupsSetupStatus.some(verifyAnyFalse);

  useEffect(() => {
    const queryStep = router.location.query.step;
    if (!hasConnection && +queryStep > 2) {
      dispatch(replace('/welcome?step=2'));
      setStep(2);
    } else if (queryStep) {
      setStep(+queryStep);
    } else if (hasConnection && anySetupRemaining) {
      setStep(4);
    } else if (hasConnection && !anySetupRemaining) {
      setStep(5);
    }
    // eslint-disable-next-line
  }, [hasConnection, router.location.query.step]);

  return (
    <Container>
      <OnboardingProgress currentStep={step} />
      {step === 1 && <Intro />}
      {step === 2 && <AuthorizationPage onboarding={true} />}
      {step === 3 && <Accounts />}
      {step === 4 && <SetupPortfolios />}
      {step === 5 && <OnboardingFinished />}
    </Container>
  );
};

export default Onboarding;
