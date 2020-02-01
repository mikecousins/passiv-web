import React from 'react';
import styled from '@emotion/styled';
import PerformanceChart from './PerformanceChart';
import { useSelector } from 'react-redux';
import { selectContributionTimeframe } from '../../selectors/performance';
import { PastValue } from '../../types/performance';

type Props = {
  selectedTimeframe: string;
};

export const PerformanceContributionChart = (props: Props) => {
  let contributionData: PastValue[] | null = useSelector(
    selectContributionTimeframe,
  );

  const data = React.useMemo(
    () => [
      {
        label: 'Contributions',
        data: [
          [new Date(2020, 1, 22), 3],
          [new Date(2020, 1, 23), 1],
          [new Date(2020, 1, 24), 5],
          [new Date(2020, 1, 25), 6],
          [new Date(2020, 1, 26), 4],
        ],
        /*data: contributionData?.map(a => {
          let date = new Date(Date.parse(a.date));
          return [
            new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            a.value,
          ];
        }),*/
        color: 'red',
      },
    ],
    [contributionData],
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
