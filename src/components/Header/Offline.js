import React from 'react';
import styled from '@emotion/styled';

export const OfflineStyle = styled.div`
  margin: 0 0 0 20px;
  padding-top: 20px;
  text-align: left;
  font-weight: 700;
  @media (max-width: 900px) {
    padding-top: 10px;
    padding-right: 20px;
  }
`;

const Offline = () => (
  <OfflineStyle>
    You are in offline mode. Check your internet connection.
  </OfflineStyle>
);

export default Offline;
