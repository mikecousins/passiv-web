import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BulletUL, H3, A } from '../styled/GlobalElements';
import { Settings } from '../types/groupInfo';
import { Account } from '../types/account';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { selectCurrencies } from '../selectors';
import { restrictionTypes } from '../common';
import Number from './Number';

const ToggleBox = styled.div`
  padding-top: 20px;
`;

const ExplanationBox = styled.div`
  padding-top: 20px;
`;

const BulletULm = styled(BulletUL)`
  margin-top: 12px;
`;

const TopStyle = styled.div`
  a,
  h3,
  ul {
    color: #232225;
  }
  h3 {
    margin-top: 20px;
  }
`;

type Props = {
  container?: boolean;
  settings: Settings | null;
  accounts: Account[];
};

const TradesExplanation = ({
  settings,
  accounts,
  container = false,
}: Props) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const currencies = useSelector(selectCurrencies);

  const getCurrency = (currencyId: string) =>
    currencies && currencies.find(c => c.id === currencyId);
  const getType = (typeId: string) =>
    restrictionTypes.find(r => r.id === typeId);

  const toggleShowExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  if (!settings) {
    return null;
  }

  let summary = [];
  if (settings.buy_only) {
    summary.push(
      'Passiv will use available cash to purchase the most underweight assets in your portfolio.',
    );
    summary.push('Sell orders are not permitted.');
  } else {
    summary.push(
      'Passiv will buy and sell assets to get as close to 100% accuracy as possible.',
    );
  }
  if (settings.prevent_currency_conversion) {
    if (!settings.hard_currency_separation) {
      summary.push(
        'Currency exchange is not allowed and excess currency will be retained as cash so that it can be manually exchanged.',
      );
    } else {
      summary.push(
        'Currency exchange is not allowed and excess currency will be allocated to existing assets in the same currency.',
      );
    }
  } else {
    summary.push(
      'Currency exchange is allowed, which may result in foreign exchange transactions if there is a currency imbalance.',
    );
  }

  accounts.map(a =>
    a.cash_restrictions.map(cr => {
      const cashRestrictionType = getType(cr.type);
      const currency = getCurrency(cr.currency);

      let explainText = (
        <React.Fragment>
          {a.name} must keep at least <Number value={cr.amount} currency />{' '}
          {currency != null && currency.code} as cash.
        </React.Fragment>
      );

      if (
        cashRestrictionType !== undefined &&
        cashRestrictionType.id === 'ALLOCATE_MAX'
      ) {
        explainText = (
          <React.Fragment>
            {a.name} will use a max of <Number value={cr.amount} currency />{' '}
            {currency != null && currency.code} to purchase new assets.
          </React.Fragment>
        );
      }

      summary.push(explainText);
      return null;
    }),
  );

  const content = (
    <React.Fragment>
      {!container && <H3>Explanation</H3>}
      <BulletULm>
        {summary.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </BulletULm>
    </React.Fragment>
  );

  const toggle = (
    <ToggleBox>
      <A onClick={() => toggleShowExplanation()}>
        {showExplanation ? (
          <span>
            Hide Explanation <FontAwesomeIcon icon={faCaretUp} />
          </span>
        ) : (
          <span>
            Show Explanation <FontAwesomeIcon icon={faCaretDown} />
          </span>
        )}
      </A>
    </ToggleBox>
  );

  if (container === false) {
    return content;
  } else {
    return (
      <TopStyle>
        {toggle}
        {showExplanation && <ExplanationBox>{content}</ExplanationBox>}
      </TopStyle>
    );
  }
};

export default TradesExplanation;
