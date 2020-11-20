import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { MockGoal } from '../components/Goals/Goals';
import { toDollarString } from '../components/Performance/Performance';
import { selectCurrentGoalId, selectGoals } from '../selectors/goals';
import {
  selectDashboardGroups,
  selectTotalGroupHoldings,
} from '../selectors/groups';
import {
  FrequencyChooser,
  getTargetDate,
  GoalDateSelector,
} from '../components/Goals/GoalSetup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { H1, P, H3, A, Edit } from '../styled/GlobalElements';
import { InputPrimary } from '../styled/Form';
import Grid from '../styled/Grid';
import ShadowBox from '../styled/ShadowBox';
import GoalProjectionLineChart from '../components/Goals/GoalProjectionLineChart';
import { deleteGoal, loadGoals } from '../actions/goals';
import { Button } from '../styled/Button';
import { patchData } from '../api';

const GoalProjectionContainer = styled.div`
  padding-bottom: 80px;
`;
const BackLink = styled(Link)`
  color: var(--brand-blue);
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.05rem;
  font-size: 1.2rem;
  margin-bottom: 20px;
  display: block;
`;
const HeaderBanner = styled.div`
  margin-bottom: 30px;
  h1 {
    margin-bottom: 10px;
    line-height: 1;
    display: inline-block;
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
const Summary = styled(Grid)`
  text-align: center;
  p {
    color: #fff;
    font-size: 20px;
  }
  h3 {
    font-size: 20px;
  }
`;
const ChangeContainer = styled(Grid)`
  align-items: center;
`;
const NumInput = styled(InputPrimary)`
  border-bottom: 2px solid var(--brand-blue);
  max-width: 100px;
  margin: 0 20px 0 0;
  padding: 0;
  font-size: 28px;

  &:focus {
    border: none;
    border-bottom: 2px solid var(--brand-blue);
  }
`;
const DateInput = styled(InputPrimary)`
  border-bottom: 2px solid var(--brand-blue);
  max-width: 220px;
  margin: 0 20px;
  padding: 0;
  font-size: 28px;

  &:focus {
    border: none;
    border-bottom: 2px solid var(--brand-blue);
  }
`;
const ReturnInput = styled(InputPrimary)`
  border-bottom: 2px solid var(--brand-blue);
  max-width: 60px;
  margin: 0 0 0 20px;
  padding: 0;
  font-size: 28px;

  &:focus {
    border: none;
    border-bottom: 2px solid var(--brand-blue);
  }
`;
const Question = styled.div`
  font-size: 28px;
  max-width: 530px;
  line-height: 2.5;
  margin-bottom: 20px;
  select {
    margin: 0 20px 0 0;
    border-color: #003ba2;
    background-size: 8px 5px, 5px 5px, 1.8em 3.5em;
  }
`;
const Tip = styled.div`
  font-size: 14px;
  max-width: 295px;
  padding-top: 30px;
`;
const Delete = styled.button`
  svg {
    margin-right: 5px;
  }
`;

const daysBetween = (firstDate: Date, secondDate: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(
    firstDate.getFullYear(),
    firstDate.getMonth(),
    firstDate.getDate(),
  );
  const utc2 = Date.UTC(
    secondDate.getFullYear(),
    secondDate.getMonth(),
    secondDate.getDate(),
  );

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const GoalDetailPage = () => {
  // const goalsFeature = useSelector(selectGoalsFeature);
  const dispatch = useDispatch();
  const history = useHistory();
  const goalId = useSelector(selectCurrentGoalId);
  let goal = useSelector(selectGoals).data?.find((x) => x.id === goalId);
  if (goal === undefined) {
    goal = MockGoal;
  }
  const [title, setTitle] = useState(goal?.title);
  const [returnRate, setReturnRate] = useState(goal?.return_rate);
  const [goalTarget, setGoalTarget] = useState(goal?.total_value_target);
  const [contributionTarget, setContributionTarget] = useState(
    parseInt(goal?.contribution_target.toFixed(0)),
  );
  const [contributionFrequency, setContributionFrequency] = useState(
    goal?.contribution_frequency,
  );
  const [month, setMonth] = useState(goal?.target_date.substr(5, 2));
  const [year, setYear] = useState(parseInt(goal?.target_date.substr(0, 4)));
  const groups = useSelector(selectDashboardGroups);
  const group = groups.find((x) => x.id === goal?.portfolio_group?.id);
  let currentValue = useSelector(selectTotalGroupHoldings);
  if (group !== undefined) {
    currentValue = group.totalHoldings;
  }
  let targetValue = goal?.total_value_target;
  if (targetValue === undefined) {
    targetValue = 100;
  }
  let progressPercent = (currentValue / targetValue) * 100;
  if (progressPercent > 100) {
    progressPercent = 100;
  }
  const today = new Date();
  const targetDate = new Date(Date.parse(getTargetDate(year, month)));
  const daysUntilGoalEnd = daysBetween(today, new Date(targetDate));
  const projectedAccountValue = getProjectedValue(
    currentValue,
    returnRate,
    contributionTarget,
    contributionFrequency,
    daysUntilGoalEnd,
  );

  let currentDay = new Date();
  const interval = daysUntilGoalEnd / 300;
  let projectedData = [];
  for (let i = 0; i < 300; i++) {
    const newValue = getProjectedValue(
      currentValue,
      returnRate,
      contributionTarget,
      contributionFrequency,
      daysBetween(today, currentDay),
    );

    projectedData.push([
      new Date(
        currentDay.getFullYear(),
        currentDay.getMonth(),
        currentDay.getDate(),
      ),
      newValue,
    ]);
    currentDay = addDays(currentDay, interval);
  }
  projectedData.push([
    new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate(),
    ),
    projectedAccountValue,
  ]);

  const handleReturnChange = (e: any) => {
    let newValue = e.target.value;
    if (newValue > 40) {
      newValue = 40;
    }
    setReturnRate(newValue);
  };
  const handleContributionFrequencyChange = (e: any) => {
    setContributionFrequency(e.target.value);
  };
  const handleContributionChange = (e: any) => {
    setContributionTarget(e.target.value);
  };

  const handleFocus = (e: any) => e.target.select();
  const handleDelete = () => {
    dispatch(deleteGoal(goalId));
    history.push('/app/goals');
  };
  const handleSave = () => {
    const endDate = getTargetDate(year, month);
    patchData('/api/v1/goals/', {
      title,
      goalTarget,
      endDate,
      contributionFrequency,
      contributionTarget,
      returnRate,
      goalId,
    })
      .then(() => dispatch(loadGoals()))
      .catch((error) => console.log(error));
  };

  const dateChanged = getTargetDate(year, month) !== goal?.target_date;
  const targetChanged = goalTarget !== goal?.total_value_target;
  const returnRateWarning =
    returnRate > 3 &&
    daysBetween(new Date(), new Date(Date.parse(goal?.target_date))) / 365.25 <
      3;

  return (
    <React.Fragment>
      <Grid columns="1fr 1fr">
        <HeaderBanner>
          <BackLink to="/app/goals">
            <FontAwesomeIcon icon={faChevronLeft} /> View all Goals
          </BackLink>
          <GoalTitle title={title} setTitle={setTitle} />
        </HeaderBanner>
        <ShadowBox background="#04a287">
          <Summary columns="1fr 1fr 1fr">
            <P>
              <H3>Goal Progress</H3> ${toDollarString(currentValue)}
            </P>
            <P>
              <H3>Goal Date</H3> {goal?.target_date}
            </P>
            <P>
              <H3>Target</H3> ${toDollarString(targetValue)}
            </P>
          </Summary>
        </ShadowBox>
      </Grid>
      <ShadowBox>
        <ChangeContainer columns="1fr 1fr">
          <div>
            <Question>
              What if I contribute $
              <NumInput
                type="number"
                min={0}
                onChange={handleContributionChange}
                value={contributionTarget}
                onClick={handleFocus}
                placeholder={'0'}
                step={getStep(contributionTarget)}
              />
              every
              <FrequencyChooser
                handleContributionFrequencyChange={
                  handleContributionFrequencyChange
                }
                contributionFrequency={contributionFrequency}
                setup={false}
              ></FrequencyChooser>
              until
              <GoalDateSelector
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
              />
              with an annual return rate of
              <ReturnInput
                type="number"
                min={0}
                max={100}
                onChange={handleReturnChange}
                value={returnRate}
                onClick={handleFocus}
                placeholder={'0'}
              />
              %?
            </Question>
            <Button onClick={handleSave}>Save Changes</Button>

            <Tip>
              <P>
                Learn more about potential return rates <A>Link to article</A>.
              </P>
            </Tip>
          </div>
          <GoalProjectionContainer>
            <GoalProjectionLineChart
              goal={goal}
              targetDate={targetDate}
              currentValue={currentValue}
              projectedValue={projectedAccountValue}
              projectedData={projectedData}
              goalTarget={goalTarget}
              setGoalTarget={setGoalTarget}
            ></GoalProjectionLineChart>
          </GoalProjectionContainer>
        </ChangeContainer>
      </ShadowBox>

      <Delete onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrashAlt} /> Delete {goal?.title}
      </Delete>
    </React.Fragment>
  );
};

export default GoalDetailPage;

const getProjectedValue = (
  currentValue: number,
  returnRate: number,
  contributionAmount: number,
  contributionFrequency: string,
  daysUntilGoalEnd: number,
) => {
  const numPeriods = getNumPeriods(contributionFrequency, daysUntilGoalEnd);
  const yearsLeft = daysUntilGoalEnd / 365.25;
  let endBalance = currentValue * (1 + returnRate / 100) ** yearsLeft;
  for (let i = 0; i < numPeriods; i++) {
    endBalance +=
      contributionAmount *
      (1 + returnRate / 100) **
        (yearsLeft - i / getPeriodsPerYear(contributionFrequency));
  }
  return endBalance;
};

const getNumPeriods = (
  contributionFrequency: string,
  daysUntilGoalEnd: number,
) => {
  let daysInPeriod;
  if (contributionFrequency === 'biweekly') {
    daysInPeriod = 14;
  } else if (contributionFrequency === 'monthly') {
    daysInPeriod = 365.24 / 12;
  } else if (contributionFrequency === 'quarterly') {
    daysInPeriod = 365.24 / 4;
  } else if (contributionFrequency === 'semiannually') {
    daysInPeriod = 365.24 / 2;
  } else if (contributionFrequency === 'annually') {
    daysInPeriod = 365.24;
  } else {
    // Default to monthly
    daysInPeriod = 365.24 / 12;
  }
  const numPeriods = Math.floor(daysUntilGoalEnd / daysInPeriod);
  return numPeriods;
};

const getPeriodsPerYear = (contributionFrequency: string) => {
  let periodsPerYear;
  if (contributionFrequency === 'biweekly') {
    periodsPerYear = 26;
  } else if (contributionFrequency === 'monthly') {
    periodsPerYear = 12;
  } else if (contributionFrequency === 'quarterly') {
    periodsPerYear = 4;
  } else if (contributionFrequency === 'semiannually') {
    periodsPerYear = 2;
  } else if (contributionFrequency === 'annually') {
    periodsPerYear = 1;
  } else {
    // Default to monthly
    periodsPerYear = 12;
  }
  return periodsPerYear;
};

const addDays = (date: Date, daysToAdd: number) => {
  date.setSeconds(date.getSeconds() + daysToAdd * 24 * 60 * 60);
  return date;
};

const getStep = (contributionAmount: number) => {
  if (contributionAmount < 500) {
    return 10;
  } else if (contributionAmount < 1000) {
    return 25;
  } else if (contributionAmount < 2000) {
    return 50;
  } else {
    return 100;
  }
};

const GoalTitle = ({ title, setTitle }: any) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const finishEditing = (newTitle: string) => {
    setTitle(newTitle);
    setEditMode(false);
  };

  if (!editMode) {
    return (
      <div>
        <H1>{title}</H1>
        <Edit onClick={() => setEditMode(true)}>
          <FontAwesomeIcon icon={faPen} />
          Edit Name
        </Edit>
      </div>
    );
  } else {
    return (
      <div>
        <InputPrimary
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        ></InputPrimary>
        <Button onClick={() => finishEditing(newTitle)}>Done</Button>
      </div>
    );
  }
};
