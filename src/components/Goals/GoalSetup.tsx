import styled from '@emotion/styled';
import React, { useState } from 'react';
import { P, H1 } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import { Label, InputPrimary } from '../../styled/Form';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroups } from '../../selectors/groups';
import { formattedToday } from '../Performance/DatePickers';
import { createGoal } from '../../actions/goals';
import { selectSettings } from '../../selectors';
import ShadowBox from '../../styled/ShadowBox';
import { useHistory } from 'react-router';
import { getTitleToSave } from '../../pages/GoalDetailPage';
import { selectGoals } from '../../selectors/goals';

const HeaderBanner = styled.div`
  margin-bottom: 40px;
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
const GoalInput = styled(InputPrimary)`
  border-bottom: 2px solid var(--brand-blue);
  max-width: 180px;
  margin: 0;
  padding: 0;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0.025em;
  &:focus {
    border: none;
    border-bottom: 2px solid var(--brand-blue);
  }
`;

const NumInput = styled(InputPrimary)`
  border-bottom: 2px solid var(--brand-blue);
  max-width: 100px;
  margin: 0 20px 0 0;
  padding: 0;
  font-size: 28px;
  font-weight: 600;
  &:focus {
    border: none;
    border-bottom: 2px solid var(--brand-blue);
  }
`;

const DurationSelect = styled.select`
  border-bottom: 2px solid #003ba2;
  margin: 15px 10px 0 0;
  font-size: 28px;
  padding-bottom: 0px;
  padding: 0;
  vertical-align: top;
  font-weight: 600;
`;
const MonthSelect = styled.select`
  border-bottom: 2px solid #003ba2;
  margin: 15px 10px 0 10px;
  font-size: 28px;
  padding-bottom: 0px;
  padding: 0;
  vertical-align: top;
  font-weight: 600;
`;

const ButtonPrev = styled.button`
  background-color: lightgrey;
  z-index: 2;
  padding: 6px 20px 7px;
  font-size: 18px;
  border-radius: 4px;
  &.selected {
    color: #000;
  }
`;
const ButtonNext = styled(Button)`
  color: #fff;
  z-index: 2;
  margin-top: 30px;
  padding: 14px 58px 16px;
  font-size: 28px;
  &.selected {
    color: #000;
  }
`;
const ButtonGhost = styled(Button)`
  color: var(--brand-blue);
  z-index: 2;
  background: none;
  border: 1px solid var(--brand-blue);
  font-size: 20px;
  border-radius: 0;
  margin: 0px 0 20px 0;
  &.selected {
    background: var(--brand-grey);
    color: #fff;
    border: 1px solid var(--brand-grey);
  }
`;
const LabelGoal = styled(Label)`
  font-size: 28px;
  font-weight: 500;
  margin: 0 15px 15px 0;
  letter-spacing: 0.04rem;
  display: inline-block;
  small {
    font-size: 0.55em;
  }
`;
const FormWrapper = styled.div`
  max-width: 720px;
  margin: 20px auto;
  text-align: center;
  padding: 40px 0 60px;
  line-height: 2.5;
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

  portfolioGroups?.forEach((portfolioGroup) => {
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

export const GoalNaming = ({
  setCurrentStep,
  setGoalName,
  goalName,
  setGoalMode,
}: any) => {
  const handleChange = (e: any) => {
    setGoalName(e.target.value);
  };

  return (
    <React.Fragment>
      <ButtonPrev onClick={() => setGoalMode('view')}>Back</ButtonPrev>
      <FormWrapper>
        <div>
          <LabelGoal htmlFor="goalname">
            The name of this goal will be
          </LabelGoal>
          <GoalInput
            type="text"
            id="goalname"
            onChange={handleChange}
            value={goalName}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setCurrentStep('portfolioGroups');
              }
            }}
          />
        </div>
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
        I'd like to include these portfolio groups in my goal{' '}
        <small>Optional</small>{' '}
      </LabelGoal>
      <PortfolioGroupButtons
        setPortfolioGroupId={setPortfolioGroupId}
        portfolioGroupId={portfolioGroupId}
      />
      <ButtonNext onClick={() => setCurrentStep('setGoals')}>Next</ButtonNext>
    </FormWrapper>
  );
};

export const GoalDateSelector = ({ month, setMonth, year, setYear }: any) => {
  const currentYear = new Date().getFullYear();
  const handleYearChange = (e: any) => {
    setYear(e.target.value);
  };
  const handleMonthChange = (e: any) => {
    setMonth(e.target.value);
  };

  return (
    <React.Fragment>
      <MonthSelect value={month} onChange={handleMonthChange}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </MonthSelect>
      <NumInput
        type="number"
        min={currentYear}
        max={2200}
        value={year}
        onChange={handleYearChange}
      ></NumInput>
    </React.Fragment>
  );
};

export const SetGoals = ({
  finishSetup,
  setTotalValueTarget,
  month,
  setMonth,
  year,
  setYear,
}: any) => {
  const handleTotalTargetChange = (e: any) => {
    setTotalValueTarget(e.target.value);
  };
  const history = useHistory();

  return (
    <FormWrapper>
      <div>
        <LabelGoal>I want to reach $</LabelGoal>
        <GoalInput type="number" min={0} onChange={handleTotalTargetChange} />
      </div>
      <div>
        <LabelGoal>By</LabelGoal>
        <GoalDateSelector
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />
      </div>
      <ButtonNext onClick={() => finishSetup(history)}>
        Start Saving!
      </ButtonNext>
    </FormWrapper>
  );
};

export const GoalSetup = ({ setGoalMode }: any) => {
  const [currentStep, setCurrentStep] = useState('naming');
  const [goalName, setGoalName] = useState('New Goal');
  const [totalValueTarget, setTotalValueTarget] = useState(0);
  const currentYear = new Date().getFullYear();
  const defaultYear = currentYear + 5;
  const [month, setMonth] = useState(formatted5YearsFromNow().substr(5, 2));
  const [year, setYear] = useState(defaultYear);
  const [portfolioGroupId, setPortfolioGroupId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const goals = useSelector(selectGoals);
  const currency = settings?.preferred_currency;

  const finishSetup = (history: any) => {
    const targetDate = getTargetDate(year, month);
    const titleToSave = getTitleToSave(goalName, goals.data, null);
    let goalData = {
      goalName: titleToSave,
      totalValueTarget,
      portfolioGroupId,
      targetDate,
      currency,
    };
    dispatch(createGoal(goalData, history));
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
        {currentStep !== 'naming' && (
          <ButtonPrev onClick={() => setCurrentStep(previousStep(currentStep))}>
            Previous
          </ButtonPrev>
        )}

        {currentStep === 'naming' && (
          <GoalNaming
            setCurrentStep={setCurrentStep}
            setGoalName={setGoalName}
            goalName={goalName}
            setGoalMode={setGoalMode}
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
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
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

const previousStep = (currentStep: string) => {
  if (currentStep === 'setGoals') {
    return 'portfolioGroups';
  } else {
    return 'naming';
  }
};

export const formatted5YearsFromNow = () => {
  const today = formattedToday();
  const lastYear = parseInt(today.substr(0, 4)) + 5;

  return lastYear.toString() + today.substr(4);
};

export const FrequencyChooser = ({
  handleContributionFrequencyChange,
  contributionFrequency,
  setup,
}: any) => {
  return (
    <React.Fragment>
      {setup && (
        <DurationSelect
          onChange={handleContributionFrequencyChange}
          value={contributionFrequency}
        >
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="semiannually">Semiannually</option>
          <option value="annually">Annually</option>
        </DurationSelect>
      )}
      {!setup && (
        <DurationSelect
          onChange={handleContributionFrequencyChange}
          value={contributionFrequency}
        >
          <option value="biweekly">2 weeks</option>
          <option value="monthly">month</option>
          <option value="quarterly">quarter</option>
          <option value="semiannually">6 months</option>
          <option value="annually">year</option>
        </DurationSelect>
      )}
    </React.Fragment>
  );
};

export const getTargetDate = (year: number, month: string) => {
  let yearString = year.toString();
  while (yearString.length < 4) {
    yearString = '0' + yearString;
  }
  return yearString + '-' + month + '-01';
};
