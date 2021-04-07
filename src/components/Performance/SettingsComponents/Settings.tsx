import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReportingSettings } from '../../../actions/performance';
import { selectReportingSettings } from '../../../selectors/performance';
import { OptionsTitle } from '../../../styled/GlobalElements';
import ShadowBox from '../../../styled/ShadowBox';
import { StateText, ToggleButton } from '../../../styled/ToggleButton';
import { Option } from '../Dashboard/DashboardConfig';

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectReportingSettings)?.data;
  const [showDividendData, setShowDividendData] = useState(
    settings?.show_dividend_data,
  );
  const [showReturnRate, setShowReturnRate] = useState(
    settings?.show_return_rate,
  );
  const handleDividendToggle = () => {
    const oldValue = showDividendData;
    setShowDividendData(!showDividendData);
    dispatch(
      updateReportingSettings({
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
    </ShadowBox>
  );
};

export default Settings;
