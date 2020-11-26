import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postData } from '../api';
import { H1 } from '../styled/GlobalElements';
import { StyledP } from './ModelAssetClassPage';
import { useSelector } from 'react-redux';
import { selectModelPortfolios } from '../selectors/modelPortfolios';
import { ModelPortfolioDetailsType } from '../types/modelPortfolio';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { loadModelPortfolios } from '../actions';

const StyledMenu = styled(Menu)``;

const StyledMenuButton = styled(MenuButton)`
  border: 1px solid var(--brand-blue);
  padding: 20px;
  color: var(--brand-blue);
  font-size: 18px;
  font-weight: 900;
`;

const StyledMenuList = styled(MenuList)`
  padding: 22px;
`;

const StyledMenuItem = styled(MenuItem)`
  color: var(--brand-blue);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const NewModelBtn = styled.button`
  font-size: 18px;
  font-weight: 600;
`;

const SettingTargetsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const modelPortfolios: ModelPortfolioDetailsType[] = useSelector(
    selectModelPortfolios,
  );

  const handleNewModelBtn = () => {
    postData('/api/v1/modelPortfolio/', {})
      .then((res: any) => {
        const id = res.data.model_portfolio.id;
        history.replace(`model-portfolio/${id}`);
        dispatch(loadModelPortfolios());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <H1>Setting Targets</H1>
      <StyledP>
        Adjust your holdings target percentages or apply one of your model
        portfolios
      </StyledP>

      <ShadowBox>
        <StyledMenu>
          <StyledMenuButton>
            Securities Default
            <span aria-hidden style={{ marginLeft: '20px' }}>
              <FontAwesomeIcon icon={faAngleDown} size="lg" />
            </span>
          </StyledMenuButton>
          <StyledMenuList>
            {modelPortfolios.map((mdl) => {
              return (
                <StyledMenuItem
                  onSelect={() =>
                    history.replace(`model-portfolio/${mdl.model_portfolio.id}`)
                  }
                  key={mdl.model_portfolio.id}
                >
                  {mdl.model_portfolio.name}
                </StyledMenuItem>
              );
            })}
            <NewModelBtn onClick={handleNewModelBtn}>
              <FontAwesomeIcon
                icon={faPlus}
                size="sm"
                style={{ marginRight: '5px' }}
              />
              Create New Model
            </NewModelBtn>
          </StyledMenuList>
        </StyledMenu>
      </ShadowBox>
    </React.Fragment>
  );
};

export default SettingTargetsPage;
