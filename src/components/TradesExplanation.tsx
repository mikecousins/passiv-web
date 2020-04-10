import React, { useState } from 'react';
import { BulletUL, H2, A } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import { Settings } from '../types/groupInfo';
import styled from '@emotion/styled';
// import { Table, A, P, Title } from '../../styled/GlobalElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const ToggleBox = styled.div`
  padding-top: 20px;
  padding-left: 10px;
`;

const ExplanationBox = styled.div`
  padding-top: 20px;
`;

const TopStyle = styled.div`
  a,
  h3,
  ul {
    color: #232225;
  }
`;

type Props = {
  container?: boolean;
  settings: Settings | null;
};

const TradesExplanation = ({ settings, container = false }: Props) => {
  const [showExplanation, setShowExplanation] = useState(false);

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

  const content = (
    <React.Fragment>
      {!container && <H2>Explanation</H2>}
      <BulletUL>
        {summary.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </BulletUL>
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
        {showExplanation && (
          <ExplanationBox>
            <ShadowBox>{content}</ShadowBox>
          </ExplanationBox>
        )}
      </TopStyle>
    );
  }
};

export default TradesExplanation;
