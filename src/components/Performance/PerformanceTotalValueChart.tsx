import React, { useState } from 'react';
import PerformanceChart from './PerformanceChart';
import { useSelector } from 'react-redux';
import {
  selectTotalEquityTimeframe,
  selectContributionTimeframeCumulative,
} from '../../selectors/performance';
import { ToggleButton, StateText } from '../../styled/ToggleButton';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '../Tooltip';
import { H3 } from '../../styled/GlobalElements';
import styled from '@emotion/styled';

const ZoomScaleWidget = styled.div``;

const ZoomScaleText = styled.span`
  font-size: 16px;
`;

const ZoomToggle = styled.span`
  font-size: 16px;
  padding-left: 10px;
`;

export const PerformanceTotalValueChart = () => {
  let totalEquityData = useSelector(selectTotalEquityTimeframe);
  let contributionCumulativeData = useSelector(
    selectContributionTimeframeCumulative,
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
        color: '#04A286',
      },
      {
        label: 'Contributions',
        data: contributionCumulativeData?.map(a => {
          let date = new Date(Date.parse(a.date));
          return [
            new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            a.value,
          ];
        }),
        color: '#4ac0ff',
      },
    ],
    [totalEquityData, contributionCumulativeData],
  );

  const series = React.useMemo(() => ({ type: 'line' }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left', hardMin: chartMin, showGrid: false },
    ],
    [chartMin],
  );

  const zoomScale = (
    <ZoomScaleWidget>
      <Tooltip label="Toggle zoom of y-axis (0 based or min based)">
        <ToggleButton
          onClick={() => {
            setChartMin(!chartStartsAt0);
          }}
        >
          <div>
            <ZoomScaleText>Zoom to Fit</ZoomScaleText>
            <ZoomToggle>
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
            </ZoomToggle>
          </div>
        </ToggleButton>
      </Tooltip>
    </ZoomScaleWidget>
  );

  return (
    <React.Fragment>
      <H3>Total Value</H3>
      <PerformanceChart
        className="equity"
        data={data}
        axes={axes}
        series={series}
      />
      {zoomScale}
    </React.Fragment>
  );
};

export default PerformanceTotalValueChart;
