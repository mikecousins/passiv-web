import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBrokerages } from '../selectors';
import AuthorizationPicker from './AuthorizationPicker';
import ShadowBox from '../styled/ShadowBox';
import {
  StepQuestion,
  StepButton,
  SmallStepButton,
  Step,
  WhyQuestrade,
} from '../styled/SignupSteps';
import { Table, H1, P, A, UL } from '../styled/GlobalElements';

const QuestradeAuthorizationPicker = () => {
  const [answered, setAnswered] = useState(false);
  const [haveQuestrade, setHaveQuestrade] = useState(false);

  const brokerages = useSelector(selectBrokerages);

  if (!brokerages) {
    return null;
  }

  const questrade = brokerages.find((b) => b.name === 'Questrade');

  if (!questrade) {
    return null;
  }

  const questradeId = questrade.id;

  const questradeDefaultType = questrade.authorization_types.find(
    (t) => t.type === 'read',
  )
    ? 'read'
    : '';

  let nextPage = null;
  if (haveQuestrade) {
    nextPage = (
      <Table spaceAround>
        <SmallStepButton onClick={() => setAnswered(false)}>
          Back
        </SmallStepButton>
        <AuthorizationPicker
          allowSelect={false}
          brokerage={questradeId}
          type={questradeDefaultType}
        />
      </Table>
    );
  } else {
    nextPage = (
      <React.Fragment>
        <WhyQuestrade>
          <P color="white">
            Not with{' '}
            <A
              href="https://www.questrade.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Questrade
            </A>
            ? Here’s why you should be:
          </P>
          <UL color="white">
            <li>Free purchasing of ETFs</li>
            <li>Low commissions (just $4.95 - $9.95)</li>
            <li>
              They’ll rebate the transfer fee (max. $150) when you make the
              switch.
            </li>
          </UL>
        </WhyQuestrade>
        <Table spaceAround>
          <SmallStepButton onClick={() => setAnswered(false)}>
            Back
          </SmallStepButton>
          <StepButton
            blue
            onClick={() => {
              window.location.assign(
                'https://www.questrade.com/account-selection?oaa_promo=passiv',
              );
              return null;
            }}
          >
            Open an Account
          </StepButton>
        </Table>
      </React.Fragment>
    );
  }
  return (
    <ShadowBox background="var(--brand-grey)">
      <H1 color="white">SETUP</H1>
      <Step>Step 1 - Connect Questrade</Step>
      {answered ? (
        nextPage
      ) : (
        <React.Fragment>
          <StepQuestion>Do you have a Questrade account?</StepQuestion>
          <Table spaceAround>
            <SmallStepButton
              onClick={() => {
                setAnswered(true);
                setHaveQuestrade(false);
              }}
            >
              No
            </SmallStepButton>
            <StepButton
              onClick={() => {
                setAnswered(true);
                setHaveQuestrade(true);
              }}
            >
              Yes
            </StepButton>
          </Table>
        </React.Fragment>
      )}
    </ShadowBox>
  );
};

export default QuestradeAuthorizationPicker;
