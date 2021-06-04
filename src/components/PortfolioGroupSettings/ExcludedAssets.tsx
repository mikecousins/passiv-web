import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Grid from '../../styled/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faSpinner,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { postData } from '../../api';
import { loadGroup } from '../../actions';
import {
  selectCurrentGroupId,
  selectCurrentGroupInfoLoading,
  selectCurrentGroupModelType,
  selectCurrentGroupPositionsNotInTargetOrExcluded,
  selectCurrentGroupSetupComplete,
} from '../../selectors/groups';
import { H2, P } from '../../styled/GlobalElements';
import { Description } from '../ModelPortfolio/Prioritization';
import { CheckBox } from '../../styled/CheckBox';
import { toast } from 'react-toastify';
import { Truncate } from '../../common';
import {
  ActionContainer,
  Cancel,
  Save,
} from '../ModelPortfolio/Prioritization';

const Container = styled.div`
  margin-bottom: 37px;
  h2 {
    font-size: 28px;
    margin-bottom: 25px;
  }
  ul {
    margin-bottom: 37px;
  }
`;

const CheckAll = styled(Grid)`
  border-bottom: 0.5px solid #bfb6b6;
  width: 200px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  align-items: center;
  margin-left: 20px;
  align-items: center;
  @media (max-width: 900px) {
    display: grid;
    grid-gap: 20px;
  }
`;

const Positions = styled(Grid)`
  margin-bottom: 20px;
  align-items: center;
  margin-left: 20px;
  @media (max-width: 900px) {
    display: grid;
    grid-gap: 20px;
  }
`;
type SymbolType = {
  disabled: boolean;
};
const Symbol = styled.span<SymbolType>`
  font-size: 18px;
  font-weight: 600;
  margin: 0 50px;
  margin: 15px 0px 0px 40px;
  color: ${(props) => (props.disabled ? 'grey' : 'black')};
  @media (max-width: 900px) {
    margin-left: 30px;
  }
`;

const Name = styled.span<SymbolType>`
  font-size: 18px;
  margin: 15px 0px 0px 0px;
  color: ${(props) => (props.disabled ? 'grey' : 'black')};
  @media (max-width: 900px) {
    display: none;
  }
`;

const NoExcludedAssets = styled(P)`
  margin-top: 20px;
  text-align: center;
`;

const NumberOfExcludedAssets = styled(P)`
  margin-top: 20px;
  background-color: #f1f1f1;
  max-width: max-content;
  padding: 20px;
  text-align: center;
  span {
    font-weight: 800;
    text-decoration: underline;
  }
  button {
    color: var(--brand-blue);
    font-weight: 600;
    margin-left: 10px;
  }
`;

const ExcludedAssets = () => {
  const dispatch = useDispatch();
  const groupId = useSelector(selectCurrentGroupId);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentGroupModelType = useSelector(selectCurrentGroupModelType);
  const positionsNotInTargetOrExcluded = useSelector(
    selectCurrentGroupPositionsNotInTargetOrExcluded,
  );
  const groupInfoLoading = useSelector(selectCurrentGroupInfoLoading);
  const setupComplete = useSelector(selectCurrentGroupSetupComplete);
  const [showAssets, setShowAssets] = useState(false);

  // create a list of assets ids that are excluded
  const excludedIds = positionsNotInTargetOrExcluded
    .map((position) => {
      if (position.excluded) {
        return position.symbol.id;
      }
      return false;
    })
    .filter((id) => typeof id === 'string');

  const excludedAssetsCount = excludedIds.length;
  const [excluded, setExcluded] = useState(excludedIds);

  // see if all the assets are excluded (used for have Excluded All checkbox unchecked or checked )
  const allExcluded = excluded.length === positionsNotInTargetOrExcluded.length;

  useEffect(() => {
    setLoading(groupInfoLoading);
    setExcluded(excludedIds);
  }, [groupInfoLoading]);

  // list of all asset ids
  const listOfAllAssetIds = positionsNotInTargetOrExcluded.map(
    (target) => target.symbol.id,
  );
  const handleCheckBoxClick = (position: any, checkAll: boolean) => {
    setEditing(true);
    let excludedCopy = [...excluded];
    // if check all clicked
    if (checkAll) {
      // if not all excluded, means we want to exclude all assets
      if (!allExcluded) {
        excludedCopy = listOfAllAssetIds;
      } else {
        excludedCopy = [];
      }
    }
    // else, the individual checkbox clicked
    else {
      const positionId = position.symbol.id;
      // if position is already excluded, it means we want to unexclude it
      if (excludedCopy.includes(positionId)) {
        excludedCopy = excluded.filter((id) => id !== positionId);
      }
      // otherwise, add it to excluded list
      else {
        excludedCopy.push(positionId);
      }
    }
    setExcluded(excludedCopy);
  };

  const handleSaveChanges = () => {
    setLoading(true);
    setEditing(false);
    /* if an asset class based model */
    if (currentGroupModelType === 1) {
      postData(
        `/api/v1/portfolioGroups/${groupId}/assetClassExcludeAssets`,
        excluded,
      )
        .then(() => {
          dispatch(loadGroup({ ids: [groupId] }));
        })
        .catch(() => {
          toast.error('Request failed. Please try again.');
          setLoading(false);
          setExcluded(excludedIds);
        });
    } else {
      postData(`/api/v1/portfolioGroups/${groupId}/excludedassets/`, excluded)
        .then(() => {
          dispatch(loadGroup({ ids: [groupId] }));
        })
        .catch(() => {
          toast.error('Request failed. Please try again.');
          setLoading(false);
          setExcluded(excludedIds);
        });
    }
  };

  return (
    <Container>
      <H2>Asset Exclusions</H2>
      <Description>
        The assets that are held in your portfolio but are not part of your
        model. If you do not want them to be accounted in Passiv’s calculations,
        you can exclude them by checking the boxes. Otherwise, Passiv will
        attempt to sell them, if sell is enabled.
      </Description>
      {setupComplete && positionsNotInTargetOrExcluded.length > 0 && (
        <NumberOfExcludedAssets>
          There {positionsNotInTargetOrExcluded.length === 1 ? 'is' : 'are'}{' '}
          <span>{positionsNotInTargetOrExcluded?.length}</span>{' '}
          {positionsNotInTargetOrExcluded.length === 1 ? 'asset' : 'assets'} not
          part of your portfolio ({excludedAssetsCount} excluded).
          <button
            onClick={() => {
              setShowAssets(!showAssets);
              if (!showAssets) {
                setExcluded(excludedIds);
                setEditing(false);
              }
            }}
          >
            {showAssets ? 'Hide' : 'Show'}{' '}
            {showAssets ? (
              <FontAwesomeIcon icon={faCaretUp} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} size="lg" />
            )}
          </button>
        </NumberOfExcludedAssets>
      )}
      {!loading ? (
        positionsNotInTargetOrExcluded &&
        setupComplete &&
        positionsNotInTargetOrExcluded.length > 0 ? (
          showAssets && (
            <>
              {editing && (
                <ActionContainer>
                  <Cancel
                    onClick={() => {
                      setExcluded(excludedIds);
                      setEditing(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faUndo} size="sm" /> Undo changes
                  </Cancel>
                  <Save onClick={handleSaveChanges}>Save changes</Save>
                </ActionContainer>
              )}

              <CheckAll columns="10px 180px">
                <CheckBox>
                  <label className="container">
                    <input
                      type="checkbox"
                      checked={allExcluded}
                      onChange={() => handleCheckBoxClick(0, true)}
                    />
                    <span className="checkmark"></span>
                  </label>
                </CheckBox>
                <Symbol disabled={false}>
                  {allExcluded ? 'Unexclude all' : 'Exclude all'}
                </Symbol>
              </CheckAll>

              {positionsNotInTargetOrExcluded.map((position) => {
                return (
                  <Positions key={position.symbol.id} columns="10px 180px auto">
                    <CheckBox disabled={!position.quotable}>
                      <label className="container">
                        <input
                          type="checkbox"
                          checked={
                            excluded.includes(position.symbol.id) ||
                            !position.quotable
                          }
                          onChange={() => handleCheckBoxClick(position, false)}
                          disabled={!position.quotable}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </CheckBox>
                    <Symbol disabled={!position.quotable}>
                      {Truncate(position.symbol.symbol, 10)}
                    </Symbol>
                    <Name disabled={!position.quotable}>
                      {position.symbol.description}
                    </Name>
                  </Positions>
                );
              })}
            </>
          )
        ) : (
          <NoExcludedAssets>There are no excluded assets.</NoExcludedAssets>
        )
      ) : (
        showAssets && <FontAwesomeIcon icon={faSpinner} spin size="lg" />
      )}
    </Container>
  );
};

export default ExcludedAssets;
