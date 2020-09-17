import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { ToggleButton, StateText } from '../../../styled/ToggleButton';
import { OptionsTitle } from '../../../styled/GlobalElements';
import { selectSettings } from '../../../selectors';
import { putData } from '../../../api';
import { loadSettings } from '../../../actions';
import ShadowBox from '../../../styled/ShadowBox';

export const Back = styled(Link)`
  margin-bottom: 12px;
  text-decoration: none;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 700;
  color: #033ebc;
  text-transform: uppercase;
  margin-top: 20px;
  svg {
    margin-right: 10px;
  }
`;

export const Option = styled.div`
  margin: 15px 0;
  button {
    margin-right: 10px;
    span {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  span {
    font-weight: 500;
  }
`;

export const DashboardConfig = () => {
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

  const toggleTotalHoldings = () => {
    if (!settings) {
      return;
    }

    let newSettings = { ...settings };
    newSettings.show_total_holdings = !settings.show_total_holdings;
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
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const toggle2columns = () => {
    if (!settings) {
      return;
    }
    const hardReload = !settings.show_2columns_dashboard;

    let newSettings = { ...settings };
    newSettings.show_2columns_dashboard = !settings.show_2columns_dashboard;
    putData('/api/v1/settings/', newSettings)
      .then(async () => {
        dispatch(loadSettings());
        if (hardReload) {
          await sleep(100); // Very hacky way to force full reload of page with new settings
          window.location.reload(false);
        }
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
        <ShadowBox>
          <Option>
            <ToggleButton onClick={toggleTotalHoldings}>
              {settings.show_total_holdings ? (
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
            <OptionsTitle>Show Total Holdings</OptionsTitle>
          </Option>

          <Option>
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
            <OptionsTitle>Show Total Value Line Chart</OptionsTitle>
          </Option>

          <Option>
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
            <OptionsTitle>
              Show Total Contributions in Last 12 Months
            </OptionsTitle>
          </Option>

          <Option>
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
            <OptionsTitle>Show Contribution Bar Chart</OptionsTitle>
          </Option>

          <Option>
            <ToggleButton onClick={toggle2columns}>
              {settings.show_2columns_dashboard ? (
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
            <OptionsTitle>Display in 2 columns </OptionsTitle>
          </Option>
        </ShadowBox>
      </div>
    </React.Fragment>
  );
};

export default DashboardConfig;
