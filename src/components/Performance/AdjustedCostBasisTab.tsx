import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import React, { FunctionComponent } from 'react';
import ShadowBox from '../../styled/ShadowBox';
import { AdjustedCostBasis, ACBSymbol } from '../../types/performance';
import { selectAdjustedCostBasis } from '../../selectors/performance';

const AdjustedCost = styled.span`
  font-weight: bold;
`;

export const AdjustedCostBasisTab = () => {
  const dispatch = useDispatch();
  const ACBs = useSelector(selectAdjustedCostBasis)?.data;

  return (
    <React.Fragment>
      {ACBs?.map((acb, adjustedCost) => (
        <div key={acb.symbol.id}>
          {acb.symbol.symbol}:{' '}
          <AdjustedCost>{acb.adjusted_cost.toFixed(2)}</AdjustedCost>
        </div>
      ))}
    </React.Fragment>
  );
};

export default AdjustedCostBasisTab;
