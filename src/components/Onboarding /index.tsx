import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import OnboardingProgress from './OnboardingProgress';
import Intro from './Intro';
import { useDispatch, useSelector } from 'react-redux';
import { selectOnboardingStep, selectSettings } from '../../selectors';
import AuthorizationPage from '../../pages/AuthorizationPage';
import { selectRouter } from '../../selectors/router';
import Accounts from '../Accounts/index';
import SetupPortfolios from './SetupPortfolios';
import OnboardingFinished from './OnboardingFinished';
import { push, replace } from 'connected-react-router';
import ChooseMembership from './ChooseMembership';
import { putData } from '../../api';
import { loadSettings } from '../../actions';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 20px 20px 0px 20px;
`;

const Onboarding = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const onboardingStep = useSelector(selectOnboardingStep);
  const router = useSelector(selectRouter);

  const [step, setStep] = useState(onboardingStep ? onboardingStep : 0);

  useEffect(() => {
    let queryStep = router.location.query.step;
    if (queryStep && +queryStep >= 0 && +queryStep < 6 && settings) {
      dispatch(replace('/welcome'));
      setStep(+queryStep);
      let newSettings = { ...settings };
      newSettings.onboarding_status = +queryStep;
      putData('/api/v1/settings/', newSettings)
        .then((res) => {
          dispatch(loadSettings());
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
    // eslint-disable-next-line
  }, [router.location.query.step, onboardingStep]);

  if (step === 6) {
    dispatch(push('/'));
  }

  return (
    <Container>
      {step === 5 && (
        <div
          style={{
            textAlign: 'right',
            marginBottom: '30px',
          }}
        >
          <button onClick={() => dispatch(replace('/welcome?step=6'))}>
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </button>
        </div>
      )}
      <OnboardingProgress currentStep={step} />
      <React.Fragment>
        {step === 0 && <Intro />}
        {step === 1 && <AuthorizationPage onboarding={true} />}
        {step === 2 && <ChooseMembership />}
        {step === 3 && <Accounts />}
        {step === 4 && <SetupPortfolios />}
        {step === 5 && <OnboardingFinished />}
      </React.Fragment>
    </Container>
  );
};

export default Onboarding;
