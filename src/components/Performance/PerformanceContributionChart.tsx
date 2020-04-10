import React from 'react';
import { useSelector } from 'react-redux';
import PerformanceChart from './PerformanceChart';
import {
  selectContributionTimeframe,
  selectWithdrawalTimeframe,
  selectSelectedTimeframe,
} from '../../selectors/performance';
import { H3 } from '../../styled/GlobalElements';

export const PerformanceContributionChart = () => {
  const contributionData = useSelector(selectContributionTimeframe);
  const withdrawalData = useSelector(selectWithdrawalTimeframe);
  const timeframe = useSelector(selectSelectedTimeframe);

  const data = React.useMemo(
    () => [
      {
        label: 'Withdrawals',
        data: withdrawalData
          ?.sort((a, b) => parseDate(a.date) - parseDate(b.date))
          .map(a => {
            let dateFormatted = formatDate(a.date, timeframe);
            return [dateFormatted, a.value];
          }),
        color: '#003ba2',
      },
      {
        label: 'Contributions',
        data: contributionData
          ?.sort((a, b) => parseDate(a.date) - parseDate(b.date))
          .map(a => {
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
      { type: 'linear', position: 'left', stacked: true }, // hardMin: 0 },
    ],
    [],
  );

  return (
    <React.Fragment>
      <H3>Contributions and Withdrawals</H3>
      <PerformanceChart
        className="contributions"
        data={data}
        axes={axes}
        series={series}
      />
    </React.Fragment>
  );
};

const dtfMonth = new Intl.DateTimeFormat('en', { month: 'short' });

const parseDate = (dateString: string): number => {
  return Date.parse(dateString);
};

const formatDate = (dateString: string, timeframe: string): string => {
  const date = new Date(parseDate(dateString));
  if (timeframe === 'ALL') {
    return date.getFullYear().toString();
  } else {
    return dtfMonth.format(date);
  }
};

export default PerformanceContributionChart;
