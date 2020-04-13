import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import React from 'react';
import { selectAdjustedCostBasis } from '../../selectors/performance';

const AdjustedCost = styled.span`
  font-weight: bold;
`;

const UnitsOwned = styled.span`
  font-weight: bold;
`;

const Row = styled.div`
  margin-bottom: 8px;
`;

export const AdjustedCostBasisTab = () => {
  const ACBs = useSelector(selectAdjustedCostBasis)?.data;

  return (
    <React.Fragment>
      {ACBs?.map((acb, adjustedCost) => (
        <Row key={acb.symbol.id}>
          {acb.symbol.symbol}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <UnitsOwned>{acb.units_owned}</UnitsOwned> units owned at&nbsp;
          <AdjustedCost>${acb.adjusted_cost.toFixed(2)}</AdjustedCost>
          <br />
        </Row>
      ))}
    </React.Fragment>
  );
};

export default AdjustedCostBasisTab;
