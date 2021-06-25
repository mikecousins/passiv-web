import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectSelectedTimeframe,
  selectRateOfReturn,
  selectContributions,
  selectReportingSettings,
  selectBrokeragesNotSupportReporting,
} from '../../selectors/performance';
import PerformanceChange from './PerformanceChange';
import PerformanceCapitalGains from './PerformanceCapitalGains';
import PerformanceContributions from './PerformanceContributions';
import PerformanceContributionChart from './PerformanceContributionChart';
import PerformanceTotalValueChart from './PerformanceTotalValueChart';
import PerformanceContributionStreak from './PerformanceContributionStreak';
import PerformanceDividendChart from './PerformanceDividendChart';
import PerformanceMonthlyDividends from './PerformanceMonthlyDividends';
import PerformanceDividendTimelineChart from './PerformanceDividendTimelineChart';
import PerformanceDividendIncome from './PerformanceDividendIncome';
import PerformanceFees from './PerformanceFees';
import PerformanceFeeSavings from './PerformanceFeeSavings';
import ShadowBox from '../../styled/ShadowBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCogs,
  faExclamationTriangle,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import {
  CustomizeDashBtn,
  CustomizeDashContainer,
} from './Dashboard/DashboardReporting';
import PerformanceRateOfReturn from './PerformanceRateOfReturn';
import Settings from './SettingsComponents/Settings';
import TimeframePicker from './TimeframePicker';
import { H2, P } from '../../styled/GlobalElements';

const Grid = styled.div`
  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: auto 250px;
    grid-column-gap: 20px;
  }
`;

const Tiles = styled.div`
  @media (min-width: 900px) {
    display: grid;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;
    font-size: 25px;
  }
`;

export const CashReturn = styled.span`
  padding: 10px;
  background-color: var(--white);
  margin: 5px;
  color: var(--brand-green);
  &.positive {
    color: var(--brand-green);
  }
  &.negative {
    color: var(--brand-blue);
  }
`;

export const SubHeader = styled.div`
  font-size: 18px;
  margin-bottom: 14px;
  text-align: center;
`;

const NotSupported = styled(ShadowBox)`
  h2 {
    margin-bottom: 20px;
    color: var(--brand-green);
  }
  ul {
    padding: 5px 20px;
    list-style: circle;
    li {
      margin-bottom: 10px;
    }
  }
`;

const Performance = () => {
  let currentTimeframe = useSelector(selectSelectedTimeframe);
  // We can hide charts if user is on custom timeframe and hasn't yet fetched data (can check this if contributions are undefined)
  const contributions = useSelector(selectContributions);
  let rateOfReturn = useSelector(selectRateOfReturn);
  const settings = useSelector(selectReportingSettings)?.data;
  const notSupportReporting = useSelector(selectBrokeragesNotSupportReporting);

  let showRateOfReturn = true;
  let showDividendData = true;
  if (settings?.show_return_rate !== undefined) {
    showRateOfReturn = settings?.show_return_rate;
  }
  if (settings?.show_dividend_data !== undefined) {
    showDividendData = settings?.show_dividend_data;
  }

  const [showSettings, setShowSettings] = useState(false);

  return (
    <React.Fragment>
      {false && (
        <div style={{ margin: '5px' }}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          &nbsp;Reporting data may be temporarily inaccurate due to issues with
          our data provider
        </div>
      )}

      {notSupportReporting && notSupportReporting.length > 0 && (
        <NotSupported>
          <H2>
            <FontAwesomeIcon icon={faHourglassHalf} size="sm" /> Coming Soon ...
          </H2>
          <P>
            At the moment, reporting is not available for the following
            institutions, but will be supported soon.
          </P>
          <ul>
            {notSupportReporting.map((brokerage) => {
              return <li>{brokerage.brokerage.name}</li>;
            })}
          </ul>
        </NotSupported>
      )}

      <CustomizeDashContainer>
        <CustomizeDashBtn onClick={() => setShowSettings(!showSettings)}>
          <FontAwesomeIcon icon={faCogs} /> Settings
        </CustomizeDashBtn>
      </CustomizeDashContainer>
      {showSettings && <Settings />}

      <TimeframePicker />
      {currentTimeframe === 'CST' && contributions === undefined && (
        <>
          Select a timeframe and click "Apply" to load a custom reporting
          snapshot
        </>
      )}
      {(currentTimeframe !== 'CST' || contributions !== undefined) && (
        <React.Fragment>
          <Grid>
            <ShadowBox>
              <PerformanceContributionChart />
            </ShadowBox>
            <Tiles>
              <ShadowBox>
                <PerformanceContributions
                  selectedTimeframe={currentTimeframe}
                />
              </ShadowBox>
              <ShadowBox>
                <PerformanceContributionStreak />
              </ShadowBox>
            </Tiles>
          </Grid>
          <Grid>
            <ShadowBox>
              <PerformanceTotalValueChart />
            </ShadowBox>
            <Tiles>
              <ShadowBox>
                <PerformanceChange />
              </ShadowBox>
              {rateOfReturn && showRateOfReturn && (
                <ShadowBox>
                  <PerformanceRateOfReturn />
                </ShadowBox>
              )}
              <ShadowBox>
                <PerformanceCapitalGains />
              </ShadowBox>
            </Tiles>
          </Grid>
          {showDividendData && (
            <>
              <Grid>
                <ShadowBox>
                  <PerformanceDividendTimelineChart />
                </ShadowBox>
                <Tiles>
                  <ShadowBox>
                    <PerformanceMonthlyDividends />
                  </ShadowBox>
                  <ShadowBox>
                    <PerformanceFees />
                  </ShadowBox>
                </Tiles>
              </Grid>
              <Grid>
                <ShadowBox>
                  <PerformanceDividendChart />
                </ShadowBox>
                <Tiles>
                  <ShadowBox>
                    <PerformanceFeeSavings />
                  </ShadowBox>
                  <ShadowBox>
                    <PerformanceDividendIncome />
                  </ShadowBox>
                </Tiles>
              </Grid>
            </>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Performance;

export const toDollarString = (dollars: number) => {
  let dollarString = dollars.toFixed(0);
  let index = dollarString.length - 3;
  while ((index > 0 && dollarString[0] !== '-') || index > 1) {
    dollarString =
      dollarString.slice(0, index) + ',' + dollarString.slice(index);
    index -= 3;
  }
  return dollarString;
};
