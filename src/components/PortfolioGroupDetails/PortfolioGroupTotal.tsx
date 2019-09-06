import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import ShadowBox from '../../styled/ShadowBox';
import { Title, Total, Center } from '../../styled/PortfolioGroupDetails';
import Number from '../Number';
import { Error } from '../../types/groupInfo';

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
