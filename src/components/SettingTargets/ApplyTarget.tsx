import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getData, postData } from '../../api';
import styled from '@emotion/styled';
import { loadModelPortfolios, loadGroupInfo } from '../../actions';
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
  selectCurrentGroupPositionsWithActualPercentage,
  selectCurrentGroupTrades,
  selectGroupedAccounts,
} from '../../selectors/groups';
import ShadowBox from '../../styled/ShadowBox';
import Grid from '../../styled/Grid';
import { H2, H3, P } from '../../styled/GlobalElements';
import { BackButton } from '../ModelPortfolio';
import { toast } from 'react-toastify';
import { Button } from '../../styled/Button';
import ApplySecurityModel from './ApplySecurityModel';
import { selectRouter } from '../../selectors/router';

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
  font-size: 40px;
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

const Alert = styled.div`
  background: hsla(10, 50%, 50%, 0.2);
  padding: 10px;
  width: 50%;
  font-size: 20px;
`;

const ApplyTarget = () => {
  const dispatch = useDispatch();
  const router = useSelector(selectRouter);
  const groups = useSelector(selectGroupedAccounts);
  const models = useSelector(selectModelPortfolios);
  const positions = useSelector(
    selectCurrentGroupPositionsWithActualPercentage,
  );

  let groupId: string;
  let modelId: string;
  let group;
  let model;
  if (
    router &&
    router.location &&
    router.location.pathname &&
    router.location.pathname.split('/').length === 7
  ) {
    groupId = router.location.pathname.split('/')[4];
    modelId = router.location.pathname.split('/')[6];
    if (groupId) {
      group = groups?.find((gp) => gp.groupId === groupId);
    }
    if (modelId) {
      model = models.find((mdl) => mdl.model_portfolio.id === modelId);
      model?.model_portfolio_security.map((security: any) => {
        const position = positions?.find(
          (position: any) => security.symbol.id === position.symbol.id,
        );
        security.actualPercentage = position?.actualPercentage;
      });
      // const securitiesNotInTarget = trades?.trades.filter(
      //   (trade: any) => !trade.symbol_in_target,
      // );
      // model.securities_not_in_targets = securitiesNotInTarget;
    }
  }

  const currentGroup = useSelector(selectCurrentGroup);
  const currentGroupInfo = useSelector(selectCurrentGroupInfo);

  const modelPortfolios: ModelPortfolioDetailsType[] = useSelector(
    selectModelPortfolios,
  );
  const [selectedModel, setSelectedModel] = useState<any>();
  const [originalModel, setOriginalModel] = useState<any>(
    currentGroupInfo?.model_portfolio,
  );
  const [selectedModelDetails, setSelectedModelDetails] = useState<any>();
  const [showDetails, setShowDetails] = useState(false);
  const [showDetailsId, setShowDetailsId] = useState('');
  const [loading, setLoading] = useState(false);
  const trades = useSelector(selectCurrentGroupTrades);
  const [modelHasChanged, setModelHasChanged] = useState(
    currentGroupInfo?.settings.model_portfolio_changed,
  );

  // const loadModelForCurrentGroup = (id: any) => {

  //   model?.model_portfolio_security.map((security: any) => {
  //     const position = positions?.find(
  //       (position: any) => security.symbol.id === position.symbol.id,
  //     );
  //     security.actualPercentage = position?.actualPercentage;
  //   });
  //   const securitiesNotInTarget = trades?.trades.filter(
  //     (trade: any) => !trade.symbol_in_target,
  //   );

  //   model.securities_not_in_targets = securitiesNotInTarget;
  //   const newArrayOfObj = model?.model_portfolio_security.map(
  //     ({ symbol: fullSymbol, ...rest }) => ({
  //       fullSymbol,
  //       ...rest,
  //     }),
  //   );
  //   setSelectedModelDetails(newArrayOfObj);
  // };

  // useEffect(() => {
  //   // if (
  //   //   currentGroupInfo?.model_portfolio?.model_type === 0 &&
  //   //   modelHasChanged
  //   // ) {
  //   //   // setLoading(true);
  //   //   // let model = currentGroupTarget;
  //   //   // const newArrayOfObj = model?.map(({ fullSymbol: symbol, ...rest }) => ({
  //   //   //   ...rest,
  //   //   // }));
  //   //
  //   //   setSelectedModelDetails(currentGroupTarget);
  //   //   setSelectedModel(currentGroupInfo?.model_portfolio);
  //   // } else if (
  //   //   currentGroupInfo?.model_portfolio?.model_type === 0 &&
  //   //   !modelHasChanged
  //   // ) {
  //   //   loadModelForCurrentGroup(currentGroupInfo?.model_portfolio.id);
  //   // }
  //   if (currentGroupInfo?.model_portfolio?.model_type === 0) {
  //     loadModelForCurrentGroup(currentGroupInfo?.model_portfolio.id);
  //   }
  //   // setLoading(false);
  // }, []);

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

  const handleApplyModelBtn = () => {
    return;
  };

  return (
    <ShadowBox>
      <BackButton>
        <Link to={'/app/model-setting'}>
          <FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to {group?.name}
        </Link>
      </BackButton>
      <GroupName>{group?.name}</GroupName>
      <div>
        {model?.model_portfolio.model_type === 0 && (
          <ApplySecurityModel model={model.model_portfolio_security} />
        )}
      </div>
      {selectedModelDetails?.securities_not_in_targets?.length > 0 && (
        <SecurityNotInTarget>
          <H3>Other Securities in this Group</H3>
          {selectedModelDetails?.securities_not_in_targets.map(
            (symbol: any) => {
              return (
                <Grid columns="100px 1fr">
                  <H3>{symbol.universal_symbol.symbol}</H3>
                  <P>{symbol.universal_symbol.description}</P>
                </Grid>
              );
            },
          )}
        </SecurityNotInTarget>
      )}
      {originalModel?.id !== selectedModel?.id && (
        <Button onClick={() => handleApplyModelBtn()}>Apply this Model</Button>
      )}
    </ShadowBox>
  );
};

export default ApplyTarget;
