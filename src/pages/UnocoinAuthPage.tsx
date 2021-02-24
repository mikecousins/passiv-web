import React from 'react';
import styled from '@emotion/styled';
import UnocoinCredentialsManager from '../components/SettingsManager/UnocoinCredentialsManager';

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

const UnocoinAuthPage = () => {
  return <UnocoinCredentialsManager />;
};

export default UnocoinAuthPage;
