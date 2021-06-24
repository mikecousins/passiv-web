import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import styled from '@emotion/styled';
import { selectGroupInfo, selectGroups } from '../../selectors/groups';
import { H1, H2, P } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import { postData } from '../../api';
import { selectGroupsUsingAModel } from '../../selectors/modelPortfolios';
import { loadGroups, loadModelPortfolios } from '../../actions';
import { toast } from 'react-toastify';
import { ModelPortfolio } from '../../types/modelPortfolio';
import { GroupData } from '../../types/group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Header = styled(H1)`
  margin-bottom: 20px;
  span {
    font-weight: 600;
  }
`;

const GreyBox = styled.div`
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

const GroupInfo = styled.div`
  display: flex;
  h2 {
    font-weight: 400;
    margin-right: 20px;
  }
  span {
    font-weight: 600;
  }
`;

const GroupsUsingModel = styled.div`
  border-top: 1px solid grey;
  padding: 10px;
  P {
    font-weight: 400;
    span {
      font-weight: 600;
    }
    margin-bottom: 10px;
  }
  ul {
    padding: 0px 10px;
  }
  li {
    margin-bottom: 10px;
  }
`;

const Loading = styled.div`
  text-align: center;
  svg {
    margin-left: 10px;
  }
`;

type Props = {
  model: ModelPortfolio;
};

const SelectGroupDialog = ({ model }: Props) => {
  const dispatch = useDispatch();

  let groups = useSelector(selectGroups);
  const groupInfo = useSelector(selectGroupInfo);
  const groupsUsingByModel = useSelector(selectGroupsUsingAModel);

  const [loading, setLoading] = useState(false);

  const modelId = model.id;
  const modelName = model.name;

  const applyModel = (groupId: string, groupName: string) => {
    setLoading(true);
    postData(`api/v1/portfolioGroups/${groupId}/modelPortfolio/${modelId}`, {})
      .then((res) => {
        dispatch(loadGroups()); // need to load all groups to have an updated list of groups using a model in my models page
        dispatch(loadModelPortfolios());
        if (model.model_type === 1) {
          dispatch(push(`/priorities/${groupId}`));
        } else {
          dispatch(push(`/group/${groupId}`));
        }
        toast.success(`Model applied to "${groupName}"`);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.error(err.response.data.detail);
        } else {
          toast.error('Cannot apply model');
        }
      });
  };

  let usingModel: GroupData[] = [];
  let filteredGroups;
  if (modelId && groupsUsingByModel?.[modelId]) {
    usingModel = modelId && groupsUsingByModel[modelId].groups;
    //Find values that are in groups but not in usingModel
    filteredGroups = groups?.filter((group) => {
      return !usingModel.some((gp) => {
        return group.id === gp.id;
      });
    });
  } else {
    filteredGroups = groups;
  }

  return (
    <div>
      {loading ? (
        <Loading>
          <H1>
            Applying the model <FontAwesomeIcon icon={faSpinner} spin />{' '}
          </H1>
        </Loading>
      ) : (
        <>
          <Header>
            Apply <span>"{modelName}"</span> to:
          </Header>
          {filteredGroups &&
            filteredGroups.map((group) => {
              const targetByAssetClass =
                groupInfo[group.id].data?.settings.rebalance_by_asset_class;
              return (
                <GreyBox
                  key={group.id}
                  onClick={() => applyModel(group.id, group.name)}
                >
                  <Grid columns={'3fr 1fr'}>
                    <GroupInfo>
                      <H2>{group.name}</H2>
                      <span>({group.accounts.length} Account)</span>
                    </GroupInfo>
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
              <P>
                <span>"{modelName}"</span> is applied to following groups:
              </P>
              <ul>
                {usingModel &&
                  usingModel.map((gp) => {
                    return <li>{gp.name}</li>;
                  })}
              </ul>
            </GroupsUsingModel>
          )}
        </>
      )}
    </div>
  );
};

export default SelectGroupDialog;
