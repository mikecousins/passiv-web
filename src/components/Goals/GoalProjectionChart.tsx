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
};
export const GoalProjectionChart: FunctionComponent<Props> = ({
  goal,
  currentValue,
  projectedValue,
}) => {
  const data = React.useMemo(
    () => [
      {
        label: 'Current',
        data: [['Portfolio Value', currentValue]],
        color: '#04A286',
      },
      {
        label: 'Target',
        data: [['Portfolio Value', goal?.total_value_target]],
        color: '#1b98e0',
      },
      {
        label: 'Projected',
        data: [['Portfolio Value', projectedValue]],
        color: '#214f4b',
      },
    ],
    [goal, currentValue, projectedValue],
  );

  const series = React.useMemo(() => ({ type: 'bar', stacked: true }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom', show: false },
      { type: 'linear', position: 'left', hardMin: 0, showGrid: false },
    ],
    [],
  );

  return (
    <ChartBox>
      Portfolio Value <br />
      <Chart data={data} axes={axes} series={series} tooltip />
      <br />
      <Grid columns="1fr 1fr 1fr">
        <LegendItem>
          <FontAwesomeIcon
            icon={faCircle}
            color="#04a286"
            style={{ padding: 1 }}
          />{' '}
          Current&nbsp; ${toDollarString(currentValue)}
        </LegendItem>
        <LegendItem>
          <FontAwesomeIcon
            icon={faCircle}
            color="#1b98e0"
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
            color="#214f4b"
            style={{ padding: 1 }}
          />{' '}
          Projected&nbsp; ${toDollarString(projectedValue)}
        </LegendItem>
      </Grid>
    </ChartBox>
  );
};

export default GoalProjectionChart;
