import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import OnboardingProgress from './OnboardingProgress';
import Intro from './Intro';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsAuthorized,
  selectOnboardingStep,
  selectSettings,
} from '../../selectors';
import AuthorizationPage from '../../pages/AuthorizationPage';
import { selectRouter } from '../../selectors/router';
import Accounts from '../Accounts/index';
import SetupPortfolios from './SetupPortfolios';
import OnboardingFinished from './OnboardingFinished';
import { push, replace } from 'connected-react-router';
import { selectDashboardGroups } from '../../selectors/groups';
import ChooseMembership from './ChooseMembership';
import { putData } from '../../api';
import { loadSettings } from '../../actions';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 20px 20px 0px 20px;
`;

const Onboarding = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const onboardingStep = useSelector(selectOnboardingStep);
  const router = useSelector(selectRouter);
  const groups = useSelector(selectDashboardGroups);
  const hasConnection = useSelector(selectIsAuthorized);

  const [step, setStep] = useState(onboardingStep);
  const [loading, setLoading] = useState(false);

  //TODO: MAKE THIS A SELECTOR (can be use in DashboardPage.tsx as well)
  let anySetupRemaining = false;
  let groupsSetupStatus = groups.map((group) => group.setupComplete);
  const verifyAnyFalse = (currentValue: any) => currentValue === false;

  anySetupRemaining = groupsSetupStatus.some(verifyAnyFalse);

  useEffect(() => {
    let queryStep = router.location.query.step;
    if (queryStep && settings) {
      dispatch(replace('/welcome'));
      let newSettings = { ...settings };
      newSettings.onboarding_status = +queryStep;
      setLoading(true);
      putData('/api/v1/settings/', newSettings)
        .then((res) => {
          dispatch(loadSettings());
          setStep(res.data.onboarding_status);
          setLoading(false);
          if (res.data.onboarding_status === 4) {
            setTimeout(() => {
              dispatch(push('/dashboard'));
            }, 100);
          }
        })
        .catch(() => {
          toast.error('Unable to update onboarding status. Please try again.');
        });
    }
    // if (!hasConnection && +queryStep > 1) {
    //   dispatch(replace('/welcome?step=1'));
    //   setStep(1);
    // } else if (hasConnection && anySetupRemaining && +queryStep > 4) {
    //   dispatch(replace('/welcome?step=4'));
    //   setStep(4);
    // } else if (hasConnection && anySetupRemaining) {
    //   setStep(4);
    // } else if (hasConnection && !anySetupRemaining) {
    //   setStep(5);
    // } else if (queryStep) {
    //   setStep(+queryStep);
    // }
    // eslint-disable-next-line
  }, [router.location.query.step, onboardingStep]);
  console.log('step', step, 'api step', onboardingStep);

  return (
    <Container>
      <OnboardingProgress currentStep={step ? step : 0} />
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <React.Fragment>
          {step === 0 && <Intro />}
          {step === 1 && <AuthorizationPage onboarding={true} />}
          {step === 2 && <ChooseMembership />}
          {step === 3 && <Accounts />}
          {step === 4 && <SetupPortfolios />}
          {step === 5 && <OnboardingFinished />}
        </React.Fragment>
      )}
    </Container>
  );
};

export default Onboarding;
