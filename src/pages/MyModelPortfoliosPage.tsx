import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postData } from '../api';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faCheck,
  faInfoCircle,
  faTimes,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {
  selectGroupInfoForModelPortfolio,
  selectGroupsUsingAModel,
  selectModelPortfolios,
} from '../selectors/modelPortfolios';
import {
  ModelPortfolio,
  ModelPortfolioDetailsType,
} from '../types/modelPortfolio';
import { loadGroups, loadModelPortfolios } from '../actions';
import { Button } from '../styled/Button';
import { H1, H3, P, Table } from '../styled/GlobalElements';
import Grid from '../styled/Grid';
import { ViewBtn } from '../styled/Group';
import ShadowBox from '../styled/ShadowBox';
import { StyledP } from './ModelAssetClassPage';
import Tooltip from '../components/Tooltip';
import { selectGroupInfo, selectGroups } from '../selectors/groups';
import Dialog from '@reach/dialog';
import SelectGroupDialog from '../components/ModelPortfolio/SelectGroupDialog';
import { BackButton } from '../components/ModelPortfolio';
import MoreOptions from '../components/ModelPortfolio/MoreOptions';
import { push, replace } from 'connected-react-router';
import Tour from '../components/Tour/Tour';
import { MyModelsPageSteps } from '../components/Tour/TourSteps';

export const TransparentButton = styled(Button)`
  background-color: transparent;
  color: var(--brand-blue);
  border: 3px solid var(--brand-blue);
  border-radius: 4px;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 25px;
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
  > svg {
    margin-right: 8px;
    color: var(--brand-green);
  }
  span {
    margin-right: 10px;
  }
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
  &:hover {
    :disabled {
      background: transparent;
      color: var(--brand-blue);
    }
    background: var(--brand-blue);
    color: #fff;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Badges = styled.div`
  margin-top: 10px;
  @media (max-width: 900px) {
    margin-bottom: 20px;
  }
`;
const TypeBadge = styled.span`
  width: fit-content;
  border: 1px solid var(--brand-grey);
  border-radius: 25px;
  padding: 3px 10px;
  font-weight: 600;
  font-size: 14px;
  color: var(--brand-grey);
  margin-right: 10px;
`;
const UsedByBadge = styled(TypeBadge)`
  border: 1px solid var(--brand-green);
  color: var(--brand-green);
`;

const MyModelPortfoliosPage = () => {
  const dispatch = useDispatch();

  const modelPortfolios: ModelPortfolioDetailsType[] = useSelector(
    selectModelPortfolios,
  );
  const allGroups = useSelector(selectGroups);
  const group = useSelector(selectGroupInfoForModelPortfolio);
  const groupsUsingModel = useSelector(selectGroupsUsingAModel);

  const groupInfo = useSelector(selectGroupInfo);

  const groupData = group.groupInfo;
  const groupId = groupData?.groupId;
  const groupName = groupData?.name;

  const [selectGroupDialog, setSelectGroupDialog] = useState(false);
  const [hasClickedApply, setHasClickedApply] = useState<string>();
  const [selectedModel, setSelectedModel] = useState<
    ModelPortfolio | undefined
  >();

  let modelIdUseByGroup: string | undefined = '';
  if (groupId && groupInfo[groupId].data?.model_portfolio) {
    modelIdUseByGroup = groupInfo[groupId].data?.model_portfolio.id;
  }

  const handleNewModelBtn = () => {
    postData('/api/v1/modelPortfolio/', {})
      .then((res: any) => {
        dispatch(loadModelPortfolios());
        const id = res.data.model_portfolio.id;
        if (groupId) {
          dispatch(
            replace(`/model-portfolio/${id}/group/${groupId}?apply=true`),
          );
        } else {
          dispatch(replace(`/model-portfolio/${id}?edit=true`));
        }
      })
      .catch(() => {
        toast.error('Failed to create a new model.');
      });
  };

  const handleApplyOrViewBtn = (model: any) => {
    const modelId = model.model_portfolio.id;
    // if have a groupId, we know the Apply button got clicked
    if (groupId) {
      // set `hasClickedApply` to id of the model clicked on
      setHasClickedApply(model.model_portfolio.id);
      postData(
        `api/v1/portfolioGroups/${groupId}/modelPortfolio/${modelId}`,
        {},
      )
        .then((res) => {
          dispatch(loadGroups()); // need to load groups to have update list of groups using a model in my models page
          dispatch(loadModelPortfolios());
          toast.success(
            `"${model.model_portfolio.name}" applied to group successfully`,
          );
          if (model.model_portfolio.model_type === 1) {
            dispatch(push(`/priorities/${groupId}`));
          } else {
            dispatch(push(`/group/${groupId}`));
          }
        })
        .catch((err) => {
          setHasClickedApply('');
          if (err.response) {
            toast.error(err.response.data.detail);
          }
        });
    } else {
      dispatch(replace(`model-portfolio/${modelId}`));
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

  const noModelAvailable = (
    <ShadowBox>
      <P style={{ textAlign: 'center' }}>
        There are no model portfolios available.
      </P>
    </ShadowBox>
  );

  return (
    <React.Fragment>
      {!groupId && (
        <Tour steps={MyModelsPageSteps} name="my_models_page_tour" />
      )}

      {groupId ? (
        <BackButton>
          <Link to={`/group/${groupId}`}>
            <FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to {groupName}
          </Link>
        </BackButton>
      ) : (
        <H1>Model Portfolios</H1>
      )}
      <Table>
        {groupId ? (
          <H1>
            Choose a model to apply to{' '}
            <span style={{ fontWeight: 600 }}>"{groupName}"</span> group:
          </H1>
        ) : (
          <StyledP>
            A model portfolio is a group of assets and target allocations that
            are designed to meet a particular investing goal.
          </StyledP>
        )}
        <div>
          <NewModelButton
            onClick={() => handleNewModelBtn()}
            className="tour-new-model-button"
          >
            New Model
          </NewModelButton>
        </div>
      </Table>
      <div style={{ marginTop: '50px' }}>
        {modelPortfolios.length > 0
          ? modelPortfolios.map((mdl) => {
              const totalAssignedGroups =
                mdl.model_portfolio.total_assigned_portfolio_groups;
              if (
                modelIdUseByGroup &&
                modelIdUseByGroup === mdl.model_portfolio.id
              ) {
                if (modelPortfolios.length === 1) {
                  return noModelAvailable;
                } else {
                  return false;
                }
              }
              return (
                <ShadowBox key={mdl.model_portfolio.id}>
                  <Grid
                    columns={
                      groupId ? '50px 3fr 250px' : '50px 3fr 120px 150px'
                    }
                  >
                    <MoreOptions
                      model={mdl}
                      shareModel={mdl.model_portfolio.share_portfolio}
                    />
                    <div>
                      <ModelName>{mdl.model_portfolio.name}</ModelName>
                      <Badges>
                        <TypeBadge>
                          {mdl.model_portfolio.model_type === 0
                            ? 'Security Based'
                            : 'Asset Class Based'}
                        </TypeBadge>
                        {totalAssignedGroups > 0 && (
                          <UsedByBadge>
                            In Use: {totalAssignedGroups} Group
                            {totalAssignedGroups > 1 && 's'}{' '}
                            <Tooltip label={makeLabel(mdl.model_portfolio.id)}>
                              <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                            </Tooltip>
                          </UsedByBadge>
                        )}
                      </Badges>
                    </div>
                    {/* <InUseDiv>
                      {totalAssignedGroups > 0 && (
                        <>
                          <FontAwesomeIcon icon={faCheck} size="lg" />
                          <InUse>In Use</InUse> |{' '}
                          <span>
                            {totalAssignedGroups} Group
                            {totalAssignedGroups > 1 && 's'}
                          </span>
                          <Tooltip label={makeLabel(mdl.model_portfolio.id)}>
                            <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                          </Tooltip>
                        </>
                      )}
                    </InUseDiv> */}
                    {/* display Apply button only when there is a group id  */}
                    {!groupId && (
                      <div>
                        <ApplyTransparentBtn
                          onClick={() => {
                            setSelectGroupDialog(true);
                            setSelectedModel(mdl?.model_portfolio);
                          }}
                          disabled={totalAssignedGroups === allGroups?.length}
                          className="tour-apply-button"
                        >
                          Apply
                        </ApplyTransparentBtn>
                      </div>
                    )}
                    <StyledViewBtn className="tour-view-button">
                      <button
                        onClick={() => handleApplyOrViewBtn(mdl)}
                        disabled={hasClickedApply === mdl.model_portfolio.id}
                      >
                        {hasClickedApply === mdl.model_portfolio.id ? (
                          <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                          <>
                            {groupId ? 'Apply Model' : 'View'}{' '}
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              size="lg"
                              color="var(--brand-blue)"
                            />
                          </>
                        )}
                      </button>
                    </StyledViewBtn>
                  </Grid>
                </ShadowBox>
              );
            })
          : noModelAvailable}
      </div>
      {selectGroupDialog && (
        <Dialog
          isOpen={selectGroupDialog}
          onDismiss={() => setSelectGroupDialog(false)}
          aria-labelledby="dialog1Title"
          aria-describedby="dialog1Desc"
        >
          <button
            onClick={() => setSelectGroupDialog(false)}
            style={{ float: 'right' }}
          >
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </button>
          {selectedModel && <SelectGroupDialog model={selectedModel} />}
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default MyModelPortfoliosPage;
