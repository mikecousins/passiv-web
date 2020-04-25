import React from 'react';
import { useSelector } from 'react-redux';
import PerformanceChart from './PerformanceChart';
import {
  selectDividends,
  selectSelectedTimeframe,
} from '../../selectors/performance';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '../Tooltip';
import { H3 } from '../../styled/GlobalElements';

export const PerformanceDividendChart = () => {
  const dividendData = useSelector(selectDividends);
  const timeframe = useSelector(selectSelectedTimeframe);

  let data = React.useMemo(
    () => [
      {
        label: 'Dividends',
        data: dividendData
          ?.sort((a, b) => b.amount - a.amount)
          .map(a => {
            return [a.symbol.symbol, a.amount];
          }),
        color: '#04a286',
      },
    ],
    [dividendData, timeframe],
  );
  const series = React.useMemo(() => ({ type: 'bar' }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'left' },
      { type: 'linear', position: 'bottom', stacked: true },
    ],
    [],
  );

  return (
    <React.Fragment>
      <Tooltip label="Dividends you have received during the selected timeframe">
        <H3>
          Dividends{' '}
          <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 13 }} />
        </H3>
      </Tooltip>
      {}
      <PerformanceChart
        className="dividends"
        data={data}
        axes={axes}
        series={series}
      />
    </React.Fragment>
  );
};

export default PerformanceDividendChart;
