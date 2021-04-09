import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadPerformanceAll,
  loadPerformanceCustom,
  updateReportingSettings,
} from '../../../actions/performance';
import { selectNewReportingFeature } from '../../../selectors/features';
import {
  selectEndDate,
  selectPerformanceCurrentDetailedMode,
  selectReportingSettings,
  selectSelectedAccounts,
  selectSelectedTimeframe,
  selectStartDate,
} from '../../../selectors/performance';
import { Button } from '../../../styled/Button';
import { OptionsTitle } from '../../../styled/GlobalElements';
import ShadowBox from '../../../styled/ShadowBox';
import { StateText, ToggleButton } from '../../../styled/ToggleButton';
import { Option } from '../Dashboard/DashboardConfig';
import DefaultChart from './DefaultChart';
import DetailedChart from './DetailedChart';

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
  const useNewReporting = useSelector(selectNewReportingFeature);
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
        showReturnRate: showReturnRate,
        showDividendData: showDividendData,
      }),
    );
  };
  const disableDetailedMode = () => {
    setDetailedMode(false);
    dispatch(
      updateReportingSettings({
        detailedView: false,
        showReturnRate: showReturnRate,
        showDividendData: showDividendData,
      }),
    );
  };
  const handleDividendToggle = () => {
    const oldValue = showDividendData;
    setShowDividendData(!showDividendData);
    dispatch(
      updateReportingSettings({
        detailedView: detailedMode,
        showReturnRate: showReturnRate,
        showDividendData: !oldValue,
      }),
    );
  };
  const handleReturnRateToggle = () => {
    const oldValue = showReturnRate;
    setShowReturnRate(!showReturnRate);
    dispatch(
      updateReportingSettings({
        detailedView: detailedMode,
        showReturnRate: !oldValue,
        showDividendData: showDividendData,
      }),
    );
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
      {useNewReporting && (
        <Option>
          <div>
            <span onClick={() => disableDetailedMode()}>
              <DefaultChart selected={!detailedMode} />
            </span>
            <span onClick={() => enableDetailedMode()}>
              <DetailedChart selected={detailedMode} />
            </span>
          </div>
          {currentlyDetailedMode !== detailedMode && (
            <>
              <br></br>
              <Button onClick={() => repullData()}>
                Save and refresh data
              </Button>
            </>
          )}

          <br></br>
        </Option>
      )}
    </ShadowBox>
  );
};

export default Settings;
