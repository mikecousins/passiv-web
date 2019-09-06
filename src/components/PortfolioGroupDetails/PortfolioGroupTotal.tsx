import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import Number from '../Number';
import { Error } from '../../types/groupInfo';

const Total = styled.div`
  text-align: center;
  color: #fff;
  background: #04a287;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Center = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 20px;
`;

type Props = {
  error?: Error | null;
  equity?: any;
};

const PortfolioGroupTotal = ({ error, equity }: Props) => {
  let equityValue = null;
  if (error) {
    equityValue = (
      <Center>
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </Center>
    );
  } else {
    equityValue =
      equity !== null ? (
        <Number value={equity} currency />
      ) : (
        <FontAwesomeIcon icon={faSpinner} spin />
      );
  }

  return (
    <ShadowBox background="#04a287">
      <Total>
        <Title>Total Value</Title>
        <p>{equityValue}</p>
      </Total>
    </ShadowBox>
  );
};

export default PortfolioGroupTotal;
