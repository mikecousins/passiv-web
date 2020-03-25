import React from 'react';
import { useSelector } from 'react-redux';
import PerformanceChart from './PerformanceChart';
import {
  selectContributionTimeframe,
  selectWithdrawalTimeframe,
} from '../../selectors/performance';

export const PerformanceContributionChart = () => {
  const contributionData = useSelector(selectContributionTimeframe);
  const withdrawalData = useSelector(selectWithdrawalTimeframe);

  const data = React.useMemo(
    () => [
      {
        label: 'Contributions',
        data: contributionData
          ?.sort((a, b) => parseDate(a.date) - parseDate(b.date))
          .map((a) => {
            let dateFormatted = formatDate(a.date);
            return [dateFormatted, a.value];
          }),
        color: '#04a286',
      },
      {
        label: 'Withdrawals',
        data: withdrawalData
          ?.sort((a, b) => parseDate(a.date) - parseDate(b.date))
          .map((a) => {
            let dateFormatted = formatDate(a.date);
            return [dateFormatted, a.value];
          }),
        color: '#ab442d',
      },
    ],
    [contributionData, withdrawalData],
  );
  const series = React.useMemo(() => ({ type: 'bar' }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left', stacked: true }, // hardMin: 0 },
    ],
    [],
  );

  return (
    <PerformanceChart
      className="contributions"
      data={data}
      axes={axes}
      series={series}
    />
  );
};

const dtf = new Intl.DateTimeFormat('en', { month: 'short' });

const parseDate = (dateString: string): number => {
  return Date.parse(dateString);
};

const formatDate = (dateString: string): string => {
  const date = new Date(parseDate(dateString));
  return dtf.format(date);
};

export default PerformanceContributionChart;
