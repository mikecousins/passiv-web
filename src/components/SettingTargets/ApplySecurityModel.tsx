import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Grid from '../../styled/Grid';
import { GreyBox } from './SettingTargets';
import { selectCurrentGroupTarget } from '../../selectors/groups';
import { BarsContainer, Bar, BarTarget, BarActual } from '../../styled/Target';
import { P } from '../../styled/GlobalElements';

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

const NoSecurities = styled(P)`
  text-align: center;
  font-weight: 600;
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
  console.log('model', model);

  return (
    <>
      {model?.model_portfolio_security.length > 0 ? (
        model?.model_portfolio_security.map((security: any) => {
          if (security.actualPercentage === undefined) {
            security.actualPercentage = 0;
          }
          return (
            <GreyBox key={security.symbol.id}>
              <Grid columns="3fr 1fr">
                <div>
                  <Symbol>{security.symbol.symbol}</Symbol>
                  <Description>{security.symbol.description}</Description>
                </div>
                <div>
                  <TargetPercent type="text" value={security.percent} />
                  <Percent>{security.actualPercentage.toFixed(1)}%</Percent>
                </div>
              </Grid>
              <BarsContainer style={{ background: 'white', width: '50%' }}>
                {!(security.actualPercentage === undefined) && (
                  <BarActual>
                    <Bar
                      style={{
                        width: `${security.actualPercentage.toFixed(0)}%`,
                      }}
                    >
                      {' '}
                    </Bar>
                  </BarActual>
                )}
                <BarTarget>
                  {security.percent < 0 ? (
                    <div style={{ width: '100%', backgroundColor: 'red' }}>
                      Warning: cash allocation cannot be negative!
                    </div>
                  ) : (
                    <Bar style={{ width: `${security.percent}%` }}> </Bar>
                  )}
                </BarTarget>
              </BarsContainer>
            </GreyBox>
          );
        })
      ) : (
        <NoSecurities>There are no securities in this model.</NoSecurities>
      )}
    </>
  );
};

export default ApplySecurityModel;
