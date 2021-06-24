import React from 'react';
import styled from '@emotion/styled';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShadowBox from '../styled/ShadowBox';

const OverlayShadowBox = styled(ShadowBox)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #dddddd;
  opacity: 0.8;
`;

const LoadingBox = styled.div`
  width: 100%;
  text-align: center;
  font-size: 3em;
  opacity: 1;

  position: absolute;
  top: 50%;
  left: 50%;
  height: 3em;
  width: 50%;

  margin: -1.5em 0 0 -25%;
`;

export const LoadingOverlay = () => {
  return (
    <OverlayShadowBox>
      <LoadingBox>
        Loading... <FontAwesomeIcon icon={faSpinner} spin />
      </LoadingBox>
    </OverlayShadowBox>
  );
};

export default LoadingOverlay;
