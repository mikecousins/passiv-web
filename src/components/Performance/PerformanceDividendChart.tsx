import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PerformanceChart, { ExpandChart } from './PerformanceChart';
import { selectDividends } from '../../selectors/performance';
import {
  faQuestionCircle,
  faLongArrowAltDown,
  faLongArrowAltUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '../Tooltip';
import { H3 } from '../../styled/GlobalElements';

const PerformanceDividendChart = () => {
  const dividendData = useSelector(selectDividends);
  const [className, setClassName] = useState('dividends');
  const [needToSetDefaults, setNeedToSetDefaults] = useState(true);

  if (
    needToSetDefaults &&
    dividendData !== undefined &&
    dividendData?.length > 10
  ) {
    setNeedToSetDefaults(false);
    setClassName('dividendsExtended');
  }

  let data = React.useMemo(
    () => [
      {
        label: 'Dividends',
        data: dividendData
          ?.sort((a, b) => b.amount - a.amount)
          .map((a) => {
            return [a.symbol?.symbol, a.amount];
          }),
        color: '#04a286',
      },
    ],
    [dividendData],
  );
  const series = React.useMemo(() => ({ type: 'bar' }), []);

  const formatAxis = (x: number) => {
    return '‏‏‎‎$' + x.toString();
  };

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'left' },
      { type: 'linear', position: 'bottom', stacked: true, format: formatAxis },
    ],
    [],
  );

  return (
    <React.Fragment>
      <Tooltip label="Dividends you have received during the selected timeframe">
        <H3>
          Total Dividends{' '}
          <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 13 }} />
          <ExpandChart>
            {className === 'dividends' && (
              <FontAwesomeIcon
                icon={faLongArrowAltDown}
                style={{ fontSize: 16, cursor: 'pointer' }}
                onClick={() => setClassName('dividendsExtended')}
              />
            )}
            {className === 'dividendsExtended' && (
              <FontAwesomeIcon
                icon={faLongArrowAltUp}
                style={{ fontSize: 16, cursor: 'pointer' }}
                onClick={() => setClassName('dividends')}
              />
            )}
          </ExpandChart>
        </H3>
      </Tooltip>
      <PerformanceChart
        className={className}
        data={data}
        axes={axes}
        series={series}
        displayTotal={false}
      />
    </React.Fragment>
  );
};

export default PerformanceDividendChart;
