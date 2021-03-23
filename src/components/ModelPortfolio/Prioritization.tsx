import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getData } from '../../api';
import { selectCurrentGroupId } from '../../selectors/groups';
import { selectSymbols } from '../../selectors/symbols';
import { AssetClassPriorities } from '../../types/modelPortfolio';

const Prioritization = () => {
  const groupId = useSelector(selectCurrentGroupId);
  const [assetClassPriorities, setAssetClassPriorities] = useState<
    AssetClassPriorities[]
  >();
  const [loading, setLoading] = useState(true);

  const allSymbols = useSelector(selectSymbols);

  const symbols = allSymbols.reduce((acc: any, symbol) => {
    acc[symbol.id] = {
      symbol: symbol.symbol,
      description: symbol.description,
    };
    return acc;
  }, {});

  useEffect(() => {
    getData(`/api/v1/portfolioGroups/${groupId}/assetClassPriorities`).then(
      (res) => {
        setAssetClassPriorities(res.data);
        setLoading(false);
      },
    );
  }, []);

  return (
    <div>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        assetClassPriorities?.map((assetClass) => {
          return (
            <>
              <p>Asset Class Name: {assetClass?.asset_class.name}</p>
              {assetClass.accounts_priorities.map((account) => {
                return (
                  <div>
                    Account Name: {account.account.name}
                    <ul>
                      {account.trade_priority.map((priority) => {
                        return (
                          <li>
                            {symbols[priority.symbol_id].symbol} - sell:{' '}
                            {priority.sell_priority} - buy:{' '}
                            {priority.allow_buy ? 'true' : 'false'}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </>
          );
        })
      )}
    </div>
  );
};

export default Prioritization;
