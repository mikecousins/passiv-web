import React from 'react';
import ShadowBox from '../styled/ShadowBox';
import DemoNotesContent from './DemoNotesContent';
import styled from '@emotion/styled';
import { Symbol } from '../styled/Group';

const SymbolNameBox = styled.span`
  @media (min-width: 900px) {
    padding-left: 10px;
  }
  @media (max-width: 900px) {
    margin-top: 12px;
    line-height: 1.4;
    font-weight: 600;
  }
`;

type Props = {
  symbol: any;
};

export const SymbolDetail = ({ symbol }: Props) => {
  return (
    <React.Fragment>
      <Symbol>{symbol.symbol}</Symbol>
      <SymbolNameBox>
        {symbol.description !== undefined ? symbol.description : symbol.name}
      </SymbolNameBox>
    </React.Fragment>
  );
};

export default SymbolDetail;
