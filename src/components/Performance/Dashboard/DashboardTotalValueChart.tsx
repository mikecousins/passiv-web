import React from 'react';
import { useSelector } from 'react-redux';
import { selectPerformanceAll } from '../../../selectors/performance';
import DashboardChart from './DashboardChart';

export const DashboardTotalValueChart = () => {
  const performanceAll = useSelector(selectPerformanceAll);
  const totalEquityData = performanceAll.data?.totalEquityTimeframe1Y;
  let showPoints = true;
  if (
    performanceAll.data?.totalEquityTimeframe1Y !== undefined &&
    performanceAll.data?.totalEquityTimeframe1Y?.length > 20
  ) {
    showPoints = false;
  }

  const data = React.useMemo(
    () => [
      {
        label: 'Total Value',
        data: totalEquityData?.map((a) => {
          let date = new Date(Date.parse(a.date));
          return [
            new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            a.value,
          ];
        }),
        color: '#04a286',
      },
    ],
    [totalEquityData],
  );

  const series = React.useMemo(
    () => ({ type: 'line', showPoints: showPoints }),
    [showPoints],
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left', show: false },
    ],
    [],
  );

  return (
    <React.Fragment>
      <DashboardChart
        className="dashboard"
        data={data}
        axes={axes}
        series={series}
        displayTotal={true}
      />
    </React.Fragment>
  );
};

export default DashboardTotalValueChart;
