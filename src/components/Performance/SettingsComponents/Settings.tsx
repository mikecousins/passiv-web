import styled from '@emotion/styled';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import DefaultChart from './DefaultChart';
import DetailedChart from './DetailedChart';
import TimeframePicker from '../TimeframePicker';
import { selectReportingSettings } from '../../../selectors/performance';
import { useDispatch, useSelector } from 'react-redux';
import { updateReportingSettings } from '../../../actions/performance';
import { selectFeatures } from '../../../selectors/features';

const SettingsContainer = styled.div``;

export const Settings = () => {
  const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState(false);
  const [detailedMode, setDetailedMode] = useState(
    useSelector(selectReportingSettings).data?.detailedView,
  );
  const enableDetailedMode = () => {
    setDetailedMode(true);
    dispatch(updateReportingSettings({ detailedView: true }));
  };
  const disableDetailedMode = () => {
    setDetailedMode(false);
    dispatch(updateReportingSettings({ detailedView: false }));
  };
  const flags = useSelector(selectFeatures);

  return (
    <>
      <TimeframePicker />
      {flags?.includes('reporting2') && (
        <>
          <SettingsContainer>
            <FontAwesomeIcon
              icon={faCogs}
              onClick={() => setShowSettings(!showSettings)}
              style={{ float: 'right', cursor: 'pointer' }}
            />
            {showSettings && (
              <div>
                <span onClick={() => disableDetailedMode()}>
                  <DefaultChart selected={!detailedMode} />
                </span>
                <span onClick={() => enableDetailedMode()}>
                  <DetailedChart selected={detailedMode} />
                </span>
              </div>
            )}
          </SettingsContainer>
          <br></br>
        </>
      )}
    </>
  );
};

export default Settings;
