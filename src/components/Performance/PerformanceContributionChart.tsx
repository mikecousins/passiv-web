import React from 'react';
import styled from '@emotion/styled';
import PerformanceChart from './PerformanceChart';

export const PerformanceContributionChart = (props: any) => {
  const data = React.useMemo(
    () => [
      {
        label: 'Series 2',
        data: [
          [new Date(2020, 1, 22), 3],
          [new Date(2020, 1, 23), 1],
          [new Date(2020, 1, 24), 5],
          [new Date(2020, 1, 25), 6],
          [new Date(2020, 1, 26), 4],
        ],
        color: 'red',
      },
    ],
    [],
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    [],
  );

  return <PerformanceChart data={data} axes={axes} />;
};

export default PerformanceContributionChart;
