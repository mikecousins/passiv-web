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
  let totalEquityData: PastValue[] | undefined = useSelector(
    selectTotalEquityTimeframe,
  );

  const data = React.useMemo(
    () => [
      {
        label: 'Total Equity',
        data: totalEquityData?.map(a => {
          let date = new Date(Date.parse(a.date));
          return [
            new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            a.value,
          ];
        }),
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
