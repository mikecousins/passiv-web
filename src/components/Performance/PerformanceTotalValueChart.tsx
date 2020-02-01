import React from 'react';
import styled from '@emotion/styled';
import PerformanceChart from './PerformanceChart';
import { useSelector } from 'react-redux';
import { selectTotalEquityTimeframe } from '../../selectors/performance';
import { PastValue } from '../../types/performance';

type Props = {
  selectedTimeframe: string;
};

export const PerformanceTotalValueChart = (props: Props) => {
  let totalEquityData: PastValue[] | null = useSelector(
    selectTotalEquityTimeframe,
  );

  const data = React.useMemo(
    () => [
      {
        label: 'Total Equity',
        data: [
          [new Date(2020, 1, 22), 7],
          [new Date(2019, 12, 22), 2],
          [new Date(2019, 11, 22), 4],
          [new Date(2019, 10, 22), 2],
          [new Date(2019, 9, 22), 3],
        ],
        /*data: totalEquityData?.map(a => {
          let date = new Date(Date.parse(a.date));
          return [
            new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            a.value,
          ];
        }),*/
      },
    ],
    [totalEquityData],
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
