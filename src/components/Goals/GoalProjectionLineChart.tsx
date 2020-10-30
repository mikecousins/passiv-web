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
  width: 60%;
  margin: 15px 0 10px;
`;

export const LegendItem = styled.div`
  font-size: 18px;
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
        color: '#1b98e0',
      },
    ],
    [goal, currentValue, projectedValue, projectedData],
  );

  const series = React.useMemo(() => ({ type: 'line', showPoints: false }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom', showGrid: true },
      { type: 'linear', position: 'left', hardMin: 0, showGrid: true },
    ],
    [],
  );

  return (
    <ChartBox>
      Portfolio Value <br />
      <Chart data={data} axes={axes} series={series} />
      <br />
      <Grid columns="1fr 1fr 1fr">
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
        <LegendItem>
          <FontAwesomeIcon
            icon={faCircle}
            color="#1b98e0"
            style={{ padding: 1 }}
          />{' '}
          Projected&nbsp; ${toDollarString(projectedValue)}
        </LegendItem>
      </Grid>
    </ChartBox>
  );
};

export default GoalProjectionLineChart;
