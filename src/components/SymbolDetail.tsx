import React from 'react';
import styled from '@emotion/styled';
import { Symbol } from '../styled/Group';

const SymbolNameBox = styled.span`
  line-height: 1.5em;
  @media (min-width: 900px) {
    padding-left: 10px;
  }
  @media (max-width: 900px) {
    display: none;
    margin-top: 12px;
    line-height: 1.4;
    font-weight: 600;
  }
`;

const AssetClassName = styled(SymbolNameBox)`
  @media (min-width: 900px) {
    padding-left: 0px;
  }
  @media (max-width: 900px) {
    display: block;
    margin-top: 0px;
    line-height: 1.4;
    font-weight: 600;
  }
`;

type Props = {
  symbol: any;
  assetClass?: boolean;
};

const SymbolDetail = ({ symbol, assetClass = false }: Props) => {
  if (assetClass) {
    return (
      <span title={`${symbol}`}>
        <AssetClassName>{symbol}</AssetClassName>
      </span>
    );
  } else {
    let ticker: string = '';
    let name: string = '';
    if (symbol) {
      ticker = symbol.symbol;
      name =
        symbol.description !== undefined ? symbol.description : symbol.name;
    }

    return (
      <span title={`${ticker} (${name})`}>
        <Symbol>{ticker}</Symbol>
        <SymbolNameBox>{name}</SymbolNameBox>
      </span>
    );
  }
};

export default SymbolDetail;
