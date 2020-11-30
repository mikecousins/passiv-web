import React, { FunctionComponent, useState } from 'react';
import { Goal } from '../../types/goals';
import { Chart } from 'react-charts';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faPen,
  faSyncAlt,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { toDollarString } from '../Performance/Performance';
import { Edit } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import { Button } from '../../styled/Button';

export const ChartBox = styled.div`
  position: relative;
  height: 400px;
  margin: 6px 0 0;
  padding-bottom: 60px;
`;
export const LegendItem = styled.div`
  font-size: 24px;
  margin-bottom: 50px;
  &.small {
    font-size: 16px;
    margin-bottom: 58px;
  }
`;
export const LegendContainer = styled(Grid)`
  text-align: right;
  align-items: flex-end;
  button {
    font-size: 18px;
    display: block;
    text-align: right;
    margin: 0 0 8px auto;
    font-size: 18px;
    padding-right: 0;
  }
`;
export const TargetDoneButton = styled(Button)`
  background: none;
  color: var(--brand-blue);
  right: 0;
  font-size: 18px;
`;
export const TargetInput = styled.input`
  display: inline-block;
  width: 104px;
  border-bottom: 2px solid var(--brand-blue);
`;
export const BreakdownToggle = styled.button`
  font-size: 14px;
  margin-top: 16px;
  margin-left: 46%;
`;
type Props = {
  goal: Goal | null;
  targetDate: Date;
  currentValue: number;
  projectedValue: number;
  principal: number;
  interest: number;
  projectedData: (number | Date)[][];
  principalData: (number | Date)[][];
  interestData: (number | Date)[][];
  goalTarget: number;
  setGoalTarget: any;
};
export const GoalProjectionLineChart: FunctionComponent<Props> = ({
  goal,
  targetDate,
  projectedValue,
  principal,
  interest,
  projectedData,
  principalData,
  interestData,
  goalTarget,
  setGoalTarget,
}) => {
  const [showDetailed, setShowDetailed] = useState(false);
  const data = React.useMemo(
    () => [
      {
        label: 'Target',
        data: [
          [new Date(Date.parse(goal ? goal.created_date : '')), goalTarget],
          [new Date(Date.parse(goal ? targetDate.toString() : '')), goalTarget],
        ],
        color: '#04A286',
      },
      {
        label: 'Projected',
        data: projectedData,
        color: '#003ba2',
      },
      {
        label: 'Principal',
        data: showDetailed ? principalData : [],
        color: 'red',
      },
      {
        label: 'Interest',
        data: showDetailed ? interestData : [],
        color: 'purple',
      },
    ],
    [
      goal,
      projectedData,
      principalData,
      interestData,
      targetDate,
      goalTarget,
      showDetailed,
    ],
  );

  const series = React.useMemo(() => ({ type: 'line', showPoints: false }), []);

  const formatAxis = (x: number) => {
    return '‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎$' + x.toString();
  };

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom', showGrid: true },
      {
        type: 'linear',
        position: 'left',
        hardMin: 0,
        showGrid: true,
        format: formatAxis,
      },
    ],
    [],
  );

  return (
    <ChartBox>
      {!showDetailed ? (
        <LegendContainer columns="1fr 1fr">
          <LegendItem>
            <FontAwesomeIcon
              icon={faCircle}
              color="#003ba2"
              style={{ padding: 1 }}
            />{' '}
            Projected&nbsp; ${toDollarString(projectedValue)}
          </LegendItem>
          <div>
            <GoalTarget
              goalTarget={goalTarget}
              setGoalTarget={setGoalTarget}
              className="normal"
            />
          </div>
        </LegendContainer>
      ) : (
        <LegendContainer columns="1fr 1fr 1fr 1fr">
          <LegendItem className="small">
            <FontAwesomeIcon
              icon={faCircle}
              color="#003ba2"
              style={{ padding: 1 }}
            />{' '}
            Projected&nbsp; ${toDollarString(projectedValue)}
          </LegendItem>
          <LegendItem className="small">
            <FontAwesomeIcon
              icon={faCircle}
              color="red"
              style={{ padding: 1 }}
            />{' '}
            Principal&nbsp; ${toDollarString(principal)}
          </LegendItem>
          <LegendItem className="small">
            <FontAwesomeIcon
              icon={faCircle}
              color="purple"
              style={{ padding: 1 }}
            />{' '}
            Interest&nbsp; ${toDollarString(interest)}
          </LegendItem>
          <div>
            <GoalTarget
              goalTarget={goalTarget}
              setGoalTarget={setGoalTarget}
              className="small"
            />
          </div>
        </LegendContainer>
      )}
      <Chart data={data} axes={axes} series={series} />
      {(interest > 0 || showDetailed) && (
        <BreakdownToggle onClick={() => setShowDetailed(!showDetailed)}>
          <FontAwesomeIcon icon={faSearch} style={{ padding: 1 }} /> Show
          Breakdown
        </BreakdownToggle>
      )}
    </ChartBox>
  );
};

export default GoalProjectionLineChart;

const GoalTarget = ({ goalTarget, setGoalTarget, className }: any) => {
  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(goalTarget);
  const finishEditing = (newValue: number) => {
    setGoalTarget(newValue);
    setEditMode(false);
  };

  if (!editMode) {
    return (
      <React.Fragment>
        <Edit onClick={() => setEditMode(true)}>
          <FontAwesomeIcon icon={faPen} />
          Edit Target
        </Edit>
        <LegendItem className={className}>
          <FontAwesomeIcon
            icon={faCircle}
            color="#04a286"
            style={{ padding: 1 }}
          />{' '}
          Target&nbsp; $
          {goalTarget !== undefined ? toDollarString(goalTarget) : ''}
        </LegendItem>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <LegendItem className={className}>
          <Edit onClick={() => finishEditing(newValue)}>
            <FontAwesomeIcon icon={faSyncAlt} />
            Update
          </Edit>
          <FontAwesomeIcon
            icon={faCircle}
            color="#04a286"
            style={{ padding: 1 }}
          />{' '}
          Target&nbsp; ${' '}
          <TargetInput
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(parseFloat(e.target.value))}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                finishEditing(newValue);
              }
            }}
          ></TargetInput>
        </LegendItem>
      </React.Fragment>
    );
  }
};
