import React, { useState } from 'react';
// import styled from '@emotion/styled';
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

  const [chartStartsAt0, setChartMin] = useState(true);
  let chartMin: number | undefined = 0;
  if (!chartStartsAt0) {
    chartMin = undefined;
  }

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

  const series = React.useMemo(() => ({ type: 'line' }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left', hardMin: chartMin, showGrid: false },
    ],
    [chartMin],
  );

  return (
    <div>
      <button
        onClick={() => {
          setChartMin(!chartStartsAt0);
        }}
      >
        Toggle Chart Range
      </button>
      <PerformanceChart
        className="equity"
        data={data}
        axes={axes}
        series={series}
      />
    </div>
  );
};

export default PerformanceTotalValueChart;
