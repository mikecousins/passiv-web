import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Grid from '../../styled/Grid';
import { GreyBox } from './SettingTargets';
import { selectCurrentGroupTarget } from '../../selectors/groups';

const Symbol = styled.span`
  font-weight: 600;
  font-size: 22px;
`;
const Description = styled.span`
  font-size: 22px;
  margin-left: 20px;
`;
const Percent = styled.span`
  font-weight: 400;
  font-size: 33px;
`;
const TargetPercent = styled.input`
  font-weight: 600;
  font-size: 33px;
  margin-right: 50px;
  color: var(--brand-blue);
  width: 150px;
  text-align: center;
  background: white;
  border: 2px solid var(--brand-blue);
  padding: 5px;
  position: relative;
`;

type Props = {
  model: any;
};

const ApplySecurityModel = ({ model }: Props) => {
  const currentGroupTarget = useSelector(selectCurrentGroupTarget);

  const actualPercent = (symbolId: string) => {
    let actualPercent = 0;
    currentGroupTarget?.forEach((target: any) => {
      if (target.id === symbolId) {
        actualPercent = target.actualPercentage;
      }
    });
    return actualPercent?.toFixed(0);
  };

  return (
    <>
      {model?.model_portfolio_securities.map((security: any) => {
        return (
          <GreyBox key={security.symbol.id}>
            <Grid columns="3fr 1fr">
              <div>
                <Symbol>{security.symbol.symbol}</Symbol>
                <Description>{security.symbol.description}</Description>
              </div>
              <div>
                <TargetPercent type="text" value={security.percent} />
                <Percent>{actualPercent(security.symbol.id)}%</Percent>
              </div>
            </Grid>
          </GreyBox>
        );
      })}
    </>
  );
};

export default ApplySecurityModel;
