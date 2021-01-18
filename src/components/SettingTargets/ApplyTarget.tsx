import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getData, postData } from '../../api';
import styled from '@emotion/styled';
import { loadGroup, loadGroupInfo, loadModelPortfolios } from '../../actions';
import { selectModelPortfolios } from '../../selectors/modelPortfolios';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import {
  faAngleDown,
  faAngleUp,
  faAngleLeft,
  faPlus,
  faSpinner,
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
import AssetClassModelDetails from './AssetClassModelDetails';

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

const GroupName = styled(H2)`
  font-weight: 400;
  line-height: 50px;
`;
const AssetDetails = styled.div`
  margin-left: 20px;
`;
const Name = styled.span`
  font-weight: 400;
  font-size: 23px;
`;
const Percent = styled.span`
  font-weight: 400;
  font-size: 33px;
`;
const SecurityNotInTarget = styled.div`
  margin: 50px 20px;
  border-top: 1px solid #bfb6b6;
`;

const NoSecurities = styled(P)`
  text-align: center;
  font-weight: 600;
`;

const ApplyTarget = () => {
  const dispatch = useDispatch();
  const currentGroup = useSelector(selectCurrentGroup);
  const currentGroupInfo = useSelector(selectCurrentGroupInfo);
  const modelPortfolios: ModelPortfolioDetailsType[] = useSelector(
    selectModelPortfolios,
  );
  const [selectedName, setSelectedName] = useState('Apply a Model');
  const [selectedModelDetails, setSelectedModelDetails] = useState<any>();
  const [showDetails, setShowDetails] = useState(false);
  const [showDetailsId, setShowDetailsId] = useState('');
  const [loading, setLoading] = useState(false);

  const loadModelForCurrentGroup = () => {
    //! have to make an action for this
    getData(
      `/api/v1/portfolioGroups/${currentGroup?.id}/modelPortfolio/${currentGroupInfo?.model_portfolio?.id}`,
    )
      .then((res) => {
        setSelectedModelDetails(res.data);
        setSelectedName(currentGroupInfo?.model_portfolio?.name);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Loading Model Failed.');
      });
  };

  useEffect(() => {
    if (currentGroupInfo?.model_portfolio) {
      setSelectedName(currentGroupInfo?.model_portfolio.name);
      setLoading(true);
      loadModelForCurrentGroup();
    }
  }, [currentGroup, currentGroupInfo]);

  const getAssetClass = (id: string) => {
    const securityIds: string[] = [];
    getData(`/api/v1/modelAssetClass/${id}`).then((res) => {
      res.data.model_asset_class_target.map((symbol: any) => {
        securityIds.push(symbol.symbol.id);
      });
    });
    return securityIds;
  };

  const handleModelSelect = (model: ModelPortfolioDetailsType) => {
    setLoading(true);
    if (model.model_portfolio.model_type === 0) {
      postData(
        `/api/v1/portfolioGroups/${currentGroup?.id}/modelPortfolio/${model.model_portfolio.id}`,
        {},
      )
        .then((res) => {
          dispatch(loadModelPortfolios());
          dispatch(loadGroupInfo());
          loadModelForCurrentGroup();
          toast.success(
            `"${model.model_portfolio.name}" model applied to "${currentGroup?.name}".`,
            { autoClose: 3000 },
          );
        })
        .catch(() => {
          toast.error(
            `"${model.model_portfolio.name}" model failed to apply to "${currentGroup?.name}".`,
            { autoClose: 3000 },
          );
        });
    }
    // else {
    //   const priorities: any[] = [];
    //   model.model_portfolio_asset_class.map((assetClass) => {
    //     let assetClassObj;
    //     let assetClassSecurities = getAssetClass(
    //       assetClass.model_asset_class.id,
    //     );
    //     let symbolPriority: any[] = [];
    //     // @ts-ignore
    //     assetClassSecurities.map((securityId: any) => {
    //       symbolPriority.push({
    //         symbol_id: securityId,
    //         accounts_id: [],
    //       });
    //     });
    //     assetClassObj = {
    //       model_asset_class: {
    //         id: assetClass.model_asset_class.id,
    //         name: assetClass.model_asset_class.name,
    //       },
    //       symbols_accounts_priorities: symbolPriority,
    //     };
    //     priorities.push(assetClassObj);
    //   });
    //   const body = {
    //     priorities: priorities,
    //     securities_not_in_targets: [],
    //     excluded_symbols: [],
    //   };
    //   postData(
    //     `/api/v1/portfolioGroups/${currentGroup?.id}/modelPortfolio/${model.model_portfolio.id}`,
    //     body,
    //   )
    //     .then((res) => {
    //       dispatch(loadModelPortfolios());
    //       dispatch(loadGroupInfo());
    //       loadModelForCurrentGroup();
    //       toast.success(
    //         `"${model.model_portfolio.name}" model applied to "${currentGroup?.name}".`,
    //         { autoClose: 3000 },
    //       );
    //     })
    //     .catch(() => {
    //       toast.error(
    //         `"${model.model_portfolio.name}" model failed to apply to "${currentGroup?.name}".`,
    //         { autoClose: 3000 },
    //       );
    //     });
    // }
  };

  const handleNewModelBtn = () => {
    postData('/api/v1/modelPortfolio/', {})
      .then(() => {
        dispatch(loadModelPortfolios());
      })
      .catch(() => {
        toast.error('Unable to create a new model.', { autoClose: 3000 });
      });
  };

  const showDetailsHere = (assetClassId: string) => {
    if (showDetails && showDetailsId === assetClassId) {
      return true;
    }
    return false;
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
          <GroupName>{currentGroup?.name}</GroupName>
          <Menu>
            <StyledMenuButton>
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                selectedName
              )}
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
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : currentGroupInfo?.model_portfolio?.model_type === 0 &&
          selectedModelDetails ? (
          selectedModelDetails?.model_portfolio_securities?.length < 1 ? (
            <NoSecurities>No securities exist in this Model.</NoSecurities>
          ) : (
            selectedModelDetails?.model_portfolio_securities.map(
              (security: any) => {
                return (
                  <GreyBox key={security.symbol.id}>
                    <Grid columns="3fr 1fr">
                      <Name>{security.symbol.symbol}</Name>{' '}
                      <div>
                        <Percent>{security.percent}%</Percent>{' '}
                      </div>
                    </Grid>
                  </GreyBox>
                );
              },
            )
          )
        ) : selectedModelDetails?.model_asset_classes_preview?.length < 1 ? (
          <NoSecurities>No asset class exist in this Model.</NoSecurities>
        ) : (
          selectedModelDetails?.model_asset_classes_preview.map(
            (assetClass: any) => {
              const assetClassId =
                assetClass.model_portfolio_asset_class.model_asset_class.id;
              return (
                <>
                  <GreyBox key={assetClassId}>
                    <Grid columns="3fr 1fr 100px">
                      <Name>
                        {
                          assetClass.model_portfolio_asset_class
                            .model_asset_class.name
                        }
                      </Name>{' '}
                      <div>
                        <Percent>
                          {assetClass.model_portfolio_asset_class.percent}%
                        </Percent>{' '}
                      </div>
                      <FontAwesomeIcon
                        icon={
                          showDetailsHere(assetClassId)
                            ? faAngleUp
                            : faAngleDown
                        }
                        size="2x"
                        color="var(--brand-blue)"
                        cursor="pointer"
                        onClick={() => {
                          setShowDetails(!showDetails);
                          setShowDetailsId(assetClassId);
                        }}
                      />
                    </Grid>
                  </GreyBox>
                  {showDetailsHere(assetClassId) && (
                    <AssetDetails>
                      <AssetClassModelDetails
                        assetClassesDetails={selectedModelDetails}
                        assetClassId={assetClassId}
                      />
                    </AssetDetails>
                  )}
                </>
              );
            },
          )
        )}
      </div>
      {selectedModelDetails?.securities_not_in_targets.length > 0 && (
        <SecurityNotInTarget>
          <H3 style={{ marginBottom: '20px' }}>
            Other Securities in this Group
          </H3>
          {selectedModelDetails?.securities_not_in_targets.map(
            (symbol: any) => {
              return (
                <Grid columns="100px 1fr">
                  <H3 style={{ fontSize: '16px', marginBottom: '10px' }}>
                    {symbol.symbol}
                  </H3>
                  <P>{symbol.description}</P>
                </Grid>
              );
            },
          )}
        </SecurityNotInTarget>
      )}
    </ShadowBox>
  );
};

export default ApplyTarget;
