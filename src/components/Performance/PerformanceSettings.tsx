import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSettings } from '../../actions';
import { putData } from '../../api';
import { selectSettings } from '../../selectors';
import { OptionsTitle } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import { StateText, ToggleButton } from '../../styled/ToggleButton';
import { Option } from './Dashboard/DashboardConfig';

const PerformanceSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);

  type Setting = 'dividend' | 'percentage';

  const handleToggleBtn = (param: Setting) => {
    if (settings) {
      let newSettings = { ...settings };
      if (param === 'dividend') {
        newSettings.show_dividends = !settings?.show_dividends;
      } else {
        newSettings.roi_net_in_percentage = !settings?.roi_net_in_percentage;
      }
      putData('/api/v1/settings/', newSettings)
        .then(() => {
          dispatch(loadSettings());
        })
        .catch(() => {
          dispatch(loadSettings());
        });
    }
  };

  return (
    <ShadowBox>
      <Option>
        <ToggleButton onClick={() => handleToggleBtn('dividend')}>
          {settings?.show_dividends ? (
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
        <ToggleButton onClick={() => handleToggleBtn('percentage')}>
          {settings?.roi_net_in_percentage ? (
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
          Show Net Change and Investment Growth in Percentage
        </OptionsTitle>
      </Option>
    </ShadowBox>
  );
};

export default PerformanceSettings;
