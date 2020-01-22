import React from 'react';
import styled from '@emotion/styled';
import PerformanceChart from './PerformanceChart';

export const PerformanceTotalValueChart = (props: any) => {
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [
          [new Date(2020, 1, 22), 7],
          [new Date(2019, 12, 22), 2],
          [new Date(2019, 11, 22), 4],
          [new Date(2019, 10, 22), 2],
          [new Date(2019, 9, 22), 3],
        ],
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

export default PerformanceTotalValueChart;
