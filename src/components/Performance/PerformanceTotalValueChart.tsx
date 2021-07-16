import React, { useState } from 'react';
import PerformanceChart from './PerformanceChart';
import { useSelector } from 'react-redux';
import {
  selectTotalEquityTimeframe,
  selectContributionTimeframeCumulative,
  selectBadTickers,
} from '../../selectors/performance';
import { ToggleButton, StateText } from '../../styled/ToggleButton';
import {
  faToggleOn,
  faToggleOff,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
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

const BadTickers = styled.span`
  float: right;
  font-weight: normal;
  font-size: 14px;
`;

const PerformanceTotalValueChart = () => {
  let totalEquityData = useSelector(selectTotalEquityTimeframe);
  let showPoints = true;
  if (totalEquityData !== undefined && totalEquityData?.length > 30) {
    showPoints = false;
  }
  let contributionCumulativeData = useSelector(
    selectContributionTimeframeCumulative,
  );
  const badTickers = useSelector(selectBadTickers);
  const showBadTickers =
    badTickers !== undefined && badTickers !== null && badTickers.length > 0;
  let badTickerString = '';
  if (showBadTickers) {
    badTickerString =
      'The following assets may have been excluded due to difficulties retrieving accurate price history: ' +
      badTickers?.join(', ');
  }

  // Show zoom toggle if minimum value is not 0
  let minValue = 1;
  let showZoomToggle = true;
  totalEquityData?.forEach((data) => {
    if (data.value < minValue) {
      minValue = data.value;
      if (minValue === 0) {
        showZoomToggle = false;
      } else {
        showZoomToggle = true;
      }
    }
  });
  contributionCumulativeData?.forEach((data) => {
    if (data.value < minValue) {
      minValue = data.value;
      if (minValue === 0) {
        showZoomToggle = false;
      } else {
        showZoomToggle = true;
      }
    }
  });

  const [chartStartsAt0, setChartMin] = useState(true);
  let chartMin: number | undefined = 0;
  if (!chartStartsAt0) {
    chartMin = undefined;
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
        color: '#04A286',
      },
      {
        label: 'Contributions',
        data: contributionCumulativeData?.map((a) => {
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

  const series = React.useMemo(
    () => ({ type: 'line', showPoints: showPoints }),
    [showPoints],
  );

  const formatAxis = (x: number) => {
    return '‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎$' + x.toString();
  };

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      {
        type: 'linear',
        position: 'left',
        hardMin: chartMin,
        showGrid: false,
        format: formatAxis,
      },
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
      <H3>
        <Tooltip label="The total estimated value of your accounts (may exclude mutual funds, options, and investments from unsupported exchanges)">
          <>
            Total Value{' '}
            <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 13 }} />
          </>
        </Tooltip>
        {showBadTickers && (
          <Tooltip label={badTickerString}>
            <BadTickers>
              Some assets have been excluded{' '}
              <FontAwesomeIcon
                icon={faQuestionCircle}
                style={{ fontSize: 11 }}
              />
            </BadTickers>
          </Tooltip>
        )}
      </H3>

      <PerformanceChart
        className="equity"
        data={data}
        axes={axes}
        series={series}
        displayTotal={false}
      />
      {showZoomToggle && zoomScale}
    </React.Fragment>
  );
};

export default PerformanceTotalValueChart;
