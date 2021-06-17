import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export const OfflineStyle = styled.div`
  margin: 0 0 0 20px;
  padding: 20px 20px 0px 20px;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  text-align: right;
  letter-spacing: 0.44px;
  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-bottom: 40px solid var(--brand-orange);
    border-left: 40px solid transparent;
  }
  svg {
    margin-right: 5px;
  }
  @media (max-width: 900px) {
    text-align: center;
    padding: 0px;
  }
`;

const Offline = () => (
  <OfflineStyle>
    <FontAwesomeIcon icon={faExclamationTriangle} color="var(--brand-orange)" />
    You are in offline mode. Check your internet connection.
  </OfflineStyle>
);

export default Offline;
