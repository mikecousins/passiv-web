import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { selectGroupInfo, selectGroups } from '../selectors/groups';
import { H1, H2, H3 } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import Grid from '../styled/Grid';
import { postData } from '../api';
import {
  selectCurrentModelPortfolioId,
  selectGroupsUsingAModel,
} from '../selectors/modelPortfolios';
import { loadGroups, loadModelPortfolios } from '../actions';
import { toast } from 'react-toastify';

const GreyBox = styled.div`
  background: #f1f1f1;
  padding: 20px;
  margin-bottom: 20px;
  line-height: 2rem;
  cursor: pointer;
  :hover {
    box-shadow: 4px 6px 12px 0 rgb(107 110 115 / 40%);
    border: 1px solid #023ca2;
  }
  @media (max-width: 900px) {
    padding: 15px;
  }
`;

const GroupsUsingModel = styled.div`
  border-top: 1px solid grey;
  padding: 10px;
`;

const SelectGroupPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let groups = useSelector(selectGroups);
  const groupInfo = useSelector(selectGroupInfo);
  const currentModelId = useSelector(selectCurrentModelPortfolioId);
  const groupsUsingByModel = useSelector(selectGroupsUsingAModel);

  const applyModel = (groupId: string, groupName: string) => {
    postData(
      `api/v1/portfolioGroups/${groupId}/modelPortfolio/${currentModelId}`,
      {},
    )
      .then((res) => {
        dispatch(loadGroups());
        dispatch(loadModelPortfolios());
        history.push(`/app/group/${groupId}`);
        toast.success(`Model applied to "${groupName}"`);
      })
      .catch((err) => {
        toast.success(`${err.message}`);
      });
  };

  let usingModel: any;
  let filteredGroups: any;
  if (currentModelId && groupsUsingByModel[currentModelId]) {
    usingModel = currentModelId && groupsUsingByModel[currentModelId].groups;
    filteredGroups = usingModel
      ?.map((gp: any) => {
        return groups?.filter((g: any) => gp.id !== g.id);
      })
      .flat();
  } else {
    filteredGroups = groups;
  }

  return (
    <ShadowBox>
      <H1 style={{ marginBottom: '20px' }}>Select Portfolio Group</H1>
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
                {/* <FontAwesomeIcon
                  icon={faAngleRight}
                  size="2x"
                  color="var(--brand-blue)"
                  cursor="pointer"
                  onClick={() => applyModel(group.id, group.name)}
                /> */}
              </Grid>
            </GreyBox>
          );
        })}
      {usingModel && usingModel.length > 0 && (
        <GroupsUsingModel>
          <H3>
            "
            {currentModelId &&
              groupsUsingByModel[currentModelId] &&
              groupsUsingByModel[currentModelId].model.name}
            " is already being used by:
          </H3>
          <br />
          <ul style={{ padding: '0px 10px' }}>
            {usingModel &&
              usingModel.map((gp: any) => {
                return <li style={{ marginBottom: '10px' }}>{gp.name}</li>;
              })}
          </ul>
        </GroupsUsingModel>
      )}
    </ShadowBox>
  );
};

export default SelectGroupPage;
