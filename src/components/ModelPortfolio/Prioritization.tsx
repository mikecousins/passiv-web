import React, { useEffect, useState } from 'react';
import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faPen,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { getData, postData } from '../../api';
import { selectCurrentGroupId } from '../../selectors/groups';
import { AssetClassPriorities } from '../../types/modelPortfolio';
import AssetClassPriority from './AssetClassPriority';
import { Edit, H2, H3 } from '../../styled/GlobalElements';
import styled from '@emotion/styled';
import Grid from '../../styled/Grid';
import { selectSymbols } from '../../selectors/symbols';

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

const MainContainer = styled.div`
  border: ${(p) => (p.color ? `2px solid ${p.color}` : 'none')};
  margin-bottom: 20px;
`;

const AssetClassBox = styled.div`
  background-color: ${(p) => p.color};
  padding: 20px;
`;

const Head = styled(Grid)`
  H2 {
    color: ${(p) => p.color};
  }
`;

const AssetClassName = styled(H2)`
  font-size: 22px;
  font-weight: 400;
  margin-right: 20px;
`;

const Percent = styled(H2)`
  font-weight: 400;
  text-align: left;
`;

const ChevronBtn = styled.div`
  svg {
    cursor: pointer;
  }
`;

const AssetClassDetails = styled.div`
  padding: 10px 30px 20px 30px;
  background-color: #dbfcf6;
`;

const AccountSection = styled.div`
  border-bottom: 1px solid #2a2d34;
`;

const AccountName = styled(H3)`
  font-size: 22px;
  font-weight: 600;
`;

const TradePriority = styled.div`
  margin: 25px 0px;
`;

const Security = styled(Grid)`
  margin-bottom: 20px;
`;

const Symbol = styled(H3)``;

const Description = styled(H3)`
  font-weight: 400;
  margin-left: 10px;
  text-align: left;
`;

const EditPriorityContainer = styled.div`
  /* border: 1px solid; */
`;

const UpButton = styled.button`
  background-color: #f2fffd;
  padding: 10px 12px;
  border: 1px solid #2a2d34;
`;

const DownButton = styled.button`
  background-color: #f2fffd;
  padding: 10px 12px;
  border: 1px solid #2a2d34;
`;

const Prioritization = () => {
  const groupId = useSelector(selectCurrentGroupId);
  const [assetClassPriorities, setAssetClassPriorities] = useState<
    AssetClassPriorities[]
  >();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const allSymbols = useSelector(selectSymbols);
  const [showDetails, setShowDetails] = useState(false);
  // const [assetClassPriorities, setAssetClassPriorities] = useState(assetClass);
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

  const symbols = allSymbols.reduce((acc: any, symbol) => {
    acc[symbol.id] = {
      symbol: symbol.symbol,
      description: symbol.description,
    };
    return acc;
  }, {});

  const handleUpButton = (
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
    // setChanged('');
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
            <MainContainer color={showDetails ? '#04A287;' : ''}>
              <AssetClassBox
                color={showDetails ? 'var(--brand-green)' : '#f1f1f1'}
              >
                <Head
                  columns="5fr 1fr 100px"
                  color={showDetails ? 'white' : 'black'}
                >
                  <AssetClassName>{assetClass.asset_class.name}</AssetClassName>
                  <Percent>{assetClass.asset_class.percent}%</Percent>
                  <ChevronBtn
                    onClick={() => {
                      setShowDetails(!showDetails);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={showDetails ? faChevronUp : faChevronDown}
                      color={showDetails ? 'white' : 'var(--brand-blue)'}
                      size="lg"
                    />
                  </ChevronBtn>
                </Head>
              </AssetClassBox>
              {showDetails && (
                <AssetClassDetails>
                  {assetClass.accounts_priorities.map((account) => {
                    return (
                      <AccountSection>
                        <AccountName>
                          Account: {account.account.name}
                        </AccountName>
                        <TradePriority>
                          {account.trade_priority
                            .sort((a, b) => b.sell_priority - a.sell_priority)
                            .map((priority, index) => {
                              return (
                                <Security
                                  columns="150px 5fr 100px"
                                  style={{
                                    border:
                                      priority.sell_priority ===
                                      account.trade_priority.length
                                        ? '1px dashed #2A2D34'
                                        : 'none',
                                    padding: '10px',
                                    background:
                                      changed.symbolId === priority.symbol_id &&
                                      changed.accountId === account.account.id
                                        ? ' #0CEBC5'
                                        : '',
                                  }}
                                >
                                  <Symbol>
                                    {symbols[priority.symbol_id].symbol}{' '}
                                  </Symbol>
                                  <Description>
                                    {symbols[priority.symbol_id].description}
                                  </Description>
                                  {editing && (
                                    <EditPriorityContainer>
                                      <UpButton
                                        hidden={index === 0}
                                        onClick={() =>
                                          handleUpButton(
                                            assetClass.asset_class.id,
                                            account.account.id,
                                            priority.symbol_id,
                                            priority.sell_priority,
                                            true,
                                          )
                                        }
                                      >
                                        <FontAwesomeIcon
                                          icon={faChevronUp}
                                          size="lg"
                                        />
                                      </UpButton>
                                      <DownButton
                                        hidden={
                                          index ===
                                          account.trade_priority.length - 1
                                        }
                                        onClick={() =>
                                          handleUpButton(
                                            assetClass.asset_class.id,
                                            account.account.id,
                                            priority.symbol_id,
                                            priority.sell_priority,
                                            false,
                                          )
                                        }
                                      >
                                        <FontAwesomeIcon
                                          icon={faChevronDown}
                                          size="lg"
                                        />
                                      </DownButton>
                                    </EditPriorityContainer>
                                  )}
                                </Security>
                              );
                            })}
                        </TradePriority>
                      </AccountSection>
                    );
                  })}
                </AssetClassDetails>
              )}
            </MainContainer>
          );
        })
      )}
    </Priorities>
  );
};

export default Prioritization;
