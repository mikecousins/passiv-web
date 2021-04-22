import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getData, postData } from '../../../api';
import { faSpinner, faUndo } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentGroup } from '../../../selectors/groups';
import { AssetClassPriorities } from '../../../types/modelPortfolio';
import AssetClassPriority from './AssetClassPriority';
import { H2 } from '../../../styled/GlobalElements';
import ShadowBox from '../../../styled/ShadowBox';
import { Button } from '../../../styled/Button';
import { toast } from 'react-toastify';
import { loadGroupInfo } from '../../../actions';

const Priorities = styled.div`
  > h2 {
    margin: 20px 0px;
    display: inline-block;
  }
  > button {
    font-size: 18px;
    > svg {
      margin-right: 5px;
      font-size: 18px;
    }
  }
`;

const Divider = styled.hr`
  border-top: 1px solid #2a2d34;
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

const Description = styled.div`
  font-size: 18px;
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

type Props = {
  onSettingsPage: boolean;
};

const Prioritization = ({ onSettingsPage }: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const group = useSelector(selectCurrentGroup);
  const [assetClassPriorities, setAssetClassPriorities] = useState<
    AssetClassPriorities[]
  >();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(onSettingsPage ? false : true);
  const [changed, setChanged] = useState({ symbolId: '', accountId: '' });
  const [needToConfirm, setNeedToConfirm] = useState<string[]>([]);

  const fetchPriorities = () => {
    getData(`/api/v1/portfolioGroups/${group?.id}/assetClassPriorities`).then(
      (res) => {
        let priorities: AssetClassPriorities[] = res.data;
        let assetClassIds: string[] = [];

        priorities.forEach((priority) => {
          // filter out "Excluded Assets" asset class for now
          if (priority.asset_class.name !== 'Excluded Assets') {
            // collect all the asset class ids to keep track of asset classes need to have priorities confirmed for them
            assetClassIds.push(priority.asset_class.id);
            // if not on settings page (user is setting priorities for the first time), just to make it easier, we put all securities in the sell priority array
            priority.accounts_priorities.forEach((account) => {
              if (!onSettingsPage && account.unassigned.length > 0) {
                account.sell_priority = account.unassigned;
              } else {
                account.sell_priority.reverse();
              }
            });
          }
        });
        setAssetClassPriorities(priorities);
        setNeedToConfirm(assetClassIds);
        setLoading(false);
      },
    );
  };

  // fetch priorities on page load
  useEffect(() => {
    fetchPriorities();
    // eslint-disable-next-line
  }, []);

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
    if (onSettingsPage && !editing) {
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
                } else {
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
      setAssetClassPriorities(assetClassPrioritiesCopy);
      postData(
        `/api/v1/portfolioGroups/${group?.id}/assetClassPriorities`,
        assetClassPriorities,
      ).then(() => {
        if (onSettingsPage) {
          setEditing(false);
        } else {
          history.push(`/app/group/${group?.id}`);
        }
        toast.success('Saved prioritization successfully');
        fetchPriorities();
        dispatch(loadGroupInfo());
      });
    }
  };

  const handleCancel = () => {
    fetchPriorities();
    setEditing(false);
  };

  const handleConfirm = (priority: any) => {
    let needToConfirmCopy = [...needToConfirm];
    let index = needToConfirmCopy?.indexOf(priority.asset_class.id);
    if (index !== -1) {
      needToConfirmCopy.splice(index, 1);
    }
    toast.success(`Set priorities for "${priority.asset_class.name}".`);
    setNeedToConfirm(needToConfirmCopy);
  };

  const priorities = assetClassPriorities?.map((priority) => {
    return (
      <AssetClassPriority
        key={priority.asset_class.id}
        priority={priority}
        changed={changed}
        handleBtn={handleUpDownBtn}
        onSettingsPage={onSettingsPage}
        confirm={() => handleConfirm(priority)}
      />
    );
  });

  return (
    <Priorities>
      {onSettingsPage && <Divider></Divider>}

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
              {/* <BackButton>
                {' '}
                <Link to={'/app/models'}>
                  <FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to My
                  Models
                </Link>
              </BackButton> */}
              <GroupName>{group?.name}</GroupName>
              {priorities}

              <SaveButton>
                <Button
                  onClick={handleSaveChanges}
                  disabled={needToConfirm.length !== 0}
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
