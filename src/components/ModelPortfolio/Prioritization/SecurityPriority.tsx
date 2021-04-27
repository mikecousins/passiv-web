import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentGroupPositions } from '../../../selectors/groups';
import { H2, H3, P } from '../../../styled/GlobalElements';
import Grid from '../../../styled/Grid';
import { selectIsMobile } from '../../../selectors/browser';

type SecurityProps = {
  isChanged: boolean;
  priorityKind: string;
};

const Security = styled(Grid)<SecurityProps>`
  margin-bottom: 20px;
  padding: 10px;
  border: ${(props) =>
    props.priorityKind === 'buy' ? '1px dashed #2A2D34' : 'none'};
  background: ${(props) => (props.isChanged ? '#0CEBC5' : '')};
  > h2 {
    background: #dbfcf6;
    display: inline-block;
    position: relative;
    top: -20px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    padding: 0px 20px;
  }
  @media (max-width: 900px) {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: ${(props) =>
      props.priorityKind === 'none'
        ? '50px 3fr'
        : props.priorityKind === 'buy'
        ? '5fr 3fr'
        : '50px 3fr 3fr'};
  }
`;

const CheckBox = styled.input`
  max-width: 20px;
`;

const NoBuy = styled(P)`
  text-align: center;
`;

type SymbolProps = {
  noTrade: boolean;
};
const Symbol = styled(H3)<SymbolProps>`
  color: ${(props) => (props.noTrade ? 'grey' : 'black')};
`;
type DescriptionProps = {
  noTrade: boolean;
};
const Description = styled(H3)<DescriptionProps>`
  color: ${(props) => (props.noTrade ? 'grey' : 'black')};
  font-weight: 400;
  margin-left: 10px;
  text-align: left;
`;

const NotHolding = styled.span`
  margin-left: 10px;
  padding: 2px 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.18px;
  color: #ffffff;
  background-color: #04a287;
`;
const NewSecurity = styled(NotHolding)`
  background-color: orange;
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

type Props = {
  symbolId: string;
  symbolName: string;
  symbolDesc: string;
  changed: any;
  account: any;
  numberOfSecurities: number;
  index: number;
  assetClassId: string;
  handleBtn: any;
  priorityKind: string;
  newAsset: boolean;
};
const SecurityPriority = ({
  symbolId,
  symbolName,
  symbolDesc,
  changed,
  account,
  numberOfSecurities,
  index,
  assetClassId,
  handleBtn,
  priorityKind,
  newAsset,
}: Props) => {
  const currentGroupPositions = useSelector(selectCurrentGroupPositions);

  const groupPositionsId = currentGroupPositions?.map((position) => {
    return position.symbol.id;
  });

  const onMobile = useSelector(selectIsMobile);

  return (
    <div>
      <Security
        columns={
          priorityKind === 'none'
            ? '80px 100px 5fr'
            : priorityKind === 'buy'
            ? '100px 5fr auto 100px'
            : '80px 100px 5fr 100px'
        }
        isChanged={
          changed.symbolId === symbolId &&
          changed.accountId === account.account.id
        }
        priorityKind={priorityKind}
        key={symbolId}
      >
        {priorityKind !== 'buy' && (
          <CheckBox
            type="checkbox"
            checked={priorityKind === 'none'}
            onChange={() =>
              handleBtn(
                false,
                index,
                assetClassId,
                account.account.id,
                symbolId,
                false,
                true,
                priorityKind === 'none',
              )
            }
          />
        )}

        {priorityKind === 'buy' && !symbolId ? (
          <>
            <div></div>
            <NoBuy>No Securities to buy.</NoBuy>
          </>
        ) : (
          <>
            <Symbol noTrade={priorityKind === 'none'}>{symbolName}</Symbol>
            {!onMobile && (
              <Description noTrade={priorityKind === 'none'}>
                <span> {symbolDesc}</span>
                {symbolId && !groupPositionsId?.includes(symbolId) && (
                  <NotHolding>Not holding</NotHolding>
                )}
                {newAsset && <NewSecurity>New</NewSecurity>}
              </Description>
            )}
          </>
        )}

        {priorityKind === 'buy' && !onMobile && <H2>Buy</H2>}
        {numberOfSecurities > 0 && symbolId && priorityKind !== 'none' && (
          <EditPriorityContainer>
            <UpDownButton
              isHidden={priorityKind === 'buy'}
              disabled={priorityKind === 'buy'}
              onClick={() =>
                handleBtn(
                  true,
                  index,
                  assetClassId,
                  account.account.id,
                  symbolId,
                  priorityKind === 'buy' && true,
                  false,
                )
              }
            >
              <FontAwesomeIcon icon={faChevronUp} size="lg" />
            </UpDownButton>
            <UpDownButton
              isHidden={
                priorityKind === 'sell' &&
                index === account.sell_priority.length - 1
              }
              disabled={
                priorityKind === 'sell' &&
                index === account.sell_priority.length - 1
              }
              onClick={() =>
                handleBtn(
                  false,
                  index,
                  assetClassId,
                  account.account.id,
                  symbolId,
                  priorityKind === 'buy' && true,
                  false,
                )
              }
            >
              <FontAwesomeIcon icon={faChevronDown} size="lg" />
            </UpDownButton>
          </EditPriorityContainer>
        )}
      </Security>
    </div>
  );
};

export default SecurityPriority;
