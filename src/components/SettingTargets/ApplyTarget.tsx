import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {
  selectCurrentGroup,
  selectCurrentGroupInfo,
  selectCurrentGroupPositions,
  selectCurrentGroupTarget,
  selectCurrentGroupTotalEquityExcludedRemoved,
  selectCurrentGroupTrades,
  selectPreferredCurrency,
} from '../../selectors/groups';
import ShadowBox from '../../styled/ShadowBox';
import Grid from '../../styled/Grid';
import { H2, H3, P, Table } from '../../styled/GlobalElements';
import { GreyBox } from './SettingTargets';
import { BackButton } from '../ModelPortfolio/ModelPortfolio';
import { toast } from 'react-toastify';
import AssetClassModelDetails from './AssetClassModelDetails';
import { Button } from '../../styled/Button';
import ApplySecurityModel from './ApplySecurityModel';
import { debug } from 'console';
import { selectCurrencyRates } from '../../selectors';

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
  const [modelChanged, setModelChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentGroupTarget = useSelector(selectCurrentGroupTarget);
  const trades = useSelector(selectCurrentGroupTrades);
  const currentGroupPositions = useSelector(selectCurrentGroupPositions);
  const preferredCurrency = useSelector(selectPreferredCurrency);
  const totalHoldingsExcludedRemoved = useSelector(
    selectCurrentGroupTotalEquityExcludedRemoved,
  );
  const rates = useSelector(selectCurrencyRates);

  const loadModelForCurrentGroup = (id: any) => {
    // getData(
    //   `/api/v1/portfolioGroups/${currentGroup?.id}/modelPortfolio/${currentGroupInfo?.model_portfolio?.id}`,
    // )
    //   .then((res) => {
    //     setSelectedModelDetails(res.data);
    //     setSelectedName(currentGroupInfo?.model_portfolio?.name);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     toast.error('Loading Model Failed.');
    //   });
    let model = modelPortfolios.find(
      (model: ModelPortfolioDetailsType) => model.model_portfolio.id === id,
    );
    //@ts-ignore
    model?.model_portfolio_security.map((security: any) => {
      currentGroupPositions?.map((position: any) => {
        if (security.symbol.id === position.symbol.id) {
          //@ts-ignore
          if (
            preferredCurrency &&
            position.symbol.currency.id === preferredCurrency.id
          ) {
            security.actualPercentage =
              ((position.price * position.units) /
                totalHoldingsExcludedRemoved) *
              100;
          } else {
            const conversionRate = rates?.find(
              (rate: any) =>
                preferredCurrency &&
                rate.src.id === position.symbol.currency.id &&
                rate.dst.id === preferredCurrency.id,
            );
            if (conversionRate) {
              security.actualPercentage =
                ((position.price * position.units) /
                  totalHoldingsExcludedRemoved) *
                100 *
                conversionRate.exchange_rate;
            }
          }
        }
      });
    });
    const securitiesNotInTarget = trades?.trades.filter(
      (trade: any) => !trade.symbol_in_target,
    );
    //@ts-ignore
    model.securities_not_in_targets = securitiesNotInTarget;
    setSelectedModelDetails(model);
    //@ts-ignore
    setSelectedName(model?.model_portfolio.name);
  };

  useEffect(() => {
    if (currentGroupInfo?.model_portfolio.model_type === 0) {
      setLoading(true);
      loadModelForCurrentGroup(currentGroupInfo?.model_portfolio.id);
    }
    setLoading(false);
  }, [currentGroup, currentGroupInfo]);

  const handleModelSelect = (model: ModelPortfolioDetailsType) => {
    if (model.model_portfolio.model_type === 0) {
      loadModelForCurrentGroup(model.model_portfolio.id);
      // setLoading(true);
      // getData(
      //   `/api/v1/portfolioGroups/${currentGroup?.id}/modelPortfolio/${model.model_portfolio.id}`,
      // )
      //   .then((res) => {
      //     // dispatch(loadModelPortfolios());
      //     // dispatch(loadGroupInfo());
      //     // loadModelForCurrentGroup();
      //     setSelectedModelDetails(res.data);
      //     setSelectedName(model.model_portfolio.name);
      //     setModelChanged(true);
      //     setLoading(false);
      //     toast.success(
      //       `"${model.model_portfolio.name}" model applied to "${currentGroup?.name}".`,
      //       { autoClose: 3000 },
      //     );
      //   })
      //   .catch(() => {
      //     toast.error(
      //       `"${model.model_portfolio.name}" model failed to apply to "${currentGroup?.name}".`,
      //       { autoClose: 3000 },
      //     );
      //   });
      //
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

  const handleSaveButton = () => {
    setModelChanged(false);
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
        {currentGroupInfo?.model_portfolio?.model_type === 0 &&
          selectedModelDetails && (
            <ApplySecurityModel model={selectedModelDetails} />
          )}
      </div>
      {/* {selectedModelDetails?.securities_not_in_targets.length > 0 && (
        <SecurityNotInTarget>
          <H3 style={{ marginBottom: '20px' }}>
            Other Securities in this Group
          </H3>
          {selectedModelDetails?.securities_not_in_targets.map(
            (symbol: any) => {
              return (
                <Grid columns="100px 1fr">
                  <H3 style={{ fontSize: '16px', marginBottom: '10px' }}>
                    {symbol.universal_symbol.symbol}
                  </H3>
                  <P>{symbol.universal_symbol.description}</P>
                </Grid>
              );
            },
          )}
        </SecurityNotInTarget>
      )} */}
      {modelChanged && <Button onClick={() => handleSaveButton()}>Save</Button>}
    </ShadowBox>
  );
};

export default ApplyTarget;
