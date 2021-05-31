import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData } from '../../../api';
import {
  faExclamationTriangle,
  faSpinner,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import {
  selectCurrentGroup,
  selectCurrentGroupAssetClassTradePriorities,
  selectCurrentGroupInfoLoading,
  selectNeedToPrioritize,
} from '../../../selectors/groups';
import { AssetClassPriorities } from '../../../types/modelPortfolio';
import AssetClassPriority from './AssetClassPriority';
import { H2, P } from '../../../styled/GlobalElements';
import ShadowBox from '../../../styled/ShadowBox';
import { Button } from '../../../styled/Button';
import { toast } from 'react-toastify';
import { loadGroup, loadGroupInfo } from '../../../actions';
import { push } from 'connected-react-router';

const Priorities = styled.div`
  > h2 {
    display: inline-block;
    font-size: 28px;
    margin-bottom: 15px;
  }
  > button {
    font-size: 18px;
    > svg {
      margin-right: 5px;
      font-size: 18px;
    }
  }
`;

const ActionContainer = styled.div`
  margin-bottom: 20px;
`;

const Cancel = styled(Button)`
  padding: 13px 18px 13px;
  background-color: transparent;
  border: 2px solid var(--brand-blue);
  color: var(--brand-blue);
  font-weight: 600;
`;

const Save = styled(Button)`
  font-weight: 600;
`;

export const Description = styled(P)`
  line-height: 21px;
  letter-spacing: 0.18px;
  margin-bottom: 50px;
`;
const GroupName = styled(H2)`
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 37px;
`;
const SaveButton = styled.div`
  text-align: right;
  margin: 50px 0 0 0;
  font-weight: 600;
  button {
    padding: 13px 60px;
    font-weight: 600;
    font-size: 18px;
  }
`;

const NeedToPrioritize = styled.div`
  text-align: center;
  button {
    color: #1250be;
    font-size: 18px;
    font-weight: 600;
    text-decoration: underline;
  }
`;

type Props = {
  onSettingsPage: boolean;
};

const Prioritization = ({ onSettingsPage }: Props) => {
  const dispatch = useDispatch();

  const group = useSelector(selectCurrentGroup);
  const currentGroupInfoLoading = useSelector(selectCurrentGroupInfoLoading);
  const assetClassTradePriorities = useSelector(
    selectCurrentGroupAssetClassTradePriorities,
  );
  const needToPrioritize = useSelector(selectNeedToPrioritize);

  const [assetClassPriorities, setAssetClassPriorities] = useState<
    AssetClassPriorities[]
  >(assetClassTradePriorities.tradePriorities);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [changed, setChanged] = useState({ symbolId: '', accountId: '' });
  const [needToConfirm, setNeedToConfirm] = useState<string[]>(
    assetClassTradePriorities.assetClassIds,
  );
  const [newAssets, setNewAssets] = useState<string[]>(
    assetClassTradePriorities.newSecurities,
  );

  useEffect(() => {
    if (editing === false) {
      setLoading(currentGroupInfoLoading);
      setAssetClassPriorities(assetClassTradePriorities.tradePriorities);
      setNeedToConfirm(assetClassTradePriorities.assetClassIds);
      setNewAssets(assetClassTradePriorities.newSecurities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetClassTradePriorities]);

  // this function handles the up and down arrows which changes the priority for an asset class
  const handleUpDownBtn = (
    upButtonClicked: boolean,
    index: number,
    assetClassId: string,
    accountId: string,
    symbolId: string,
    inBuyBox: boolean,
    checkBoxClicked: boolean,
    isNoTrade: boolean,
  ) => {
    setChanged({ symbolId, accountId });
    setTimeout(() => {
      setChanged({ symbolId: '', accountId: '' });
    }, 300);
    if (!editing) {
      setEditing(true);
    }

    let assetClassPrioritiesCopy = JSON.parse(
      JSON.stringify(assetClassPriorities),
    );
    assetClassPrioritiesCopy.forEach((assetClass: AssetClassPriorities) => {
      // find a targeted asset class
      if (assetClass.asset_class.id === assetClassId) {
        assetClass.accounts_priorities.forEach((account) => {
          // find a targeted account
          if (account.account.id === accountId) {
            // if up button clicked
            if (upButtonClicked) {
              // if index is zero, it means that we want to move the security to the buy box
              if (index === 0) {
                // if there's already a security in buy priority, we need to replace it with the new symbol and move the old one to sell priorities
                if (account.buy_priority[0]) {
                  account.sell_priority.unshift(account.buy_priority[0]);
                  account.sell_priority.splice(index + 1, 1);
                }
                // buy priority is empty so we simply add the symbol to buy priority and remove it from sell priority
                else {
                  account.sell_priority.splice(index, 1);
                }
                account.buy_priority = [symbolId];
              }
              // otherwise, we just need to swap securities in the sell priority array
              else {
                let temp = account.sell_priority[index - 1];
                account.sell_priority[index - 1] = symbolId;
                account.sell_priority[index] = temp;
              }
            }
            // if down button clicked
            else if (!checkBoxClicked && !upButtonClicked) {
              // if the clicked security is in the buy box, we need to remove it and push it to the sell priority array
              if (inBuyBox) {
                account.sell_priority.unshift(account.buy_priority[0]);
                account.buy_priority = [];
              }
              // otherwise, we just need to swap securities in the sell priority array
              else {
                let temp = account.sell_priority[index + 1];
                account.sell_priority[index + 1] = symbolId;
                account.sell_priority[index] = temp;
              }
            }
            // if check box clicked
            else if (checkBoxClicked) {
              // if check box was already checked, means the security needs to be removed from do_not_trade array and be pushed to sell priority array
              if (isNoTrade) {
                account.do_not_trade.splice(index, 1);
                account.sell_priority.push(symbolId);
              }
              // otherwise, need to push security to do_not_trade array and remove it from sell priority array
              else {
                account.sell_priority.splice(index, 1);
                account.do_not_trade.push(symbolId);
              }
            }
          }
        });
      }
    });

    setAssetClassPriorities(assetClassPrioritiesCopy);
  };

  const handleSaveChanges = () => {
    setLoading(true);
    if (assetClassPriorities) {
      let assetClassPrioritiesCopy = JSON.parse(
        JSON.stringify(assetClassPriorities),
      );
      // reverse back the sell priority array
      assetClassPrioritiesCopy.forEach((assetClass: AssetClassPriorities) => {
        assetClass.accounts_priorities.forEach((account) => {
          account.sell_priority.reverse();
        });
      });
      postData(
        `/api/v1/portfolioGroups/${group?.id}/assetClassPriorities`,
        assetClassPrioritiesCopy,
      )
        .then(() => {
          if (onSettingsPage) {
            setEditing(false);
          } else {
            dispatch(push(`/group/${group?.id}`));
          }
          toast.success('Saved prioritization successfully');
          dispatch(loadGroup({ ids: [group?.id] }));
        })
        .catch(() => {
          toast.error('Unable to save prioritization. Please try again');
        });
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setAssetClassPriorities(assetClassTradePriorities.tradePriorities);
  };

  const handleConfirm = (priority: AssetClassPriorities) => {
    let needToConfirmCopy = [...needToConfirm];
    let index = needToConfirmCopy?.indexOf(priority.asset_class.id);
    if (index !== -1) {
      needToConfirmCopy.splice(index, 1);
    }
    setNeedToConfirm(needToConfirmCopy);
  };

  const handleTakeToPriorities = () => {
    postData(
      `api/v1/portfolioGroups/${group?.id}/modelPortfolio/${group?.model_portfolio}`,
      {},
    )
      .then(() => {
        dispatch(loadGroupInfo());
        dispatch(push(`/priorities/${group?.id}`));
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.detail);
        }
      });
  };

  const priorities =
    onSettingsPage && needToPrioritize ? (
      <NeedToPrioritize>
        <P>
          <FontAwesomeIcon icon={faExclamationTriangle} color="orange" /> Need
          to
          <button onClick={handleTakeToPriorities}>
            Reapply and Reprioritize.
          </button>
        </P>
      </NeedToPrioritize>
    ) : (
      assetClassPriorities?.map((priority, index) => {
        return (
          <AssetClassPriority
            key={priority.asset_class.id}
            priority={priority}
            changed={changed}
            handleBtn={handleUpDownBtn}
            onSettingsPage={onSettingsPage}
            needToConfirm={needToConfirm}
            newAssets={newAssets}
            confirm={() => handleConfirm(priority)}
          />
        );
      })
    );

  return (
    <Priorities>
      <H2>Asset Class Priorities</H2>
      {loading ? (
        <div>
          <FontAwesomeIcon icon={faSpinner} spin size="lg" />
        </div>
      ) : (
        <div>
          <Description>
            Define the order in which securities will be bought and sold in each
            account. Top priority will be bought first and bottom priorities
            will be sold first.
          </Description>
          {onSettingsPage && editing && (
            <ActionContainer>
              <Save onClick={handleSaveChanges}>Save changes</Save>
              <Cancel onClick={handleCancel}>
                <FontAwesomeIcon icon={faUndo} size="sm" /> Undo changes
              </Cancel>
            </ActionContainer>
          )}
          {onSettingsPage ? (
            priorities
          ) : (
            <ShadowBox>
              <GroupName>{group?.name}</GroupName>
              {priorities}
              <SaveButton>
                <Button
                  onClick={handleSaveChanges}
                  disabled={needToConfirm.length > 0}
                >
                  Save
                </Button>
              </SaveButton>
            </ShadowBox>
          )}
        </div>
      )}
    </Priorities>
  );
};

export default Prioritization;
