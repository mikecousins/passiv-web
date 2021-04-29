import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { selectGroupInfo, selectGroups } from '../../selectors/groups';
import { H1, H2, H3 } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import { postData } from '../../api';
import { selectGroupsUsingAModel } from '../../selectors/modelPortfolios';
import { loadGroups, loadModelPortfolios } from '../../actions';
import { toast } from 'react-toastify';
import { ModelPortfolio } from '../../types/modelPortfolio';

export const GreyBox = styled.div`
  background: #f1f1f1;
  padding: 20px;
  margin-bottom: 20px;
  line-height: 2rem;
  cursor: pointer;
  :hover {
    box-shadow: 4px 6px 12px 0 rgb(107 110 115 / 40%);
    border: 3px solid #023ca2;
  }
  @media (max-width: 900px) {
    padding: 15px;
  }
`;

const GroupsUsingModel = styled.div`
  border-top: 1px solid grey;
  padding: 10px;
`;

type Props = {
  model: ModelPortfolio;
};

const SelectGroupDialog = ({ model }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let groups = useSelector(selectGroups);
  const groupInfo = useSelector(selectGroupInfo);
  const groupsUsingByModel = useSelector(selectGroupsUsingAModel);

  const modelId = model.id;
  const modelName = model.name;

  const applyModel = (groupId: string, groupName: string) => {
    postData(`api/v1/portfolioGroups/${groupId}/modelPortfolio/${modelId}`, {})
      .then((res) => {
        dispatch(loadGroups()); // need to load all groups to have an updated list of groups using a model in my models page
        dispatch(loadModelPortfolios());
        if (model.model_type === 1) {
          history.push(`/app/priorities/${groupId}`);
        } else {
          history.push(`/app/group/${groupId}`);
        }
        toast.success(`Model applied to "${groupName}"`);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.detail);
        } else {
          toast.error('Cannot apply model');
        }
      });
  };

  let usingModel: any;
  let filteredGroups: any = [];
  if (modelId && groupsUsingByModel?.[modelId]) {
    usingModel = modelId && groupsUsingByModel[modelId].groups;
    //Find values that are in groups but not in usingModel
    filteredGroups = groups?.filter((group) => {
      return !usingModel.some((gp: any) => {
        return group.id === gp.id;
      });
    });
  } else {
    filteredGroups = groups;
  }

  return (
    <div>
      <H1 style={{ marginBottom: '20px' }}>
        Apply <span style={{ fontWeight: 600 }}>"{modelName}"</span> to:
      </H1>
      {filteredGroups &&
        filteredGroups.map((group: any) => {
          const targetByAssetClass =
            groupInfo[group.id].data?.settings.rebalance_by_asset_class;
          return (
            <GreyBox
              key={group.id}
              onClick={() => applyModel(group.id, group.name)}
            >
              <Grid columns={group.setupComplete ? '3fr 1fr 10px' : '3fr 10px'}>
                <div style={{ display: 'flex' }}>
                  <H2 style={{ fontWeight: 400, marginRight: '20px' }}>
                    {group.name}
                  </H2>
                  <span style={{ fontWeight: 600 }}>
                    ({group.accounts.length} Account)
                  </span>
                </div>
                {group.setupComplete && (
                  <div>
                    <span style={{ fontWeight: 600 }}>Target By:</span>{' '}
                    {targetByAssetClass ? 'Asset Class' : 'Securities'}
                  </div>
                )}
              </Grid>
            </GreyBox>
          );
        })}
      {usingModel && usingModel.length > 0 && (
        <GroupsUsingModel>
          <H3>"{modelName}" is already being used by:</H3>
          <br />
          <ul style={{ padding: '0px 10px' }}>
            {usingModel &&
              usingModel.map((gp: any) => {
                return <li style={{ marginBottom: '10px' }}>{gp.name}</li>;
              })}
          </ul>
        </GroupsUsingModel>
      )}
    </div>
  );
};

export default SelectGroupDialog;
