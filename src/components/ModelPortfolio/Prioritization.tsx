import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getData, postData } from '../../api';
import { faCheck, faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentGroup } from '../../selectors/groups';
import { AssetClassPriorities } from '../../types/modelPortfolio';
import AssetClassPriority from './AssetClassPriority';
import { Edit, H2 } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import { Button } from '../../styled/Button';
import { toast } from 'react-toastify';
import { loadGroupInfo } from '../../actions';

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

const Done = styled(Edit)``;
const Cancel = styled(Edit)``;

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
        if (!onSettingsPage) {
          priorities?.forEach((assetClass) => {
            assetClass.accounts_priorities.forEach((account) => {
              account.trade_priority.forEach((p, index) => {
                p.sell_priority = index + 1;
              });
            });
          });
        }
        priorities = priorities.filter(
          (priority) => priority.asset_class.name !== 'Excluded Assets',
        );
        const assetClassIds = priorities.map(
          (assetClass: any) => assetClass.asset_class.id,
        );
        setAssetClassPriorities(priorities);
        setNeedToConfirm(assetClassIds);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    fetchPriorities();
    // eslint-disable-next-line
  }, []);

  const handleUpDownBtn = (
    assetClassId: string,
    accountId: string,
    symbolId: string,
    sellPriority: number,
    up: boolean,
  ) => {
    let priority = sellPriority;
    setChanged({ symbolId, accountId });
    setTimeout(() => {
      setChanged({ symbolId: '', accountId: '' });
    }, 300);
    if (up) {
      priority = priority + 1;
    } else {
      priority = priority - 1;
    }
    let assetClassPrioritiesCopy = JSON.parse(
      JSON.stringify(assetClassPriorities),
    );
    assetClassPrioritiesCopy.forEach((assetClass: any) => {
      if (assetClass.asset_class.id === assetClassId) {
        assetClass.accounts_priorities.forEach((account: any) => {
          if (account.account.id === accountId) {
            account.trade_priority.forEach((security: any) => {
              if (security.symbol_id === symbolId) {
                security.sell_priority = priority;
              }
              if (
                security.sell_priority === priority &&
                security.symbol_id !== symbolId
              ) {
                if (up) {
                  security.sell_priority = priority - 1;
                } else {
                  security.sell_priority = priority + 1;
                }
              }
            });
          }
        });
      }
    });
    setAssetClassPriorities(assetClassPrioritiesCopy);
  };

  const handleSaveChanges = () => {
    setLoading(true);
    if (assetClassPriorities) {
      assetClassPriorities.forEach((assetClass) => {
        assetClass.accounts_priorities.forEach((account) => {
          account.account_id = account.account.id;
          let newPriority: any = [];
          account.trade_priority.forEach((priority) => {
            newPriority.push(priority.symbol_id);
          });
          account.trade_priority = newPriority;
        });
      });
      postData(
        `/api/v1/portfolioGroups/${group?.id}/assetClassPriorities`,
        assetClassPriorities,
      ).then(() => {
        if (onSettingsPage) {
          setEditing(false);
        } else {
          history.push(`/app/group/${group?.id}`);
        }
        toast.success('Saved the prioritization changes successfully');
        fetchPriorities();
        dispatch(loadGroupInfo());
      });
    }
  };

  const handleCancel = () => {
    fetchPriorities();
    setEditing(false);
  };

  const handleConfirm = (assetClass: any) => {
    let needToConfirmCopy = [...needToConfirm];
    let index = needToConfirmCopy?.indexOf(assetClass.asset_class.id);
    if (index !== -1) {
      needToConfirmCopy.splice(index, 1);
    }
    toast.success(`Set priorities for "${assetClass.asset_class.name}".`);
    setNeedToConfirm(needToConfirmCopy);
  };

  const priorities = assetClassPriorities?.map((assetClass) => {
    return (
      <AssetClassPriority
        key={assetClass.asset_class.id}
        assetClass={assetClass}
        editing={editing}
        changed={changed}
        handleBtn={handleUpDownBtn}
        onSettingsPage={onSettingsPage}
        confirm={() => handleConfirm(assetClass)}
      />
    );
  });

  return (
    <Priorities>
      {onSettingsPage && <Divider></Divider>}

      <H2>Asset Class Priorities</H2>
      {onSettingsPage &&
        (editing ? (
          <>
            <Done onClick={handleSaveChanges}>
              <FontAwesomeIcon icon={faCheck} />
              Save changes
            </Done>
            <Cancel onClick={handleCancel}>Cancel</Cancel>
          </>
        ) : (
          <Edit onClick={() => setEditing(true)}>
            <FontAwesomeIcon icon={faPen} />
            Edit Priorities
          </Edit>
        ))}

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
