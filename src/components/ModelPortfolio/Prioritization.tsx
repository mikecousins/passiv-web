import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getData, postData } from '../../api';
import { faCheck, faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentGroupId } from '../../selectors/groups';
import { AssetClassPriorities } from '../../types/modelPortfolio';
import AssetClassPriority from './AssetClassPriority';
import { Edit, H2 } from '../../styled/GlobalElements';

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

const Prioritization = () => {
  const groupId = useSelector(selectCurrentGroupId);
  const [assetClassPriorities, setAssetClassPriorities] = useState<
    AssetClassPriorities[]
  >();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [changed, setChanged] = useState({ symbolId: '', accountId: '' });

  const fetchPriorities = () => {
    getData(`/api/v1/portfolioGroups/${groupId}/assetClassPriorities`).then(
      (res) => {
        setAssetClassPriorities(res.data);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    fetchPriorities();
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
    }, 500);
    if (up) {
      priority = priority + 1;
    } else {
      priority = priority - 1;
    }
    let assetClassPrioritiesCopy = JSON.parse(
      JSON.stringify(assetClassPriorities),
    );
    assetClassPrioritiesCopy.map((assetClass: any) => {
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
        `/api/v1/portfolioGroups/${groupId}/assetClassPriorities`,
        assetClassPriorities,
      ).then(() => {
        fetchPriorities();
        setEditing(false);
      });
    }
  };

  return (
    <Priorities>
      <Divider></Divider>
      <H2>Asset Class Priorities</H2>
      {editing ? (
        <Done onClick={handleSaveChanges}>
          <FontAwesomeIcon icon={faCheck} />
          Save changes
        </Done>
      ) : (
        <Edit onClick={() => setEditing(true)}>
          <FontAwesomeIcon icon={faPen} />
          Edit Priorities
        </Edit>
      )}

      {loading ? (
        <div>
          <FontAwesomeIcon icon={faSpinner} spin size="lg" />
        </div>
      ) : (
        assetClassPriorities?.map((assetClass) => {
          return (
            <AssetClassPriority
              assetClass={assetClass}
              editing={editing}
              changed={changed}
              handleBtn={handleUpDownBtn}
            />
          );
        })
      )}
    </Priorities>
  );
};

export default Prioritization;
