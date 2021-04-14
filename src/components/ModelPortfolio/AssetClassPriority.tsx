import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faExclamationCircle,
  faLongArrowAltUp,
} from '@fortawesome/free-solid-svg-icons';
import { selectCurrentGroupPositions } from '../../selectors/groups';
import { selectSymbols } from '../../selectors/symbols';
import { Button } from '../../styled/Button';
import { P, H2, H3 } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import { AssetClassPriorities } from '../../types/modelPortfolio';
import Tooltip from '../Tooltip';

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

type SecurityProps = {
  isChanged: boolean;
  allowBuy: boolean;
};

const Security = styled(Grid)<SecurityProps>`
  margin-bottom: 20px;
  padding: 10px;
  border: ${(props) => (props.allowBuy ? '1px dashed #2A2D34' : 'none')};
  background: ${(props) => (props.isChanged ? '#0CEBC5' : '')};
  > h2 {
    background: #dbfcf6;
    display: inline-block;
    position: relative;
    top: -20px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
`;

const Symbol = styled(H3)``;
const Description = styled(H3)`
  font-weight: 400;
  margin-left: 10px;
  text-align: left;
`;

const NewSecurity = styled.span`
  margin-left: 10px;
  padding: 2px 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.18px;
  color: #ffffff;
  background-color: #04a287;
`;

const EditPriorityContainer = styled.div``;

type UpDownBtnProps = {
  isHidden: boolean;
};
const UpDownButton = styled.button<UpDownBtnProps>`
  background-color: ${(props) => (props.isHidden ? 'transparent' : '#f2fffd')};
  padding: 10px 12px;
  border: 1px solid ${(props) => (props.isHidden ? '#bbbdc2' : '#2a2d34')};
  cursor: ${(props) => (props.isHidden ? 'auto' : 'pointer')};
  svg {
    color: ${(props) => props.isHidden && 'transparent'};
  }
`;

const NotSupported = styled.div`
  margin: 25px 0px;
  ul {
    padding: 10px;
  }
`;

type Props = {
  assetClass: AssetClassPriorities;
  editing: boolean;
  changed: any;
  handleBtn: any;
  onSettingsPage: boolean;
  confirm: any;
};

const AssetClassPriority = ({
  assetClass,
  editing,
  changed,
  handleBtn,
  onSettingsPage,
  confirm,
}: Props) => {
  const allSymbols = useSelector(selectSymbols);
  const currentGroupPositions = useSelector(selectCurrentGroupPositions);

  const [showDetails, setShowDetails] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (assetClass.asset_class.name === 'Excluded Assets') {
    return <></>;
  }
  const symbols = allSymbols.reduce((acc: any, symbol) => {
    acc[symbol.id] = {
      symbol: symbol.symbol,
      description: symbol.description,
    };
    return acc;
  }, {});

  const groupPositionsId = currentGroupPositions?.map((position) => {
    return position.symbol.id;
  });

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
                label={`Priorities ${
                  !confirmed ? 'not' : ''
                } set for this asset class.`}
              >
                {confirmed ? (
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
          <AssetClassName>{assetClass.asset_class.name}</AssetClassName>
          <Percent>{assetClass.asset_class.percent}%</Percent>
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
          {assetClass.accounts_priorities.map((account, index) => {
            const numberOfSecurities = account.trade_priority.length;
            const numberOfAssignedPriorities = account.trade_priority.filter(
              (priority) => priority.allow_sell,
            );
            return (
              <AccountSection
                last={index === assetClass.accounts_priorities.length - 1}
                key={account.account.id}
              >
                <AccountName>Account: {account.account.name}</AccountName>
                {numberOfSecurities > 1 && (
                  <H3
                    style={{
                      textAlign: 'right',
                      marginRight: '25px',
                    }}
                  >
                    Order by Priority
                  </H3>
                )}

                <Grid columns="5fr 10px">
                  {numberOfSecurities === 0 ? (
                    <NoSecurities>No Securities</NoSecurities>
                  ) : (
                    <TradePriority>
                      {account.trade_priority
                        .sort((a, b) => b.sell_priority - a.sell_priority)
                        .map((priority, index) => {
                          const allowSell = priority.allow_sell;
                          const allowBuy = priority.allow_buy;

                          return (
                            <Security
                              columns={
                                allowBuy && editing
                                  ? 'auto 100px 5fr 100px 100px'
                                  : editing
                                  ? 'auto 100px 5fr 100px'
                                  : '100px 5fr 100px'
                              }
                              isChanged={
                                changed.symbolId === priority.symbol_id &&
                                changed.accountId === account.account.id
                              }
                              allowBuy={allowBuy}
                              key={priority.symbol_id}
                            >
                              {editing && (
                                <input
                                  type="checkbox"
                                  checked={!allowSell}
                                  onChange={() => {
                                    handleBtn(
                                      assetClass.asset_class.id,
                                      account.account.id,
                                      priority.symbol_id,
                                      priority.sell_priority,
                                      false,
                                      true,
                                      allowSell,
                                      numberOfAssignedPriorities.length,
                                    );
                                  }}
                                />
                              )}

                              <Symbol>
                                {symbols[priority.symbol_id]?.symbol}{' '}
                              </Symbol>
                              <Description>
                                <span>
                                  {' '}
                                  {symbols[priority.symbol_id].description}
                                </span>
                                {!groupPositionsId?.includes(
                                  priority.symbol_id,
                                ) && <NewSecurity>New</NewSecurity>}
                              </Description>
                              {allowBuy && <H2>Buy</H2>}
                              {editing &&
                                numberOfAssignedPriorities.length > 1 &&
                                (index !== numberOfSecurities - 1 ||
                                  allowSell) &&
                                (index !== 0 || allowSell) && (
                                  <EditPriorityContainer>
                                    <UpDownButton
                                      isHidden={index === 0 || !allowSell}
                                      disabled={index === 0 || !allowSell}
                                      onClick={() =>
                                        handleBtn(
                                          assetClass.asset_class.id,
                                          account.account.id,
                                          priority.symbol_id,
                                          priority.sell_priority,
                                          true,
                                          false,
                                          allowSell,
                                          numberOfAssignedPriorities.length,
                                        )
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faChevronUp}
                                        size="lg"
                                      />
                                    </UpDownButton>
                                    <UpDownButton
                                      isHidden={
                                        index ===
                                          numberOfAssignedPriorities.length -
                                            1 || !allowSell
                                      }
                                      disabled={
                                        index ===
                                          numberOfAssignedPriorities.length -
                                            1 || !allowSell
                                      }
                                      onClick={() =>
                                        handleBtn(
                                          assetClass.asset_class.id,
                                          account.account.id,
                                          priority.symbol_id,
                                          priority.sell_priority,
                                          false,
                                          false,
                                          allowSell,
                                          numberOfAssignedPriorities.length,
                                        )
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faChevronDown}
                                        size="lg"
                                      />
                                    </UpDownButton>
                                  </EditPriorityContainer>
                                )}
                            </Security>
                          );
                        })}
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
                      {account.unsupported_symbols.map((symbol: any) => {
                        return <li key={symbol.id}>{symbol.symbol}</li>;
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
                setConfirmed(true);
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
