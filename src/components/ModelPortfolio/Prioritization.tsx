import styled from '@emotion/styled';
import {
  faChevronDown,
  faChevronUp,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getData } from '../../api';
import { selectCurrentGroupId } from '../../selectors/groups';
import { selectSymbols } from '../../selectors/symbols';
import { H2, P } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import ShadowBox from '../../styled/ShadowBox';
import { AssetClassPriorities } from '../../types/modelPortfolio';

const AssetClassBox = styled.div`
  background: ${(props) => (props.open ? 'red' : 'green')};
  padding: 20px;
  margin-bottom: 20px;
  line-height: 2rem;
  .open {
    background-color: var(--brand-green);
    color: white;
  }
`;

const AssetClassName = styled(H2)`
  font-size: 22px;
  font-weight: 400;
  margin-right: 20px;
`;

const Percent = styled(H2)`
  font-weight: 400;
`;

const ChevronBtn = styled.div`
  svg {
  }
`;

const Prioritization = () => {
  const groupId = useSelector(selectCurrentGroupId);
  const [assetClassPriorities, setAssetClassPriorities] = useState<
    AssetClassPriorities[]
  >();
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

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
    <ShadowBox>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        assetClassPriorities?.map((assetClass) => {
          return (
            <AssetClassBox s={showDetails}>
              {/* {assetClass.accounts_priorities.map((account) => {
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
              })} */}
              <Grid columns="5fr 1fr 100px">
                <AssetClassName style={{}}>
                  {assetClass.asset_class.name}
                </AssetClassName>
                <Percent>{assetClass.asset_class.percent}%</Percent>
                <ChevronBtn onClick={() => setShowDetails(!showDetails)}>
                  <FontAwesomeIcon
                    icon={showDetails ? faChevronUp : faChevronDown}
                    color={showDetails ? 'white' : 'var(--brand-blue)'}
                    size="lg"
                  />
                </ChevronBtn>
              </Grid>
            </AssetClassBox>
          );
        })
      )}
    </ShadowBox>
  );
};

export default Prioritization;
