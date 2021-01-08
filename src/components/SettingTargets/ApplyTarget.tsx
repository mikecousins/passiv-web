import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getData, postData } from '../../api';
import styled from '@emotion/styled';
import { loadModelPortfolios } from '../../actions';
import { selectModelPortfolios } from '../../selectors/modelPortfolios';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  selectCurrentGroup,
  selectCurrentGroupInfo,
} from '../../selectors/groups';
import ShadowBox from '../../styled/ShadowBox';
import Grid from '../../styled/Grid';
import { H2, P } from '../../styled/GlobalElements';
import { GreyBox } from './SettingTargets';

const StyledMenuButton = styled(MenuButton)`
  border: 1px solid var(--brand-blue);
  padding: 20px;
  color: var(--brand-blue);
  font-size: 18px;
  font-weight: 900;
`;

const StyledMenuList = styled(MenuList)`
  padding: 0.5rem;
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

const TopInfo = styled.div`
  margin-bottom: 30px;
`;
const ModelDetails = styled.div``;

const ApplyTarget = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentGroup = useSelector(selectCurrentGroup);
  const currentGroupInfo = useSelector(selectCurrentGroupInfo);
  const modelPortfolios: ModelPortfolioDetailsType[] = useSelector(
    selectModelPortfolios,
  );
  const [selectedName, setSelectedName] = useState('Apply a Model');
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    if (currentGroupInfo?.model_portfolio) {
      setSelectedName(currentGroupInfo?.model_portfolio.name);
      getData(
        `/api/v1/modelPortfolio/${currentGroupInfo.model_portfolio.id}`,
      ).then((res) => {
        setSelectedModel(res.data);
      });
    }
  }, []);

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
    <ShadowBox>
      <TopInfo>
        <Grid columns="1fr 300px">
          <H2 style={{ fontWeight: 400, lineHeight: '50px' }}>
            {currentGroup?.name}
          </H2>
          <Menu>
            <StyledMenuButton>
              {selectedName}
              <span aria-hidden style={{ marginLeft: '30px' }}>
                <FontAwesomeIcon icon={faAngleDown} size="lg" />
              </span>
            </StyledMenuButton>
            <StyledMenuList>
              {modelPortfolios.map((mdl) => {
                return (
                  <StyledMenuItem
                    onSelect={() => {
                      setSelectedName(mdl.model_portfolio.name);
                    }}
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
          </Menu>
        </Grid>
      </TopInfo>
      <ModelDetails>
        {selectedModel && //TODO fix this
        /* @ts-ignore */
        selectedModel.model_portfolio.model_type === 0 && //TODO fix this
          /* @ts-ignore */
          selectedModel.model_portfolio_security.map((security) => {
            return (
              <GreyBox>
                <Grid columns="3fr 1fr">
                  <span style={{ fontWeight: 400, fontSize: '23px' }}>
                    {security.symbol.symbol}
                  </span>{' '}
                  <div>
                    <span style={{ fontWeight: 400, fontSize: '33px' }}>
                      {security.percent}%
                    </span>{' '}
                  </div>
                  {/* <FontAwesomeIcon
                    icon={faAngleDown}
                    size="2x"
                    color="var(--brand-blue)"
                    cursor="pointer"
                    onClick={() => console.log('hey')}
                  /> */}
                </Grid>
              </GreyBox>
            );
          })}
      </ModelDetails>
    </ShadowBox>
  );
};

export default ApplyTarget;
