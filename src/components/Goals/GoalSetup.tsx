import styled from '@emotion/styled';
import React, { useState } from 'react';
import { P, H1 } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import { Label, InputPrimary, Select } from '../../styled/Form';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroups } from '../../selectors/groups';
import { postData } from '../../api';
import { formattedToday } from '../Performance/DatePickers';
import { loadGoals } from '../../actions/goals';
import { selectSettings } from '../../selectors';
import ShadowBox from '../../styled/ShadowBox';

// import { getData, postData } from '../../api';

const HeaderBanner = styled.div`
  margin-bottom: 30px;
  h1 {
    margin-bottom: 10px;
    line-height: 1;
  }
  p {
    margin-bottom: 0;
    span {
      font-weight: 700;
      font-size: 14px;
      margin-left: 5px;
      display: inline-block;
    }
  }
`;
const InputPrimaryDate = styled(InputPrimary)`
  max-width: 300px;
`;
const ButtonNext = styled(Button)`
  color: #fff;
  z-index: 2;
  margin-right: 6px;
  font-size: 20px;
  &.selected {
    color: #000;
  }
`;
const ButtonGhost = styled(Button)`
  color: var(--brand-blue);
  z-index: 2;
  margin-bottom: 20px;
  background: none;
  border: 1px solid var(--brand-blue);
  font-size: 20px;
  border-radius: 0;
  &.selected {
    background: var(--brand-green);
    color: #fff;
    border: 1px solid var(--brand-green);
  }
`;
const LabelGoal = styled(Label)`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 15px;
  letter-spacing: 0.04rem;
`;
const FormWrapper = styled.div`
  max-width: 760px;
  margin: 20px 0;
`;
const ShadowBoxRelative = styled(ShadowBox)`
  position: relative;
`;
const Plant = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: auto;
  display: block;
  background: none;
  transition: height 0.25s;
  width: 200px;
  height: 55px;
`;
const Plant1 = styled(Plant)`
  height: 55px;
`;
const Plant2 = styled(Plant)`
  height: 155px;
`;
const Plant3 = styled(Plant)`
  height: 255px;
`;
const Stem = styled.div`
  position: absolute;
  width: 6px;
  height: 100%;
  left: 49%;
  bottom: 0;
  background: var(--brand-green);
  animation-duration: 1.2s !important;
  animation-fill-mode: forwards;
`;
const Leaf = styled.div`
  position: relative;
  width: 63px;
  height: 34px;
  border-radius: 15em 50% 14em;
  background: var(--brand-green);
  animation-duration: 1.2s !important;
  animation-fill-mode: forwards;
`;
const Leaf01 = styled(Leaf)`
  top: 70%;
  left: 50%;
  transform: rotate(-4deg);
`;
const Leaf02 = styled(Leaf)`
  top: 60%;
  right: 50%;
  transform: rotate(227deg);
`;
const Leaf03 = styled(Leaf)`
  width: 48px;
  height: 44px;
  border-radius: 18em 9% 15em;
  top: 55%;
  left: 24%;
  transform: rotate(-12deg);
`;
const Leaf04 = styled(Leaf)`
  width: 50px;
  height: 34px;
  border-radius: 15em 50% 14em;
  top: 34%;
  right: 8%;
  transform: rotate(261deg);
`;
const Leaf05 = styled(Leaf)`
  width: 63px;
  height: 34px;
  top: -25px;
  right: 8px;
  transform: rotate(-28deg);
`;
const Leaf06 = styled(Leaf)`
  top: -44px;
  left: -34px;
  transform: rotate(253deg);
  width: 39px;
  height: 24px;
`;
const PortfolioGroupButtons = ({
  portfolioGroupId,
  setPortfolioGroupId,
}: any) => {
  const portfolioGroups = useSelector(selectGroups);
  const buttons: any[] = [];

  portfolioGroups?.forEach(portfolioGroup => {
    buttons.push(
      <ButtonGhost
        className={portfolioGroupId === portfolioGroup.id ? 'selected' : 'none'}
        onClick={
          portfolioGroupId === portfolioGroup.id
            ? () => setPortfolioGroupId(null)
            : () => setPortfolioGroupId(portfolioGroup.id)
        }
        value={portfolioGroup.id}
      >
        {portfolioGroup.name}
      </ButtonGhost>,
    );
  });
  if (portfolioGroups === null || portfolioGroups === undefined) {
    return null;
  }
  return <div>{buttons}</div>;
};

export const GoalNaming = ({ setCurrentStep, setGoalName, goalName }: any) => {
  const handleChange = (e: any) => {
    setGoalName(e.target.value);
  };

  return (
    <React.Fragment>
      <FormWrapper>
        <LabelGoal htmlFor="goalname">What is your saving goal? </LabelGoal>
        <InputPrimary
          type="text"
          id="goalname"
          onChange={handleChange}
          value={goalName}
        />
        <ButtonNext onClick={() => setCurrentStep('portfolioGroups')}>
          Next
        </ButtonNext>
      </FormWrapper>
    </React.Fragment>
  );
};

export const SelectPortfolioGroups = ({
  setCurrentStep,
  setPortfolioGroupId,
  portfolioGroupId,
}: any) => {
  return (
    <FormWrapper>
      <LabelGoal>
        Is this goal for a specific Portfolio Group? (Optional){' '}
      </LabelGoal>
      <PortfolioGroupButtons
        setPortfolioGroupId={setPortfolioGroupId}
        portfolioGroupId={portfolioGroupId}
      />
      <ButtonNext onClick={() => setCurrentStep('setGoals')}>Next</ButtonNext>
    </FormWrapper>
  );
};

export const SetGoals = ({
  finishSetup,
  setContributionTarget,
  setTotalValueTarget,
  setTargetDate,
  targetDate,
  contributionFrequency,
  setContributionFrequency,
}: any) => {
  const [investmentChecked, setInvestmentChecked] = useState(true);
  const [contributionChecked, setContributionChecked] = useState(true);
  const handleTotalTargetChange = (e: any) => {
    setTotalValueTarget(e.target.value);
  };
  const handleContributionChange = (e: any) => {
    setContributionTarget(e.target.value);
  };
  const handleDateChange = (e: any) => {
    setTargetDate(e.target.value);
  };
  const handleInvestmentCheck = () => {
    setInvestmentChecked(!investmentChecked);
  };
  const handleContributionCheck = (e: any) => {
    setContributionChecked(!contributionChecked);
  };
  const handleContributionFrequencyChange = (e: any) => {
    setContributionFrequency(e.target.value);
  };

  return (
    <FormWrapper>
      <div>
        <Label>When do you want to reach your goal? </Label>
        <InputPrimaryDate
          type="date"
          value={targetDate}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <input
          type="checkbox"
          checked={contributionChecked}
          onClick={handleContributionCheck}
        />{' '}
        <LabelGoal>Total Holdings</LabelGoal>
      </div>
      <div>
        <Label>What is your total $ goal? </Label>
        <InputPrimary
          type="number"
          min={0}
          onChange={handleTotalTargetChange}
          disabled={!investmentChecked}
        />
      </div>
      <div>
        <input
          type="checkbox"
          checked={contributionChecked}
          onClick={handleContributionCheck}
        />{' '}
        <LabelGoal>Contributions</LabelGoal>
      </div>
      <div>
        <Label>How often do you want to contribute to you goal? </Label>
        <Select
          disabled={!contributionChecked}
          onChange={handleContributionFrequencyChange}
          value={contributionFrequency}
        >
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="semiannually">Semiannually</option>
          <option value="annually">Annually</option>
        </Select>
      </div>
      <div>
        <Label>
          To Reach this Goal, how much do you want to contribute each period?{' '}
        </Label>
        <InputPrimary
          type="number"
          min={0}
          onChange={handleContributionChange}
          disabled={!contributionChecked}
        />
      </div>
      <ButtonNext onClick={() => finishSetup()}>Finish</ButtonNext>
    </FormWrapper>
  );
};

export const GoalSetup = ({ setGoalMode }: any) => {
  const [currentStep, setCurrentStep] = useState('naming');
  const [goalName, setGoalName] = useState('New Goal');
  const [totalValueTarget, setTotalValueTarget] = useState(0);
  const [contributionTarget, setContributionTarget] = useState(0);
  const [targetDate, setTargetDate] = useState(formattedYearFromNow());
  const [portfolioGroupId, setPortfolioGroupId] = useState<string | null>(null);
  const [contributionFrequency, setContributionFrequency] = useState('monthly');
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const currency = settings?.preferred_currency;

  const goalData = {
    goalName,
    totalValueTarget,
    contributionTarget,
    portfolioGroupId,
    targetDate,
    contributionFrequency,
    currency,
  };

  const finishSetup = () => {
    postData('/api/v1/goals/', goalData)
      .then(() => dispatch(loadGoals()))
      .catch(error => console.log(error));
    setGoalMode('view');
  };

  return (
    <React.Fragment>
      <HeaderBanner>
        <H1>Goal Setup</H1>
        <P>
          “If a goal is worth having, it’s worth blocking out the time in your
          day to day life necessary to achieve it.” <span>Jill Koenig</span>
        </P>
      </HeaderBanner>
      <ShadowBoxRelative>
        {currentStep === 'naming' && (
          <GoalNaming
            setCurrentStep={setCurrentStep}
            setGoalName={setGoalName}
            goalName={goalName}
          />
        )}
        {currentStep === 'portfolioGroups' && (
          <SelectPortfolioGroups
            setCurrentStep={setCurrentStep}
            portfolioGroupId={portfolioGroupId}
            setPortfolioGroupId={setPortfolioGroupId}
          />
        )}
        {currentStep === 'setGoals' && (
          <SetGoals
            finishSetup={finishSetup}
            setTotalValueTarget={setTotalValueTarget}
            setContributionTarget={setContributionTarget}
            setTargetDate={setTargetDate}
            targetDate={targetDate}
            contributionFrequency={contributionFrequency}
            setContributionFrequency={setContributionFrequency}
          />
        )}
        <Plant1>
          <Stem>
            {currentStep === 'naming' && (
              <>
                <Leaf05></Leaf05>
                <Leaf06></Leaf06>
              </>
            )}
            {currentStep === 'portfolioGroups' && (
              <>
                <Leaf05></Leaf05>
                <Leaf06></Leaf06>
              </>
            )}
            {currentStep === 'setGoals' && (
              <>
                <Leaf05></Leaf05>
                <Leaf06></Leaf06>
              </>
            )}
          </Stem>
        </Plant1>
      </ShadowBoxRelative>
    </React.Fragment>
  );
};

export default GoalSetup;

export const formattedYearFromNow = () => {
  const today = formattedToday();
  const lastYear = parseInt(today.substr(0, 4)) + 1;

  return lastYear.toString() + today.substr(4);
};
