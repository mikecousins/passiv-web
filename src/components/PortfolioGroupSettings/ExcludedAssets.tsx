import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { deleteData, postData } from '../../api';
import { loadGroup } from '../../actions';
import {
  selectCurrentGroupId,
  selectCurrentGroupPositionsNotInTargetOrExcluded,
  selectCurrentGroupSetupComplete,
} from '../../selectors/groups';
import { H2, P } from '../../styled/GlobalElements';
import { ToggleButton } from '../../styled/ToggleButton';
import { ToggleText } from './SettingsToggle';

const Container = styled.div`
  margin-bottom: 37px;
  border-bottom: 1px solid #2a2d34;
  h2 {
    margin-bottom: 15px;
  }
  ul {
    margin-bottom: 37px;
  }
`;
const Positions = styled.li`
  margin-bottom: 10px;
`;

const Symbol = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin: 0 50px;
  + span {
    font-size: 18px;
  }
`;

const NoExcludedAssets = styled(P)`
  text-align: center;
  margin: 20px 0;
`;

const ExcludedAssets = () => {
  const dispatch = useDispatch();
  const groupId = useSelector(selectCurrentGroupId);
  const positionsNotInTargetOrExcluded = useSelector(
    selectCurrentGroupPositionsNotInTargetOrExcluded,
  );
  const setupComplete = useSelector(selectCurrentGroupSetupComplete);

  const handleToggle = (position: any) => {
    const positionId = position.symbol.id;
    if (position.excluded) {
      deleteData(
        `/api/v1/portfolioGroups/${groupId}/excludedassets/${positionId}`,
      ).then(() => {
        dispatch(loadGroup({ ids: [groupId] }));
      });
    } else {
      postData(`/api/v1/portfolioGroups/${groupId}/excludedassets/`, {
        symbol: positionId,
      }).then(() => {
        dispatch(loadGroup({ ids: [groupId] }));
      });
    }
  };

  return (
    <Container>
      <H2>Excluded securities in this portfolio</H2>
      {positionsNotInTargetOrExcluded &&
      setupComplete &&
      positionsNotInTargetOrExcluded.length > 0 ? (
        <ul>
          {positionsNotInTargetOrExcluded.map((position) => {
            return (
              <Positions>
                <ToggleButton onClick={() => handleToggle(position)}>
                  <FontAwesomeIcon
                    icon={position.excluded ? faToggleOn : faToggleOff}
                  />
                  <ToggleText>
                    {position.excluded ? 'Excluded' : 'Not Excluded'}
                  </ToggleText>
                </ToggleButton>
                <Symbol>{position.symbol.symbol}</Symbol>
                <span>{position.symbol.description}</span>
              </Positions>
            );
          })}
        </ul>
      ) : (
        <NoExcludedAssets>No excluded assets</NoExcludedAssets>
      )}
    </Container>
  );
};

export default ExcludedAssets;
