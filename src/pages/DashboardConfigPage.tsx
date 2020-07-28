import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { ToggleButton, StateText } from '../styled/ToggleButton';
import { OptionsTitle, H1 } from '../styled/GlobalElements';
import { selectSettings } from '../selectors';
import DashboardTotalValueChart from '../components/Performance/Dashboard/DashboardTotalValueChart';
import DashboardContributionChart from '../components/Performance/Dashboard/DashboardContributionChart';
import Contributions1Y from '../components/Performance/Dashboard/Contributions1Y';
import { putData } from '../api';
import { loadSettings } from '../actions';

export const DashboardConfigPage = () => {
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  const toggleTotalValueChart = () => {
    if (!settings) {
      return;
    }

    let newSettings = { ...settings };
    newSettings.show_total_value_chart = !settings.show_total_value_chart;
    putData('/api/v1/settings/', newSettings)
      .then(() => {
        dispatch(loadSettings());
      })
      .catch(() => {
        dispatch(loadSettings());
      });
  };

  const toggleContributionsChart = () => {
    if (!settings) {
      return;
    }

    let newSettings = { ...settings };
    newSettings.show_contribution_chart = !settings.show_contribution_chart;
    putData('/api/v1/settings/', newSettings)
      .then(() => {
        dispatch(loadSettings());
      })
      .catch(() => {
        dispatch(loadSettings());
      });
  };

  const toggleContributionsNumber = () => {
    if (!settings) {
      return;
    }

    let newSettings = { ...settings };
    newSettings.show_contributions1Y = !settings.show_contributions1Y;
    putData('/api/v1/settings/', newSettings)
      .then(() => {
        dispatch(loadSettings());
      })
      .catch(() => {
        dispatch(loadSettings());
      });
  };

  if (!settings) {
    return null;
  }

  return (
    <React.Fragment>
      <div>
        <div>
          <H1>Dashboard Configuration</H1>
          <OptionsTitle>Show Total Value Line Chart</OptionsTitle>
          <ToggleButton onClick={toggleTotalValueChart}>
            {settings.show_total_value_chart ? (
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
        </div>
        <DashboardTotalValueChart />
      </div>

      <div>
        <div>
          <OptionsTitle>Show Contribution Bar Chart</OptionsTitle>
          <ToggleButton onClick={toggleContributionsChart}>
            {settings.show_contribution_chart ? (
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
        </div>
        <DashboardContributionChart />
      </div>

      <div>
        <div>
          <OptionsTitle>
            Show Total Contributions in Last 12 Months
          </OptionsTitle>
          <ToggleButton onClick={toggleContributionsNumber}>
            {settings.show_contributions1Y ? (
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
        </div>
        <Contributions1Y />
      </div>
    </React.Fragment>
  );
};

export default DashboardConfigPage;
