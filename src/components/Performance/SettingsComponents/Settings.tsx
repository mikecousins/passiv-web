import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReportingSettings } from '../../../actions/performance';
import { selectFeatures } from '../../../selectors/features';
import { selectReportingSettings } from '../../../selectors/performance';
import { OptionsTitle } from '../../../styled/GlobalElements';
import ShadowBox from '../../../styled/ShadowBox';
import { StateText, ToggleButton } from '../../../styled/ToggleButton';
import { Option } from '../Dashboard/DashboardConfig';
import DefaultChart from './DefaultChart';
import DetailedChart from './DetailedChart';

const Settings = () => {
  const flags = useSelector(selectFeatures);
  const dispatch = useDispatch();
  const settings = useSelector(selectReportingSettings)?.data;
  const [detailedMode, setDetailedMode] = useState(settings?.detailed_view);
  const [showDividendData, setShowDividendData] = useState(
    settings?.show_dividend_data,
  );
  const [showReturnRate, setShowReturnRate] = useState(
    settings?.show_return_rate,
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
    console.log(showReturnRate);
    console.log(showDividendData);
    console.log(detailedMode);
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
        <OptionsTitle>Show Dividends Related Data</OptionsTitle>
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
      {flags?.includes('reporting2') && (
        <Option>
          <div>
            <span onClick={() => disableDetailedMode()}>
              <DefaultChart selected={!detailedMode} />
            </span>
            <span onClick={() => enableDetailedMode()}>
              <DetailedChart selected={detailedMode} />
            </span>
          </div>
          <br></br>
        </Option>
      )}
    </ShadowBox>
  );
};

export default Settings;
