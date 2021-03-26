import styled from '@emotion/styled';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSymbols } from '../../selectors/symbols';
import { H2, H3 } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import { AssetClassPriorities } from '../../types/modelPortfolio';

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

type Props = {
  assetClass: AssetClassPriorities;
  editing: boolean;
  changed: any;
  handleBtn: any;
};

const AssetClassPriority = ({
  assetClass,
  editing,
  changed,
  handleBtn,
}: Props) => {
  const allSymbols = useSelector(selectSymbols);
  const [showDetails, setShowDetails] = useState(false);

  const symbols = allSymbols.reduce((acc: any, symbol) => {
    acc[symbol.id] = {
      symbol: symbol.symbol,
      description: symbol.description,
    };
    return acc;
  }, {});

  return (
    <MainContainer color={showDetails ? '#04A287;' : ''}>
      <AssetClassBox color={showDetails ? 'var(--brand-green)' : '#f1f1f1'}>
        <Head columns="5fr 1fr 100px" color={showDetails ? 'white' : 'black'}>
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
                <AccountName>Account: {account.account.name}</AccountName>
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
                          <Symbol>{symbols[priority.symbol_id].symbol} </Symbol>
                          <Description>
                            {symbols[priority.symbol_id].description}
                          </Description>
                          {editing && (
                            <EditPriorityContainer>
                              <UpButton
                                hidden={index === 0}
                                onClick={() =>
                                  handleBtn(
                                    assetClass.asset_class.id,
                                    account.account.id,
                                    priority.symbol_id,
                                    priority.sell_priority,
                                    true,
                                  )
                                }
                              >
                                <FontAwesomeIcon icon={faChevronUp} size="lg" />
                              </UpButton>
                              <DownButton
                                hidden={
                                  index === account.trade_priority.length - 1
                                }
                                onClick={() =>
                                  handleBtn(
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
};

export default AssetClassPriority;
