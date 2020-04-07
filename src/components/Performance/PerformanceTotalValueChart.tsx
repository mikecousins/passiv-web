import React, { useState } from 'react';
import PerformanceChart from './PerformanceChart';
import { useSelector } from 'react-redux';
import { selectTotalEquityTimeframe } from '../../selectors/performance';
import { ToggleButton, StateText } from '../../styled/ToggleButton';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PerformanceTotalValueChart = () => {
  let totalEquityData = useSelector(selectTotalEquityTimeframe);

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
        color: '#04A286',
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
    <React.Fragment>
      Total Value
      <br />
      <ToggleButton
        onClick={() => {
          setChartMin(!chartStartsAt0);
        }}
      >
        Zoom Scale &nbsp;
        {!chartStartsAt0 ? (
          <React.Fragment>
            <FontAwesomeIcon icon={faToggleOn} />
            <StateText>on</StateText>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FontAwesomeIcon icon={faToggleOff} />
            <StateText>off</StateText>
          </React.Fragment>
        )}
      </ToggleButton>
      <PerformanceChart
        className="equity"
        data={data}
        axes={axes}
        series={series}
      />
    </React.Fragment>
  );
};

export default PerformanceTotalValueChart;
