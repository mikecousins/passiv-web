import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentGroupPositions } from '../../../selectors/groups';
import { selectSymbols } from '../../../selectors/symbols';
import { H3 } from '../../../styled/GlobalElements';
import Grid from '../../../styled/Grid';

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

type Props = {
  priority: any;
  changed: any;
  account: any;
  numberOfSecurities: number;
  index: number;
  assetClassId: string;
  handleBtn: any;
  priorityKind: string;
};
const SecurityPriority = ({
  priority,
  changed,
  account,
  numberOfSecurities,
  index,
  assetClassId,
  handleBtn,
  priorityKind,
}: Props) => {
  const allSymbols = useSelector(selectSymbols);
  const currentGroupPositions = useSelector(selectCurrentGroupPositions);

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
    <div>
      <Security
        columns={
          priorityKind === 'none'
            ? 'auto 100px 5fr'
            : priorityKind === 'buy'
            ? '100px 5fr 100px'
            : 'auto 100px 5fr 100px'
        }
        isChanged={
          changed.symbolId === priority.id &&
          changed.accountId === account.account.id
        }
        allowBuy={priorityKind === 'buy' ? true : false}
        key={priority.id}
      >
        {priorityKind !== 'buy' && (
          <input
            type="checkbox"
            checked={priorityKind === 'none'}
            onChange={() =>
              handleBtn(
                false,
                index,
                assetClassId,
                account.account.id,
                priority,
                false,
                true,
                priorityKind === 'none',
              )
            }
          />
        )}

        <Symbol>{priority.symbol}</Symbol>
        <Description>
          <span> {symbols?.[priority.id]?.description}</span>
          {priority.id && !groupPositionsId?.includes(priority.id) && (
            <NewSecurity>New</NewSecurity>
          )}
        </Description>

        {numberOfSecurities > 0 && priority.id && priorityKind !== 'none' && (
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
                  priority,
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
                  priority,
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
