import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
import {
  faPen,
  faToggleOff,
  faToggleOn,
  faTrashAlt,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import GoalProjectionLineChart from '../components/Goals/GoalProjectionLineChart';
import { deleteGoal, loadGoals } from '../actions/goals';
import { Button } from '../styled/Button';
import { patchData } from '../api';
import { toast } from 'react-toastify';
import { Goal } from '../types/goals';
import { H1, H2, H3, P, A } from '../styled/GlobalElements';
import { InputPrimary } from '../styled/Form';
import Grid from '../styled/Grid';
import ShadowBox from '../styled/ShadowBox';
import { ToggleButton } from '../styled/ToggleButton';
import '@reach/dialog/styles.css';
import { Dialog } from '@reach/dialog';
import { getGroupTotalValue } from '../components/Goals/GoalWidget';

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
  margin-left: -55px;
`;
const HeaderBanner = styled.div`
  margin-bottom: 30px;
  position: relative;
  padding-left: 55px;
  @media (max-width: 1140px) {
    display: block;
  }
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
    margin-bottom: 4px;
    line-height: 1.3;
  }
  h3 {
    font-size: 20px;
    margin-bottom: 4px;
    line-height: 1.3;
  }
`;
const ChangeContainer = styled(Grid)`
  align-items: center;
  position: relative;
  @media (max-width: 1140px) {
    display: block;
  }
`;
const NumInput = styled(InputPrimary)`
  border-bottom: 2px solid var(--brand-blue);
  max-width: 120px;
  margin: 0 16px 0 0;
  padding: 0 0 3px 0;
  font-size: 28px;
  font-weight: 600;
  -webkit-appearance: none;
  border-radius: 0;
  &:focus {
    border: none;
    border-bottom: 2px solid var(--brand-blue);
  }
`;
const ReturnInput = styled(InputPrimary)`
  border-bottom: 2px solid var(--brand-blue);
  max-width: 60px;
  margin: 0 0 0 16px;
  padding: 0 0 3px 0;
  font-size: 28px;
  font-weight: 600;
  -webkit-appearance: none;
  border-radius: 0;
  &:focus {
    border: none;
    border-bottom: 2px solid var(--brand-blue);
  }
`;
const Question = styled.div`
  font-size: 28px;
  max-width: 530px;
  line-height: 2.5;
  margin-bottom: 3rem;
  @media (max-width: 900px) {
    margin-bottom: 1.5rem;
  }
`;
const Tip = styled(P)`
  max-width: 530px;
`;
const NameInput = styled(InputPrimary)`
  font-size: 42px;
  font-weight: 500;
  line-height: 1;
  -webkit-letter-spacing: -1.5px;
  -moz-letter-spacing: -1.5px;
  -ms-letter-spacing: -1.5px;
  letter-spacing: -1.5px;
  color: #2a2d34;
  padding-top: 0;
  padding: 0;
  background: none;
  margin: -4px 0 3px 0;
  border-bottom: 3px solid #023ca2;
  color: #023da2;
  -webkit-appearance: none;
  border-radius: 0;
`;
const Discard = styled(Button)`
  color: var(--brand-blue);
  background: none;
  &:hover {
    text-decoration: underline;
  }
`;
export const ToggleShow = styled(Button)`
  border: 1px solid var(--brand-blue);
  background: none;
  color: var(--brand-blue);
  position: absolute;
  top: 39px;
  left: 0;
  font-size: 1.1rem;
  font-weight: 300;
  padding: 8px 16px;
  background: #fff;
  &:hover {
    background: var(--brand-blue);
    color: #fff;
  }
`;
const DropDown = styled.div`
  border: 1px solid var(--brand-blue);
  position: absolute;
  top: 102%;
  left: 0;
  width: 100%;
  padding: 22px 20px 24px;
  background: #c3e7ff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  font-size: 18px;
  @media (max-width: 900px) {
    top: 112%;
  }
  p {
    margin-bottom: 24px;
  }
  svg {
    margin-right: 12px;
  }
  button {
    &:hover {
      color: #003ba2;
      text-decoration: underline;
    }
  }
`;
const DeleteGoal = styled.button`
  cursor: pointer;
  @media (min-width: 1160px) {
    position: absolute;
    bottom: 23px;
    right: 30px;
  }
  @media (max-width: 1160px) {
    padding-top: 18px;
  }
  &:hover {
    color: #003ba2;
    text-decoration: underline;
  }
`;
const SaveContainer = styled.div`
  position: absolute;
  left: -21px;
  bottom: -21px;
  background: #c3e7ff;
  padding: 26px 26px 20px 20px;
  overflow: hidden;
  border-radius: 0 0 0 4px;
  z-index: 1;
  @media (max-width: 900px) {
    position: fixed;
    width: 100vw;
    left: 0;
    bottom: 0;
  }
`;
const DashboardToggle = styled.div`
  margin-top: 18px;
`;
const ActionContainer = styled.div`
  text-align: center;
  a {
    padding-left: 20px;
  }
`;
const FinishButton = styled.button`
  font-weight: 700;
  color: #023ca2;
`;
const H2Margin = styled(H2)`
  max-width: 500px;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.3;
  text-align: center;
  margin: 0 auto 40px;
  @media (max-width: 900px) {
    font-size: 2rem;
  }
`;
const ToggleDashboard = styled(ToggleButton)`
  font-size: 18px;
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
interface LocationState {
  goal?: any;
}

const GoalDetailPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const goalId = useSelector(selectCurrentGoalId);
  const goals = useSelector(selectGoals);
  const location = useLocation<LocationState>();

  let goal: any = useSelector(selectGoals).data?.find(
    (x: any) => x.id === goalId,
  );
  if (goal === undefined || goal === null) {
    goal = location.state.goal;
  }

  const [title, setTitle] = useState(goal?.title);
  const [displayOnDashboard, setDisplayOnDashboard] = useState(
    goal?.display_on_dashboard,
  );
  const [showOptions, setShowOptions] = useState(false);
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const groups = useSelector(selectDashboardGroups);
  const group = groups.find((x) => x.id === goal?.portfolio_group?.id);
  let currentValue = useSelector(selectTotalGroupHoldings);
  if (group !== undefined) {
    currentValue = getGroupTotalValue(group);
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
  const [projectedAccountValue, principal, interest] = getProjectedValue(
    currentValue,
    returnRate,
    contributionTarget,
    contributionFrequency,
    daysUntilGoalEnd,
  );

  let currentDay = new Date();
  const interval = daysUntilGoalEnd / 300;
  let projectedData = [];
  let principalData = [];
  let interestData = [];
  for (let i = 0; i < 300; i++) {
    const [newProjectedValue, newPrincipal, newInterest] = getProjectedValue(
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
      newProjectedValue,
    ]);
    principalData.push([
      new Date(
        currentDay.getFullYear(),
        currentDay.getMonth(),
        currentDay.getDate(),
      ),
      newPrincipal,
    ]);
    interestData.push([
      new Date(
        currentDay.getFullYear(),
        currentDay.getMonth(),
        currentDay.getDate(),
      ),
      newInterest,
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
  principalData.push([
    new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      currentDay.getDate(),
    ),
    principal,
  ]);
  interestData.push([
    new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      currentDay.getDate(),
    ),
    interest,
  ]);

  const dateChanged = getTargetDate(year, month) !== goal?.target_date;
  const targetChanged = goalTarget !== goal?.total_value_target;
  const contributionsChanged =
    contributionTarget !== parseInt(goal?.contribution_target?.toFixed(0));
  const contributionFrequencyChanged =
    contributionFrequency !== goal?.contribution_frequency;
  const returnRateChanged = returnRate !== goal?.return_rate;
  const titleChanged = title !== goal?.title;
  const displayOnDashboardChanged =
    displayOnDashboard !== goal?.display_on_dashboard;

  const handleReturnChange = (e: any) => {
    let newValue = e.target.value;
    if (newValue > 40) {
      newValue = 40;
    }
    setReturnRate(parseFloat(newValue));
  };
  const handleContributionFrequencyChange = (e: any) => {
    setContributionTarget(
      Math.round(
        contributionTarget *
          getContributionConversion(contributionFrequency, e.target.value),
      ),
    );
    setContributionFrequency(e.target.value);
  };
  const handleContributionChange = (e: any) => {
    setContributionTarget(parseFloat(e.target.value));
  };

  const handleFocus = (e: any) => e.target.select();
  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };
  const handleDelete = () => {
    dispatch(deleteGoal(goalId));
    history.push('/app/goals');
  };
  const handleSave = () => {
    const endDate = getTargetDate(year, month);
    const titleToSave = getTitleToSave(title, goals.data, goalId);
    setTitle(titleToSave);
    patchData('/api/v1/goals/', {
      title: titleToSave,
      goalTarget,
      endDate,
      contributionFrequency,
      contributionTarget,
      returnRate,
      goalId,
      displayOnDashboard,
    })
      .then(() => {
        dispatch(loadGoals());
        toast.success(`'${title}' Successfully Updated`, { autoClose: 3000 });
      })
      .catch((error) => toast.error('Unable to update. Please try again.'));
  };
  const handleDiscard = () => {
    setMonth(goal?.target_date.substr(5, 2));
    setYear(parseInt(goal?.target_date.substr(0, 4)));
    setGoalTarget(goal?.total_value_target);
    setContributionTarget(parseInt(goal?.contribution_target?.toFixed(0)));
    setContributionFrequency(goal?.contribution_frequency);
    setReturnRate(goal?.return_rate);
    setTitle(goal?.title);
    setDisplayOnDashboard(goal?.display_on_dashboard);
  };
  const [editMode, setEditMode] = useState(false);

  return (
    <React.Fragment>
      <Grid columns="1fr 1fr">
        <HeaderBanner>
          <BackLink to="/app/goals">
            <FontAwesomeIcon icon={faChevronLeft} /> View all Goals
          </BackLink>
          <GoalTitle
            title={title}
            setTitle={setTitle}
            editMode={editMode}
            setEditMode={setEditMode}
          />
          <div>
            <ToggleShow onClick={() => setShowOptions(!showOptions)}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </ToggleShow>
            {showOptions && (
              <DropDown>
                {goal?.portfolio_group !== null && (
                  <P>
                    <strong>Included Portfolio(s):</strong>{' '}
                    {goal?.portfolio_group?.name}
                  </P>
                )}
                {goal?.portfolio_group === null && (
                  <P>
                    <strong>Included Portfolio(s):</strong> All Portfolios
                  </P>
                )}
                {!editMode ? (
                  <button onClick={() => setEditMode(true)}>
                    <FontAwesomeIcon icon={faPen} />
                    Edit Name
                  </button>
                ) : (
                  <FinishButton onClick={() => setEditMode(false)}>
                    <FontAwesomeIcon icon={faPen} />
                    Finish Editing
                  </FinishButton>
                )}

                <DashboardToggle
                  onClick={() => setDisplayOnDashboard(!displayOnDashboard)}
                >
                  <ToggleDashboard
                    onClick={() => setDisplayOnDashboard(!displayOnDashboard)}
                  >
                    {displayOnDashboard ? (
                      <React.Fragment>
                        <FontAwesomeIcon icon={faToggleOn} />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <FontAwesomeIcon icon={faToggleOff} />
                      </React.Fragment>
                    )}
                    Display Goal on Dashboard{' '}
                  </ToggleDashboard>
                </DashboardToggle>
                <DeleteGoal onClick={handleDeleteClick}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                  Delete Goal
                </DeleteGoal>
              </DropDown>
            )}
          </div>
        </HeaderBanner>
        <ShadowBox background="#04a287">
          <Summary columns="1fr 1fr 1fr">
            <P>
              <H3>Goal Progress</H3> ${toDollarString(currentValue)}
            </P>
            <P>
              <H3>Goal Date</H3> {goal?.target_date}{' '}
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
                step="any"
                min={0}
                max={100}
                onChange={handleReturnChange}
                value={returnRate}
                onClick={handleFocus}
                placeholder={'0'}
              />
              %?
            </Question>

            {false && (
              <Tip>
                Learn more about potential return rates{' '}
                <A
                  target="_blank"
                  href="https://www.aqr.com/Insights/Research/Alternative-Thinking/2020-Capital-Market-Assumptions-for-Major-Asset-Classes"
                >
                  here
                </A>
                .
              </Tip>
            )}

            {(dateChanged ||
              targetChanged ||
              contributionsChanged ||
              contributionFrequencyChanged ||
              returnRateChanged ||
              titleChanged ||
              displayOnDashboardChanged) && (
              <SaveContainer>
                <Button onClick={handleSave}>Update Goal</Button>
                <Discard onClick={handleDiscard}>Discard Changes</Discard>
              </SaveContainer>
            )}
          </div>
          <GoalProjectionContainer>
            <GoalProjectionLineChart
              goal={goal}
              targetDate={targetDate}
              currentValue={currentValue}
              projectedValue={projectedAccountValue}
              principal={principal}
              interest={interest}
              projectedData={projectedData}
              principalData={principalData}
              interestData={interestData}
              goalTarget={goalTarget}
              setGoalTarget={setGoalTarget}
            ></GoalProjectionLineChart>
          </GoalProjectionContainer>
        </ChangeContainer>
      </ShadowBox>
      <Dialog
        isOpen={showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        aria-labelledby="dialog1Title"
        aria-describedby="dialog1Desc"
      >
        <H2Margin>
          Are you sure you want to delete{' '}
          <span style={{ fontWeight: 'bold' }}>{goal?.title}</span> ?
        </H2Margin>
        <ActionContainer>
          <Button onClick={handleDelete}>Delete</Button>
          <A onClick={() => setShowDeleteDialog(false)}>Cancel</A>
        </ActionContainer>
      </Dialog>
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
  let principal = currentValue;
  for (let i = 0; i < numPeriods; i++) {
    principal += contributionAmount;
    endBalance +=
      contributionAmount *
      (1 + returnRate / 100) **
        (yearsLeft - i / getPeriodsPerYear(contributionFrequency));
  }
  const interest = endBalance - principal;
  return [endBalance, principal, interest];
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

export const getTitleToSave = (
  originalTitle: string,
  goals: Goal[] | null,
  goalId: string | null,
) => {
  if (goals === null || goals.length === 0) {
    return originalTitle;
  }
  let count = 1;
  function checkIfMatch(title: string, goal: any) {
    return goal.id !== goalId && title === goal.title;
  }

  let shouldContinue =
    goals.find((x) => checkIfMatch(originalTitle, x)) !== undefined;
  let title = originalTitle;
  while (shouldContinue && count < 50) {
    title = originalTitle + ' (' + count + ')';
    let currentTitle = title;
    count++;
    shouldContinue =
      goals.find((x) => checkIfMatch(currentTitle, x)) !== undefined;
  }
  return title;
};

const GoalTitle = ({ title, setTitle, editMode, setEditMode }: any) => {
  const finishEditing = () => {
    setEditMode(false);
  };

  if (!editMode) {
    return (
      <div>
        <H1>{title}</H1>
      </div>
    );
  } else {
    return (
      <div>
        <NameInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              finishEditing();
            }
          }}
        />
      </div>
    );
  }
};

const getContributionConversion = (
  oldFrequency: string,
  newFrequency: string,
) => {
  const oldRatio = getPeriodsPerYear(oldFrequency);
  const newRatio = getPeriodsPerYear(newFrequency);

  return oldRatio / newRatio;
};
