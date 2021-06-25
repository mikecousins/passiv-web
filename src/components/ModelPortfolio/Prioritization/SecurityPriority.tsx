import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { selectCurrentGroupPositions } from '../../../selectors/groups';
import { H2, H3, P } from '../../../styled/GlobalElements';
import Grid from '../../../styled/Grid';
import { selectIsMobile, selectIsTablet } from '../../../selectors/browser';
import { CheckBox } from '../../../styled/CheckBox';
import { AccountPriorities } from '../../../types/modelPortfolio';
import { HandleBtnType } from './AssetClassPriority';
import Tooltip from '../../Tooltip';
import Tour from '../../Tour/Tour';
import { AssetClassPrioritiesSteps } from '../../Tour/TourSteps';

type SecurityProps = {
  isChanged: boolean;
  priorityKind: string;
};

const Security = styled(Grid)<SecurityProps>`
  margin-bottom: 20px;
  padding: 10px;
  border: ${(props) =>
    props.priorityKind === 'buy' ? '1px dashed var(--brand-grey)' : 'none'};
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
  @media (max-width: 840px) {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: ${(props) =>
      props.priorityKind === 'none'
        ? '50px 1fr 2fr'
        : props.priorityKind === 'buy'
        ? '2fr 3fr 1fr'
        : '50px 2fr 3fr 1fr'};
  }
  @media (max-width: 500px) {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: ${(props) =>
      props.priorityKind === 'none'
        ? '50px 3fr'
        : props.priorityKind === 'buy'
        ? 'repeat(2, auto)'
        : '50px 3fr 3fr'};
  }
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
  color: var(--white);
  background-color: var(--brand-green);
`;
const NewSecurity = styled(NotHolding)`
  background-color: var(--brand-orange);
`;

const EditPriorityContainer = styled.div``;

type UpDownBtnProps = {
  isHidden: boolean;
};
const UpDownButton = styled.button<UpDownBtnProps>`
  background-color: ${(props) => (props.isHidden ? 'transparent' : '#f2fffd')};
  padding: 10px 12px;
  border: 1px solid
    ${(props) => (props.isHidden ? '#bbbdc2' : 'var(--brand-grey)')};
  cursor: ${(props) => (props.isHidden ? 'auto' : 'pointer')};
  svg {
    color: ${(props) => props.isHidden && 'transparent'};
  }
`;

type Props = {
  symbolId: string;
  symbolName: string;
  symbolDesc: string;
  changed: {
    symbolId: string;
    accountId: string;
  };
  account: AccountPriorities;
  numberOfSecurities: number;
  index: number;
  assetClassId: string;
  handleBtn: HandleBtnType;
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
  const onTablet = useSelector(selectIsTablet);

  return (
    <div>
      {index === 0 && (
        <Tour
          steps={AssetClassPrioritiesSteps}
          name="asset_class_priorities_tour"
        />
      )}

      <Security
        columns={
          priorityKind === 'none'
            ? '90px 100px 5fr'
            : priorityKind === 'buy'
            ? '90px 100px 5fr auto 100px'
            : '90px 100px 5fr 100px'
        }
        isChanged={
          changed.symbolId === symbolId &&
          changed.accountId === account.account.id
        }
        priorityKind={priorityKind}
        key={symbolId}
        className={priorityKind === 'buy' ? 'tour-priorities-buy-box' : ''}
      >
        {priorityKind === 'buy' ? (
          <div></div>
        ) : (
          <CheckBox className="tour-priorities-do-not-trade">
            <label className="container">
              <input
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
              <span className="checkmark"></span>
            </label>
          </CheckBox>
        )}

        {priorityKind === 'buy' && !symbolId ? (
          <>
            <div></div>
            <NoBuy>There is no security to buy.</NoBuy>
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

        {priorityKind === 'buy' && !onMobile && !onTablet && (
          <H2>
            Buy{' '}
            <Tooltip label="Choose ONE security to be bought in this account.">
              <FontAwesomeIcon icon={faInfoCircle} size="sm" />
            </Tooltip>
          </H2>
        )}
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
