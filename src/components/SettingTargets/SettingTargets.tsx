import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { selectGroupInfo, selectGroups } from '../../selectors/groups';
import { H1, H2 } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import Grid from '../../styled/Grid';

export const GreyBox = styled.div`
  background: #f1f1f1;
  padding: 20px;
  margin-bottom: 20px;
  line-height: 2rem;
  @media (max-width: 900px) {
    padding: 15px;
  }
`;

const SettingTargets = () => {
  const history = useHistory();

  const groups = useSelector(selectGroups);
  const groupInfo = useSelector(selectGroupInfo);

  return (
    <ShadowBox>
      <H1 style={{ marginBottom: '20px' }}>Select Portfolio Group</H1>
      {groups &&
        groups.map((group) => {
          const targetByAssetClass =
            groupInfo[group.id].data?.settings.rebalance_by_asset_class;
          return (
            <GreyBox key={group.id}>
              <Grid columns="3fr 1fr 1fr 10px">
                <H2 style={{ fontWeight: 400 }}>{group.name}</H2>{' '}
                <span style={{ fontWeight: 600 }}>
                  ({group.accounts.length} Account)
                </span>
                <div>
                  <span style={{ fontWeight: 600 }}>Target By:</span>{' '}
                  {targetByAssetClass ? 'Asset Class' : 'Securities'}
                </div>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  size="2x"
                  color="var(--brand-blue)"
                  cursor="pointer"
                  onClick={() => history.replace(`setting-targets/${group.id}`)}
                />
              </Grid>
            </GreyBox>
          );
        })}
    </ShadowBox>
  );
};

export default SettingTargets;
