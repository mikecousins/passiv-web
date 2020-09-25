import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGroups } from '../../selectors/groups';
// import { getData, postData } from '../../api';

const Button = styled.button`
  background: #03846d;
  color: #fff;
  z-index: 2;
  border-radius: 4px 4px 4px 4px;
  margin-right: 6px;
  &.selected {
    color: #000;
  }
`;

const PortfolioGroupButtons = ({
  portfolioGroupId,
  setPortfolioGroupId,
}: any) => {
  const portfolioGroups = useSelector(selectGroups);
  const buttons: any[] = [];

  portfolioGroups?.forEach(portfolioGroup => {
    buttons.push(
      <Button
        className={portfolioGroupId === portfolioGroup.id ? 'selected' : 'none'}
        onClick={() => setPortfolioGroupId(portfolioGroup.id)}
        value={portfolioGroup.id}
      >
        {portfolioGroup.name}
      </Button>,
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
      <div>
        Name your goal:{' '}
        <input type="text" onChange={handleChange} value={goalName} />
      </div>

      <Button onClick={() => setCurrentStep('portfolioGroups')}>Next</Button>
    </React.Fragment>
  );
};

export const SelectPortfolioGroups = ({
  setCurrentStep,
  setPortfolioGroupId,
  portfolioGroupId,
}: any) => {
  return (
    <div>
      Portfolio Group:{' '}
      <PortfolioGroupButtons
        setPortfolioGroupId={setPortfolioGroupId}
        portfolioGroupId={portfolioGroupId}
      />
      <Button onClick={() => setCurrentStep('setGoals')}>Next</Button>
    </div>
  );
};

export const SetGoals = ({
  finishSetup,
  setMonthlyContributionTarget,
  setTotalValueTarget,
}: any) => {
  const [investmentChecked, setInvestmentChecked] = useState(true);
  const [contributionChecked, setContributionChecked] = useState(true);
  const handleTotalTargetChange = (e: any) => {
    setTotalValueTarget(e.target.value);
  };
  const handleMonthlyContributionChange = (e: any) => {
    setMonthlyContributionTarget(e.target.value);
  };
  const handleInvestmentCheck = () => {
    setInvestmentChecked(!investmentChecked);
  };
  const handleContributionCheck = (e: any) => {
    setContributionChecked(!contributionChecked);
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          checked={investmentChecked}
          onClick={handleInvestmentCheck}
        />{' '}
        Investment Goal:{' '}
        <input
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
        Target Monthly Contributions:{' '}
        <input
          type="number"
          min={0}
          onChange={handleMonthlyContributionChange}
          disabled={!contributionChecked}
        />
      </div>
      <div>
        To Reach this Goal, I want to Contribute:{' '}
        <select disabled={!contributionChecked}>
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
          <option value="monthly">Bimonthly</option>
          <option value="monthly">Semiannually</option>
          <option value="monthly">Annually</option>
          <option value="none">Whenever I can</option>
        </select>
      </div>
      <Button onClick={() => finishSetup()}>Finish</Button>
    </div>
  );
};

export const GoalSetup = ({ setGoalMode }: any) => {
  const [currentStep, setCurrentStep] = useState('naming');
  const [goalName, setGoalName] = useState('New Goal');
  const [totalValueTarget, setTotalValueTarget] = useState(0);
  const [monthlyContributionTarget, setMonthlyContributionTarget] = useState(0);
  const [portfolioGroupId, setPortfolioGroupId] = useState<string | null>(null);
  const finishSetup = (goalData: any) => {
    // postData('/api/v1/goals/', goalData)
    //  .then(response => dispatch(importTargetSuccess(response)))
    //  .catch(error => dispatch(importTargetError(error)));
    setGoalMode('view');
  };

  return (
    <React.Fragment>
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
          setMonthlyContributionTarget={setMonthlyContributionTarget}
        />
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      Debugging stuff:
      <br />
      Goal Name: {goalName}
      <br />
      Total Val: {totalValueTarget}
      <br />
      Monthly Val: {monthlyContributionTarget}
      <br />
      Portfolio Group: {portfolioGroupId}
    </React.Fragment>
  );
};

export default GoalSetup;
