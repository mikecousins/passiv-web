import React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';
import { H2, H3 } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import { steps } from './Intro';

const Container = styled.div`
  margin-bottom: 50px;
  width: 100%;
`;

const Steps = styled(Grid)`
  grid-gap: 0 !important;
`;

type StepProps = {
  active: boolean;
  done: boolean;
};

const Step = styled.div<StepProps>`
  padding: 5px 0px;
  background-color: ${(props) => (props.done ? 'var(--brand-green)' : 'white')};
  border-bottom: ${(props) => props.active && '3px solid var(--brand-green)'};
  border-right: ${(props) =>
    props.active && '3px solid rgba(100, 100, 111, 0.08)'};

  h2 {
    font-weight: 400;
    text-align: center;
  }
  div {
    font-size: 30px;
    text-align: center;
    color: white;
  }
`;

const StepName = styled(H3)`
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  letter-spacing: 1px;
  margin-top: 5px;
`;

type Props = {
  currentStep: number;
};
const OnboardingProgress = ({ currentStep }: Props) => {
  return (
    <Container>
      <Steps columns="1fr 1fr 1fr 1fr">
        {steps.map((step, index) => {
          const active = index + 1 === currentStep;
          const done = index + 1 < currentStep;
          return (
            <div>
              <Step active={active} done={done}>
                {done ? (
                  <div>
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                ) : (
                  <H2>{index + 1}</H2>
                )}
              </Step>
              <StepName>{step.name}</StepName>
            </div>
          );
        })}
      </Steps>
    </Container>
  );
};

export default OnboardingProgress;
