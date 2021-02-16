import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postData } from '../api';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {
  selectGroupInfoForModelPortfolio,
  selectModelPortfolios,
} from '../selectors/modelPortfolios';
import { ModelPortfolioDetailsType } from '../types/modelPortfolio';
import { loadGroup, loadModelPortfolios } from '../actions';
import { Button } from '../styled/Button';
import { H1, H3, Table } from '../styled/GlobalElements';
import Grid from '../styled/Grid';
import { ViewBtn } from '../styled/Group';
import ShadowBox from '../styled/ShadowBox';
import { StyledP } from './ModelAssetClassPage';
import { group } from 'console';

export const TransparentButton = styled(Button)`
  background-color: transparent;
  color: var(--brand-blue);
  border: 3px solid var(--brand-blue);
  padding: 20px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 18px;
`;
const StyledViewBtn = styled(ViewBtn)`
  width: 100%;
  text-align: center;
  display: flex;
  button {
    color: var(--brand-blue);
    font-size: 20px;
    font-weight: 700;
  }
`;
const NewModelButton = styled(Button)`
  padding: 23px 50px;
  font-weight: 600;
  font-size: 18px;
`;
const ModelName = styled(H3)`
  font-size: 22px;
  font-weight: 600;
`;
const InUseDiv = styled.div`
  font-size: 20px;
`;
const InUse = styled.span`
  font-weight: 600;
  margin-right: 7px;
`;

const MyModelPortfoliosPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const modelPortfolios: ModelPortfolioDetailsType[] = useSelector(
    selectModelPortfolios,
  );

  const group = useSelector(selectGroupInfoForModelPortfolio);
  const groupInfo = group.groupInfo;
  const groupId = groupInfo?.groupId;

  const handleNewModelBtn = () => {
    postData('/api/v1/modelPortfolio/', {})
      .then((res: any) => {
        dispatch(loadModelPortfolios());
        const id = res.data.model_portfolio.id;
        history.replace(`model-portfolio/${id}`);
      })
      .catch(() => {
        toast.error('Failed to create a new model.');
      });
  };

  const handleApplyOrViewBtn = (model: any) => {
    const modelId = model.model_portfolio.id;
    if (groupId) {
      postData(
        `api/v1/portfolioGroups/${groupId}/modelPortfolio/${modelId}`,
        {},
      ).then((res) => {
        dispatch(loadGroup({ ids: [groupId] }));
        dispatch(loadModelPortfolios());
        toast.success(
          `"${model.model_portfolio.name}" applied to "${groupInfo?.name}"`,
        );
        history.push(`/app/group/${groupId}`);
      });
    } else {
      history.replace(`model-portfolio/${modelId}`);
    }
  };

  return (
    <React.Fragment>
      <H1>Model Portfolios</H1>
      <Table>
        <StyledP>
          A model portfolio is a group of assets and target allocations that are
          designed to meet a particular investing goal.
        </StyledP>
        {!groupId && (
          <div>
            {' '}
            <TransparentButton onClick={() => history.replace('asset-class')}>
              Edit Asset Classes
            </TransparentButton>
            <NewModelButton onClick={() => handleNewModelBtn()}>
              New Model
            </NewModelButton>
          </div>
        )}
      </Table>
      <div style={{ marginTop: '50px' }}>
        {modelPortfolios.map((mdl) => {
          return (
            <ShadowBox
              key={mdl.model_portfolio.id}
              style={{ lineHeight: '2rem' }}
            >
              <Grid columns={groupId ? '2fr 1fr 250px' : '2fr 1fr 150px 150px'}>
                <ModelName>{mdl.model_portfolio.name}</ModelName>
                <InUseDiv>
                  {mdl.model_portfolio.total_assigned_portfolio_groups > 0 && (
                    <>
                      <FontAwesomeIcon
                        icon={faCheck}
                        size="lg"
                        style={{
                          marginRight: '8px',
                          color: 'var(--brand-green)',
                        }}
                      />
                      <InUse>In Use</InUse> |{' '}
                      {mdl.model_portfolio.total_assigned_portfolio_groups}{' '}
                      Group(s)
                    </>
                  )}
                </InUseDiv>
                {/* display Apply button only when there is a group id  */}
                {!groupId && (
                  <TransparentButton
                    style={{ padding: '12px', width: '100px' }}
                    // this should be link to "choose group" first and then "group-settings" page
                    onClick={() => history.push(`model-setting`)}
                  >
                    Apply
                  </TransparentButton>
                )}
                <StyledViewBtn>
                  <button onClick={() => handleApplyOrViewBtn(mdl)}>
                    {groupId ? 'Apply Model' : 'View'}
                  </button>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    size="lg"
                    color="var(--brand-blue)"
                  />
                </StyledViewBtn>
              </Grid>
            </ShadowBox>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default MyModelPortfoliosPage;
