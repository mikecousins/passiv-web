import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postData } from '../../api';
import styled from '@emotion/styled';
import { loadModelPortfolios } from '../../actions';
import { selectModelPortfolios } from '../../selectors/modelPortfolios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import {
  selectCurrentGroupInfo,
  selectCurrentGroupPositionsWithActualPercentage,
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

const GroupName = styled(H2)`
  font-weight: 400;
  font-size: 40px;
  line-height: 50px;
`;

const SecurityNotInTarget = styled.div`
  margin: 50px 20px;
  border-top: 1px solid #bfb6b6;
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
    }
  }

  const currentGroupInfo = useSelector(selectCurrentGroupInfo);
  const [selectedModel, setSelectedModel] = useState<any>();
  const [originalModel, setOriginalModel] = useState<any>(
    currentGroupInfo?.model_portfolio,
  );
  const [selectedModelDetails, setSelectedModelDetails] = useState<any>();
  const [showDetails, setShowDetails] = useState(false);
  const [showDetailsId, setShowDetailsId] = useState('');

  const handleNewModelBtn = () => {
    postData('/api/v1/modelPortfolio/', {})
      .then(() => {
        dispatch(loadModelPortfolios());
      })
      .catch(() => {
        toast.error('Unable to create a new model');
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
        <Link to={'/model-setting'}>
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
