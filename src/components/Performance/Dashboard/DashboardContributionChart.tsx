import React from 'react';
import { useSelector } from 'react-redux';
import { selectPerformanceAll } from '../../../selectors/performance';
import { parseDate, formatDate } from '../PerformanceContributionChart';
import DashboardChart from './DashboardChart';

const DashboardContributionChart = () => {
  const performanceAll = useSelector(selectPerformanceAll);
  const contributionData = performanceAll.data?.contributionTimeframe1Y;
  const withdrawalData = performanceAll.data?.withdrawalTimeframe1Y;
  const timeframe = '1Y';

  let data = React.useMemo(
    () => [
      {
        label: 'Withdrawals',
        data: withdrawalData
          ?.sort((a, b) => parseDate(a.date) - parseDate(b.date))
          .map((a) => {
            let dateFormatted = formatDate(a.date, timeframe);
            return [dateFormatted, a.value];
          }),
        color: 'var(--brand-blue)',
      },
      {
        label: 'Contributions',
        data: contributionData
          ?.sort((a, b) => parseDate(a.date) - parseDate(b.date))
          .map((a) => {
            let dateFormatted = formatDate(a.date, timeframe);
            return [dateFormatted, a.value];
          }),
        color: '#04a286',
      },
    ],
    [contributionData, withdrawalData, timeframe],
  );

  const series = React.useMemo(() => ({ type: 'bar' }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left', stacked: true, show: false },
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

export default DashboardContributionChart;
