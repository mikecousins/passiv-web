import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { Title } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import Number from '../Number';

const Total = styled.div`
  text-align: center;
  color: #fff;
  background: #04a287;
`;

const Center = styled.div`
  text-align: center;
`;

type Props = {
  error?: any | null;
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
        <b>{equityValue}</b>
      </Total>
    </ShadowBox>
  );
};

export default PortfolioGroupTotal;
