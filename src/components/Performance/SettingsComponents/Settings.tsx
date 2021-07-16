import styled from '@emotion/styled-base';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadPerformanceAll,
  loadPerformanceCustom,
  updateReportingSettings,
} from '../../../actions/performance';
import {
  selectEndDate,
  selectPerformanceCurrentDetailedMode,
  selectReportingSettings,
  selectSelectedAccounts,
  selectSelectedTimeframe,
  selectStartDate,
} from '../../../selectors/performance';
import { Button } from '../../../styled/Button';
import { OptionsTitle, Table } from '../../../styled/GlobalElements';
import ShadowBox from '../../../styled/ShadowBox';
import { StateText, ToggleButton } from '../../../styled/ToggleButton';
import { Option } from '../Dashboard/DashboardConfig';
import DefaultChart from './DefaultChart';
import DetailedChart from './DetailedChart';

const ChartOptions = styled(Table)`
  width: 50%;
  div {
    width: 100%;
    @media (max-width: 900px) {
      margin-bottom: 10px;
    }
  }
`;

const Settings = () => {
  const dispatch = useDispatch();
  const timeframe = useSelector(selectSelectedTimeframe);
  const settings = useSelector(selectReportingSettings)?.data;
  const [detailedMode, setDetailedMode] = useState(settings?.detailed_view);
  const [showDividendData, setShowDividendData] = useState(
    settings?.show_dividend_data,
  );
  const [showReturnRate, setShowReturnRate] = useState(
    settings?.show_return_rate,
  );
  const [contributionsByMonth, setContributionsByMonth] = useState(
    settings?.contributions_by_month,
  );
  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);
  const accountNumbers = useSelector(selectSelectedAccounts);

  const currentlyDetailedMode = useSelector(
    selectPerformanceCurrentDetailedMode,
  );
  const enableDetailedMode = () => {
    setDetailedMode(true);
    dispatch(
      updateReportingSettings({
        detailedView: true,
      }),
    );
  };
  const disableDetailedMode = () => {
    setDetailedMode(false);
    dispatch(
      updateReportingSettings({
        detailedView: false,
      }),
    );
  };
  const handleDividendToggle = () => {
    const oldValue = showDividendData;
    setShowDividendData(!showDividendData);
    dispatch(
      updateReportingSettings({
        showDividendData: !oldValue,
      }),
    );
  };
  const handleReturnRateToggle = () => {
    const oldValue = showReturnRate;
    setShowReturnRate(!showReturnRate);
    dispatch(
      updateReportingSettings({
        showReturnRate: !oldValue,
      }),
    );
  };
  const handleMonthlyContributionsToggle = () => {
    const oldValue = contributionsByMonth;
    setContributionsByMonth(!contributionsByMonth);
    dispatch(
      updateReportingSettings({
        contributionsByMonth: !oldValue,
      }),
    );
  };

  const needsDataRefresh = () => {
    const detailedModeNeedsUpdate = currentlyDetailedMode !== detailedMode;
    return detailedModeNeedsUpdate;
  };
  const repullData = () => {
    if (timeframe !== 'CST') {
      dispatch(loadPerformanceAll(accountNumbers));
    } else {
      dispatch(loadPerformanceAll(accountNumbers));
      dispatch(loadPerformanceCustom(accountNumbers, startDate, endDate));
    }
  };

  return (
    <ShadowBox>
      <Option>
        <ToggleButton onClick={() => handleDividendToggle()}>
          {showDividendData ? (
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
        <OptionsTitle>Show Dividend Information</OptionsTitle>
      </Option>
      <Option>
        <ToggleButton onClick={() => handleReturnRateToggle()}>
          {showReturnRate ? (
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
        <OptionsTitle>Show Rate of Return</OptionsTitle>
      </Option>
      <Option>
        <ToggleButton onClick={() => handleMonthlyContributionsToggle()}>
          {contributionsByMonth ? (
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
        <OptionsTitle>
          Prefer showing contribution data by months (don't group by year)
        </OptionsTitle>
      </Option>
      <div>
        <ChartOptions>
          <div
            onClick={() => disableDetailedMode()}
            style={{ marginRight: '50px' }}
          >
            <OptionsTitle>Simple View</OptionsTitle>
            <DefaultChart selected={!detailedMode} />
          </div>
          <div onClick={() => enableDetailedMode()}>
            <OptionsTitle>Detailed View</OptionsTitle>
            <DetailedChart selected={detailedMode} />
          </div>
        </ChartOptions>
      </div>
      {needsDataRefresh() && (
        <>
          <br></br>
          <Button onClick={() => repullData()}>Save and refresh data</Button>
        </>
      )}
    </ShadowBox>
  );
};

export default Settings;
