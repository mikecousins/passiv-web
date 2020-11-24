import React, { useState } from 'react';
import { H1 } from '../styled/GlobalElements';
import { StyledP } from './ModelAssetClassPage';
import { useSelector } from 'react-redux';
import { selectModelPortfolios } from '../selectors/modelPortfolios';
import { ModelPortfolioDetailsType } from '../types/modelPortfolio';
import ShadowBox from '../styled/ShadowBox';
import { Redirect } from 'react-router';

const SettingTargetsPage = () => {
  const modelPortfolios: ModelPortfolioDetailsType[] = useSelector(
    selectModelPortfolios,
  );

  const [goToModel, setGoToModel] = useState(false);
  const [id, setId] = useState('');

  if (goToModel) {
    return <Redirect to={`model-portfolio/${id}`} />;
  }

  return (
    <React.Fragment>
      <H1>Setting Targets</H1>
      <StyledP>
        Adjust your holdings target percentages or apply one of your model
        portfolios
      </StyledP>

      <ShadowBox>
        <ul>
          {modelPortfolios.map((mdl) => {
            return (
              <button
                style={{ color: 'blue' }}
                onClick={() => {
                  setId(mdl.model_portfolio.id!);
                  setGoToModel(true);
                }}
              >
                {mdl.model_portfolio.name}
              </button>
            );
          })}
        </ul>
      </ShadowBox>
    </React.Fragment>
  );
};

export default SettingTargetsPage;
