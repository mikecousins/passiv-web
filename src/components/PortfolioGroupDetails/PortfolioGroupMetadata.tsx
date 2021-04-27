import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { TruncatedText } from '../../styled/GlobalElements';
import styled from '@emotion/styled';

const MetaHorizontal = styled.div`
  text-align: left;
  font-size: 20px;
  padding-top: 34px;
  @media (max-width: 900px) {
    margin-bottom: 10px;
  }
  div {
    margin-bottom: 8px;
  }
  span {
    font-weight: 700;
    margin-bottom: 8px;
    display: inline-block;
    margin-right: 6px;
    text-align: left;
  }
`;

type Props = {
  account: any;
};

const PortfolioGroupMetadata = ({ account }: Props) => {
  return (
    <div>
      <MetaHorizontal>
        <TruncatedText>
          <span>Account #: </span>
          {account ? (
            account.number === 'N/A' ? (
              account.number
            ) : (
              account.number.slice(0).replace(/.(?=..)/g, 'x')
            )
          ) : (
            <FontAwesomeIcon icon={faSpinner} spin />
          )}
        </TruncatedText>
        <TruncatedText>
          <span>Type: </span>
          {account ? account.type : <FontAwesomeIcon icon={faSpinner} spin />}
        </TruncatedText>
        <TruncatedText>
          <span>Institution: </span>
          {account && account.institution_name}
        </TruncatedText>
      </MetaHorizontal>
    </div>
  );
};

export default PortfolioGroupMetadata;
