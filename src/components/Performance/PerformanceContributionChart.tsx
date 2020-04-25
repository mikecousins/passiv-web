import React from 'react';
import { useSelector } from 'react-redux';
import PerformanceChart from './PerformanceChart';
import {
  selectContributionTimeframe,
  selectWithdrawalTimeframe,
  selectSelectedTimeframe,
} from '../../selectors/performance';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '../Tooltip';
import { H3 } from '../../styled/GlobalElements';

export const PerformanceContributionChart = () => {
  const contributionData = useSelector(selectContributionTimeframe);
  const withdrawalData = useSelector(selectWithdrawalTimeframe);
  const timeframe = useSelector(selectSelectedTimeframe);

  // let showWithdrawals = false;
  // if (withdrawalData !== undefined && withdrawalData !== null) {
  //   withdrawalData.forEach(pastValue => {
  //     if (pastValue.value > 0) {
  //       showWithdrawals = true;
  //     }
  //   });
  // }

  let data = React.useMemo(
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
  // let dataWithoutWithdrawals = React.useMemo(
  //   () => [
  //     {
  //       label: 'Contributions',
  //       data: contributionData
  //         ?.sort((a, b) => parseDate(a.date) - parseDate(b.date))
  //         .map(a => {
  //           let dateFormatted = formatDate(a.date, timeframe);
  //           return [dateFormatted, a.value];
  //         }),
  //       color: '#04a286',
  //     },
  //   ],
  //   [contributionData, timeframe],
  // );
  const series = React.useMemo(() => ({ type: 'bar' }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left', stacked: true },
    ],
    [],
  );

  return (
    <React.Fragment>
      <Tooltip label="The contributions and withdrawals you have made during the selected timeframe">
        <H3>
          Contributions and Withdrawals{' '}
          <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 13 }} />
        </H3>
      </Tooltip>
      {}
      <PerformanceChart
        className="contributions"
        data={data} //{showWithdrawals ? data : dataWithoutWithdrawals}
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
  if (date.getDate() > 20) {
    date.setDate(1);
    if (date.getMonth() < 12) {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setMonth(1);
      date.setFullYear(date.getFullYear() + 1);
    }
  }
  if (timeframe === 'ALL') {
    return date.getFullYear().toString();
  } else {
    return dtfMonth.format(date);
  }
};

export default PerformanceContributionChart;
