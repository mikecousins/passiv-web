import React, { FunctionComponent } from 'react';
import { Goal } from '../../types/goals';
import { Chart } from 'react-charts';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { toDollarString } from '../Performance/Performance';
import Grid from '../../styled/Grid';

export const ChartBox = styled.div`
  position: relative;
  height: 300px;
  margin: 15px 0 10px;
`;

export const LegendItem = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
`;
export const LegendContainer = styled(Grid)`
  text-align: right;
`;
type Props = {
  goal: Goal | null;
  currentValue: number;
  projectedValue: number;
  projectedData: (number | Date)[][];
};
export const GoalProjectionLineChart: FunctionComponent<Props> = ({
  goal,
  currentValue,
  projectedValue,
  projectedData,
}) => {
  const data = React.useMemo(
    () => [
      {
        label: 'Target',
        data: [
          [
            new Date(Date.parse(goal ? goal.created_date : '')),
            goal ? goal.total_value_target : 100,
          ],
          [
            new Date(Date.parse(goal ? goal.target_date : '')),
            goal ? goal.total_value_target : 100,
          ],
        ],
        color: '#04A286',
      },
      // {
      //   label: 'Projected',
      //   data: [[new Date(Date.parse(goal? goal.created_date : '')), currentValue], [new Date(Date.parse(goal? goal.target_date : '')), projectedValue]],
      //   color: '#1b98e0',
      // },
      {
        label: 'Projected2',
        data: projectedData,
        color: '#003ba2',
      },
    ],
    [goal, currentValue, projectedValue, projectedData],
  );

  const series = React.useMemo(() => ({ type: 'line', showPoints: false }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom', showGrid: false },
      { type: 'linear', position: 'left', hardMin: 0, showGrid: false },
    ],
    [],
  );

  return (
    <ChartBox>
      <LegendContainer columns="1fr 1fr">
        <LegendItem>
          <FontAwesomeIcon
            icon={faCircle}
            color="#003ba2"
            style={{ padding: 1 }}
          />{' '}
          Projected&nbsp; ${toDollarString(projectedValue)}
        </LegendItem>
        <LegendItem>
          <FontAwesomeIcon
            icon={faCircle}
            color="#04a286"
            style={{ padding: 1 }}
          />{' '}
          Target&nbsp; $
          {goal?.total_value_target !== undefined
            ? toDollarString(goal?.total_value_target)
            : ''}
        </LegendItem>
      </LegendContainer>
      <Chart data={data} axes={axes} series={series} />
    </ChartBox>
  );
};

export default GoalProjectionLineChart;
