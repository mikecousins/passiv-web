import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postData } from '../api';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faCheck,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {
  selectGroupInfoForModelPortfolio,
  selectGroupsUsingAModel,
  selectModelPortfolios,
} from '../selectors/modelPortfolios';
import { ModelPortfolioDetailsType } from '../types/modelPortfolio';
import { loadGroups, loadModelPortfolios } from '../actions';
import { Button } from '../styled/Button';
import { H1, H3, P, Table } from '../styled/GlobalElements';
import Grid from '../styled/Grid';
import { ViewBtn } from '../styled/Group';
import ShadowBox from '../styled/ShadowBox';
import { StyledP } from './ModelAssetClassPage';
import Tooltip from '../components/Tooltip';
import Dialog from '@reach/dialog';
import SelectGroupPage from './SelectGroupPage';

export const TransparentButton = styled(Button)`
  background-color: transparent;
  color: var(--brand-blue);
  border: 3px solid var(--brand-blue);
  padding: 20px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 18px;
  @media (max-width: 900px) {
    margin-bottom: 10px;
    width: 100%;
  }
`;
const NewModelButton = styled(Button)`
  padding: 23px 50px;
  font-weight: 600;
  font-size: 18px;
  @media (max-width: 900px) {
    width: 100%;
  }
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
const ModelName = styled(H3)`
  font-size: 22px;
  font-weight: 600;
  @media (max-width: 900px) {
    margin-bottom: 15px;
    text-align: center;
  }
`;
const InUseDiv = styled.div`
  font-size: 20px;
  @media (max-width: 900px) {
    margin-bottom: 20px;
    text-align: center;
  }
`;
const InUse = styled.span`
  font-weight: 600;
  margin-right: 7px;
`;
const ApplyTransparentBtn = styled(TransparentButton)`
  padding: 12px;
  width: 100px;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const MyModelPortfoliosPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const modelPortfolios: ModelPortfolioDetailsType[] = useSelector(
    selectModelPortfolios,
  );

  const group = useSelector(selectGroupInfoForModelPortfolio);
  const groupsUsingModel = useSelector(selectGroupsUsingAModel);

  const groupInfo = group.groupInfo;
  const groupId = groupInfo?.groupId;

  const [selectGroupDialog, setSelectGroupDialog] = useState(false);

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
    // if have a groupId, we know the Apply button got clicked
    if (groupId) {
      postData(
        `api/v1/portfolioGroups/${groupId}/modelPortfolio/${modelId}`,
        {},
      )
        .then((res) => {
          dispatch(loadGroups()); // need to load groups to have update list of groups using a model in my models page
          dispatch(loadModelPortfolios());
          toast.success(
            `"${model.model_portfolio.name}" applied to "${groupInfo?.name}"`,
          );
          history.push(`/app/group/${groupId}`);
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.detail);
          }
        });
    } else {
      history.replace(`model-portfolio/${modelId}`);
    }
  };
  const makeLabel = (modelId: any) => {
    let labelList: string[] = [];
    if (groupsUsingModel[modelId]) {
      groupsUsingModel[modelId].groups.map((model: any) =>
        labelList.push(model.name),
      );
    }
    const label = labelList.join(', ');

    return label;
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
        {modelPortfolios.length > 0 ? (
          modelPortfolios.map((mdl) => {
            const totalAssignedGroups =
              mdl.model_portfolio.total_assigned_portfolio_groups;
            return (
              <ShadowBox key={mdl.model_portfolio.id}>
                <Grid
                  columns={groupId ? '2fr 1fr 250px' : '2fr 1fr 150px 150px'}
                >
                  <ModelName>{mdl.model_portfolio.name}</ModelName>
                  <InUseDiv>
                    {totalAssignedGroups > 0 && (
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
                        <span style={{ marginRight: '10px' }}>
                          {totalAssignedGroups} Group
                          {totalAssignedGroups > 1 && 's'}
                        </span>
                        <Tooltip label={makeLabel(mdl.model_portfolio.id)}>
                          <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                        </Tooltip>
                      </>
                    )}
                  </InUseDiv>
                  {/* display Apply button only when there is a group id  */}
                  {!groupId && (
                    <ApplyTransparentBtn
                      // this should be link to "choose group" first and then "group-settings" page
                      onClick={
                        () =>
                          history.push(
                            `/app/model-portfolio/${mdl.model_portfolio.id}/select-group`,
                          )
                        // setSelectGroupDialog(true)
                      }
                    >
                      Apply
                    </ApplyTransparentBtn>
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
          })
        ) : (
          <ShadowBox>
            <P style={{ textAlign: 'center' }}>
              There are no model portfolios available.
            </P>
          </ShadowBox>
        )}
      </div>
      {/* {selectGroupDialog && (
        <Dialog
          isOpen={selectGroupDialog}
          onDismiss={() => setSelectGroupDialog(false)}
          aria-labelledby="dialog1Title"
          aria-describedby="dialog1Desc"
        >
          <SelectGroupPage />
        </Dialog>
      )} */}
    </React.Fragment>
  );
};

export default MyModelPortfoliosPage;
