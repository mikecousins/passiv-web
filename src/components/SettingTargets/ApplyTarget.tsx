import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getData, postData } from '../../api';
import styled from '@emotion/styled';
import { loadModelPortfolios } from '../../actions';
import { selectModelPortfolios } from '../../selectors/modelPortfolios';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import {
  faAngleDown,
  faAngleUp,
  faAngleLeft,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  selectCurrentGroup,
  selectCurrentGroupInfo,
} from '../../selectors/groups';
import ShadowBox from '../../styled/ShadowBox';
import Grid from '../../styled/Grid';
import { H2, H3, P } from '../../styled/GlobalElements';
import { GreyBox } from './SettingTargets';
import { BackButton } from '../ModelPortfolio/ModelPortfolio';
import { toast } from 'react-toastify';

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
const AssetDetails = styled.div`
  margin-left: 20px;
`;

const ApplyTarget = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentGroup = useSelector(selectCurrentGroup);
  const currentGroupInfo = useSelector(selectCurrentGroupInfo);
  const modelPortfolios: ModelPortfolioDetailsType[] = useSelector(
    selectModelPortfolios,
  );
  const [selectedName, setSelectedName] = useState('Apply a Model');
  const [selectedModel, setSelectedModel] = useState<
    ModelPortfolioDetailsType
  >();
  const [selectedModelDetails, setSelectedModelDetails] = useState();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (currentGroupInfo?.model_portfolio) {
      setSelectedName(currentGroupInfo?.model_portfolio.name);
      getData(
        `/api/v1/modelPortfolio/${currentGroupInfo.model_portfolio.id}`,
      ).then((res) => {
        setSelectedModel(res.data);
        getData(
          `/api/v1/portfolioGroups/${currentGroup?.id}/modelPortfolio/${currentGroupInfo?.model_portfolio.id}`,
        ).then((res) => {
          setSelectedModelDetails(res.data);
        });
      });
    }
  }, [currentGroup, currentGroupInfo]);

  const handleModelSelect = (model: ModelPortfolioDetailsType) => {
    if (model.model_portfolio.id === selectedModel?.model_portfolio.id) {
      return;
    }
    postData(
      `/api/v1/portfolioGroups/${currentGroup?.id}/modelPortfolio/${model.model_portfolio.id}`,
      {},
    )
      .then(() => {
        setSelectedModel(model);
        setSelectedName(model.model_portfolio.name);
        toast.success(
          `"${model.model_portfolio.name}" model applied to "${currentGroup?.name}"`,
          { autoClose: 3000 },
        );
      })
      .catch(() => {
        // check when symbol is not supported
      });
  };

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

  const previewAssetClass = (assetClassId: string) => {
    const preview: any = [];
    // @ts-ignore
    selectedModelDetails?.model_asset_classes_preview.map((model: any) => {
      if (model.model_asset_class.id === assetClassId) {
        model.model_asset_class_accounts_preview.map((asset: any) => {
          return preview.push(asset);
        });
      }
    });

    let accountName;
    let assets;
    let pre;
    preview.map((p: any) => {
      accountName = (
        <H3 style={{ fontSize: '18px', marginBottom: '20px' }}>
          {p.account.number}
        </H3>
      );
      assets = p.tradable_symbols.map((symbol: any) => {
        return (
          <Grid columns="100px 1fr">
            <H3 style={{ fontSize: '16px', marginBottom: '10px' }}>
              {symbol.symbol}
            </H3>
            <P>{symbol.description}</P>
          </Grid>
        );
      });
    });
    // @ts-ignore
    pre = [accountName, assets];
    return pre;
  };

  return (
    <ShadowBox>
      <BackButton>
        <Link to={'/app/setting-targets'}>
          <FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Groups
        </Link>
      </BackButton>
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
                      handleModelSelect(mdl);
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
      <div>
        {
          //TODO fix this
          /* @ts-ignore */
          selectedModel?.model_portfolio.model_type === 0
            ? selectedModel?.model_portfolio_security.map((security) => {
                return (
                  <GreyBox key={security.symbol.id}>
                    <Grid columns="3fr 1fr">
                      <span style={{ fontWeight: 400, fontSize: '23px' }}>
                        {security.symbol.symbol}
                      </span>{' '}
                      <div>
                        <span style={{ fontWeight: 400, fontSize: '33px' }}>
                          {security.percent}%
                        </span>{' '}
                      </div>
                    </Grid>
                  </GreyBox>
                );
              }) //TODO fix this
            : /* @ts-ignore */
              selectedModel?.model_portfolio_asset_class.map((assetClass) => {
                return (
                  <>
                    <GreyBox key={assetClass.model_asset_class.id}>
                      <Grid columns="3fr 1fr 100px">
                        <span style={{ fontWeight: 400, fontSize: '23px' }}>
                          {assetClass.model_asset_class.name}
                        </span>{' '}
                        <div>
                          <span style={{ fontWeight: 400, fontSize: '33px' }}>
                            {assetClass.percent}%
                          </span>{' '}
                        </div>
                        <FontAwesomeIcon
                          icon={showDetails ? faAngleUp : faAngleDown}
                          size="2x"
                          color="var(--brand-blue)"
                          cursor="pointer"
                          onClick={() => setShowDetails(!showDetails)}
                        />
                      </Grid>
                    </GreyBox>
                    {showDetails && (
                      <AssetDetails>
                        {previewAssetClass(assetClass.model_asset_class.id)}{' '}
                      </AssetDetails>
                    )}
                  </>
                );
              })
        }
      </div>
    </ShadowBox>
  );
};

export default ApplyTarget;
