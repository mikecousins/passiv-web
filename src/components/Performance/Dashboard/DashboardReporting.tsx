import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  selectContributionTimeframe,
  selectWithdrawalTimeframe,
  selectTotalEquityTimeframe,
  selectContributionTimeframeCumulative,
} from '../../../selectors/performance';
import { parseDate, formatDate } from '../PerformanceContributionChart';
import DashboardChart from './DashboardChart';
import QuestradeAuthorizationPicker from '../../QuestradeAuthorizationPicker';

export const DashboardReporting = () => {
  const contributionData = useSelector(selectContributionTimeframe);
  const withdrawalData = useSelector(selectWithdrawalTimeframe);
  const totalEquityData = useSelector(selectTotalEquityTimeframe);
  const contributionCumulativeData = useSelector(
    selectContributionTimeframeCumulative,
  );
  const timeframe = '1Y';

  let contributionWithdrawalData = React.useMemo(
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

  const contributionWithdrawalSeries = React.useMemo(
    () => ({ type: 'bar' }),
    [],
  );

  const contributionWithdrawalAxes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left', stacked: true, show: false },
    ],
    [],
  );

  const totalValueData = React.useMemo(
    () => [
      {
        label: 'Total Value',
        data: totalEquityData?.map(a => {
          let date = new Date(Date.parse(a.date));
          return [
            new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            a.value,
          ];
        }),
        color: '#194EC1',
      },
    ],
    [totalEquityData],
  );

  const totalValueSeries = React.useMemo(() => ({ type: 'line' }), []);

  const totalValueAxes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom', show: false },
      { type: 'linear', position: 'left', show: false },
    ],
    [],
  );

  return (
    <React.Fragment>
      Total Value
      <DashboardChart
        className="dashboard"
        data={totalValueData}
        axes={totalValueAxes}
        series={totalValueSeries}
        displayTotal={true}
      />
      Contributions
      <DashboardChart
        className="dashboard"
        data={contributionWithdrawalData}
        axes={contributionWithdrawalAxes}
        series={contributionWithdrawalSeries}
        displayTotal={true}
      />
    </React.Fragment>
  );
};

export default DashboardReporting;
