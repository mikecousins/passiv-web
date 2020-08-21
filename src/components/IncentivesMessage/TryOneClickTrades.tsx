import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIncentives } from '../../selectors';
import { selectIsFree } from '../../selectors/subscription';

import styled from '@emotion/styled';
import { P } from '../../styled/GlobalElements';

import {
  faGift,
  faCaretUp,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RemainingBox = styled.div`
  font-size: 17px;
  font-weight: 1000;
  background: white;
  color: #003ba2;
  border: 1px;
  width: max-content;
  margin: 10px 0;
  border-radius: 10px;
  padding: 4px;
`;

const ExplanationBox = styled.div`
  padding: 4px;
  margin: 7px 0;
  background: white;
`;

const OrderedList = styled.ol`
  padding-top: 2px;
  margin-left: 40px;
  list-style-type: number;
  li {
    margin-bottom: 10px;
    line-height: 1.3;
  }
`;

const TryOneClickTrades = () => {
  const incentives = useSelector(selectIncentives);
  const isCommunityUser = useSelector(selectIsFree);

  const [showExplanation, setShowExplanation] = useState(false);

  const toggleShowExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  if (incentives && incentives.free_one_click_trade && isCommunityUser) {
    return (
      <React.Fragment>
        <RemainingBox onClick={() => toggleShowExplanation()}>
          <FontAwesomeIcon icon={faGift} />
          &nbsp; Make a free One-Click Trade &nbsp;
          {showExplanation ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </RemainingBox>

        {showExplanation ? (
          <ExplanationBox>
            <P>
              Our goal at Passiv is to make investing easier for you. Would you
              like to try our <strong>One-Click Trade</strong> feature?
            </P>
            <P>Here's how you can get started:</P>
            <OrderedList>
              <li>
                Click on <strong>Preview Orders</strong> to get an estimate for
                your orders.
              </li>
              <li>
                Place your orders by clicking on the <strong>Confirm</strong>{' '}
                button.
              </li>
            </OrderedList>
            <P>
              You have{' '}
              <strong>
                {`${incentives.free_one_click_trade} free One-Click Trades Remaining`}
                .
              </strong>
            </P>
          </ExplanationBox>
        ) : null}
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default TryOneClickTrades;
