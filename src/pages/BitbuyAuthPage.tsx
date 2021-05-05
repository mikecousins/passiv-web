import React from 'react';
import styled from '@emotion/styled';
import BitbuyCredentialsManager from '../components/SettingsManager/BitbuyCredentialsManager';

export const Flex = styled.div`
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > div {
      width: 49%;
      margin-bottom: 2%;
    }
    h2 {
      margin-bottom: 15px;
    }
  }
`;

const BitbuyAuthPage = () => {
  return <BitbuyCredentialsManager />;
};

export default BitbuyAuthPage;
