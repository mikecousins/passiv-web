import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';

const MetaHorizontal = styled.div`
  text-align: left;
  @media (max-width: 900px) {
    margin-bottom: 10px;
  }
  span {
    font-weight: 600;
    margin-bottom: 8px;
    display: inline-block;
    margin-right: 6px;
    text-align: left;
  }
`;

const PortfolioGroupMetadata = () => {
  const firstAccount = {
    number: 1234,
    type: 'test',
  };

  return (
    <ShadowBox>
      <MetaHorizontal>
        <div>
          <span>Account #: </span>
          {firstAccount ? (
            firstAccount.number
          ) : (
            <FontAwesomeIcon icon={faSpinner} spin />
          )}
        </div>
        <div>
          <span>Type: </span>
          {firstAccount ? (
            firstAccount.type
          ) : (
            <FontAwesomeIcon icon={faSpinner} spin />
          )}
        </div>
      </MetaHorizontal>
    </ShadowBox>
  );
};

export default PortfolioGroupMetadata;
