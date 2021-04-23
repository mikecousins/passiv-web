import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faExclamationCircle,
  faLongArrowAltUp,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../styled/Button';
import { P, H2, H3 } from '../../../styled/GlobalElements';
import Grid from '../../../styled/Grid';
import { AssetClassPriorities } from '../../../types/modelPortfolio';
import Tooltip from '../../Tooltip';
import SecurityPriority from './SecurityPriority';
import { useSelector } from 'react-redux';
import { selectSymbols } from '../../../selectors/symbols';

const MainContainer = styled.div`
  border: ${(p) => (p.color ? `2px solid ${p.color}` : 'none')};
  margin-bottom: 20px;
`;

const AssetClassBox = styled.div`
  background-color: ${(p) => p.color};
  padding: 20px;
`;

const Head = styled(Grid)`
  cursor: pointer;
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

const Status = styled.div`
  svg {
    text-align: center;
  }
`;

const AssetClassDetails = styled.div`
  padding: 10px 30px 20px 30px;
  background-color: #dbfcf6;
`;

type AccountSectionProps = {
  last: boolean;
};

const AccountSection = styled.div<AccountSectionProps>`
  border-bottom: ${(props) => (props.last ? 'none' : '1px solid #2a2d34')};
`;

const AccountName = styled(H3)`
  font-size: 22px;
  font-weight: 600;
  margin-top: 20px;
`;

const NoSecurities = styled(P)`
  text-align: center;
`;

const SellOrder = styled.div`
  font-size: 18px;
  writing-mode: vertical-rl;
  text-align: center;
  span {
    font-weight: 600;
    letter-spacing: 0.16px;
  }
`;

const TradePriority = styled.div`
  margin: 25px 0px 0px 0px;
`;

const NotSupported = styled.div`
  margin: 25px 0px;
  ul {
    padding: 10px;
  }
`;

type Props = {
  priority: AssetClassPriorities;
  changed: any;
  handleBtn: any;
  onSettingsPage: boolean;
  needToConfirm: string[];
  newAssets: string[];
  confirm: () => void;
};

const AssetClassPriority = ({
  priority,
  changed,
  handleBtn,
  onSettingsPage,
  needToConfirm,
  newAssets,
  confirm,
}: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  const allSymbols = useSelector(selectSymbols);
  const symbols = allSymbols.reduce((acc: any, symbol) => {
    acc[symbol.id] = {
      symbol: symbol.symbol,
      description: symbol.description,
    };
    return acc;
  }, {});

  if (priority.asset_class.name === 'Excluded Assets') {
    return <></>;
  }

  return (
    <MainContainer color={showDetails ? '#04A287' : ''}>
      <AssetClassBox color={showDetails ? 'var(--brand-green)' : '#f1f1f1'}>
        <Head
          columns={onSettingsPage ? '5fr 1fr 100px' : 'auto 5fr 1fr 100px'}
          color={showDetails ? 'white' : 'black'}
          onClick={() => {
            setShowDetails(!showDetails);
          }}
        >
          {!onSettingsPage && (
            <Status>
              <Tooltip
                label={`Prioritization is ${
                  needToConfirm.includes(priority.asset_class.id) ? 'not' : ''
                } confirmed for this asset class.`}
              >
                {!needToConfirm.includes(priority.asset_class.id) ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    size="lg"
                    color={showDetails ? 'white' : 'var(--brand-green)'}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    size="lg"
                    color="orange"
                  />
                )}
              </Tooltip>
            </Status>
          )}
          <AssetClassName>{priority.asset_class.name}</AssetClassName>
          <Percent>{priority.asset_class.percent}%</Percent>
          <ChevronBtn>
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
          {priority.accounts_priorities.map((account, index) => {
            const numberOfSecurities =
              account.buy_priority.length +
              account.sell_priority.length +
              account.do_not_trade.length;
            return (
              <AccountSection
                last={index === priority.accounts_priorities.length - 1}
                key={account.account.id}
              >
                <AccountName>Account: {account.account.name}</AccountName>
                {numberOfSecurities > 1 && (
                  <Grid columns="5fr 180px" style={{ marginTop: '30px' }}>
                    <H3>Do Not Trade</H3>
                    <H3>Order by Priority</H3>
                  </Grid>
                )}

                <Grid columns="5fr 10px">
                  {numberOfSecurities === 0 ? (
                    <NoSecurities>No Securities</NoSecurities>
                  ) : (
                    <TradePriority>
                      <SecurityPriority
                        symbolId={account.buy_priority[0]}
                        symbolName={symbols?.[account.buy_priority[0]]?.symbol}
                        symbolDesc={
                          symbols?.[account.buy_priority[0]]?.description
                        }
                        changed={changed}
                        account={account}
                        numberOfSecurities={numberOfSecurities}
                        index={index}
                        assetClassId={priority.asset_class.id}
                        handleBtn={handleBtn}
                        priorityKind="buy"
                        newAsset={false}
                      />
                      {account.sell_priority.map((sellPriority, index) => {
                        return (
                          <SecurityPriority
                            key={sellPriority}
                            symbolId={sellPriority}
                            symbolName={symbols?.[sellPriority]?.symbol}
                            symbolDesc={symbols?.[sellPriority]?.description}
                            changed={changed}
                            account={account}
                            numberOfSecurities={numberOfSecurities}
                            index={index}
                            assetClassId={priority.asset_class.id}
                            handleBtn={handleBtn}
                            priorityKind="sell"
                            newAsset={newAssets.includes(sellPriority)}
                          />
                        );
                      })}{' '}
                      {account.do_not_trade.map((noTrade, index) => {
                        return (
                          <SecurityPriority
                            key={noTrade}
                            symbolId={noTrade}
                            symbolName={symbols?.[noTrade]?.symbol}
                            symbolDesc={symbols?.[noTrade]?.description}
                            changed={changed}
                            account={account}
                            numberOfSecurities={numberOfSecurities}
                            index={index}
                            assetClassId={priority.asset_class.id}
                            handleBtn={handleBtn}
                            priorityKind="none"
                            newAsset={false}
                          />
                        );
                      })}{' '}
                    </TradePriority>
                  )}
                  {numberOfSecurities > 1 && (
                    <SellOrder>
                      <FontAwesomeIcon icon={faLongArrowAltUp} />{' '}
                      <span>Sell Order</span>
                    </SellOrder>
                  )}
                </Grid>
                {account.unsupported_symbols.length > 0 && (
                  <NotSupported>
                    <H3>Unsupported Securities:</H3>
                    <ul>
                      {account.unsupported_symbols.map((symbolId: string) => {
                        return (
                          <li key={symbolId} style={{ marginBottom: '10px' }}>
                            {symbols?.[symbolId]?.symbol}
                          </li>
                        );
                      })}
                    </ul>
                  </NotSupported>
                )}
              </AccountSection>
            );
          })}
          {!onSettingsPage && (
            <Button
              onClick={() => {
                setShowDetails(false);
                confirm();
              }}
            >
              Confirm Priorities
            </Button>
          )}
        </AssetClassDetails>
      )}
    </MainContainer>
  );
};

export default AssetClassPriority;
