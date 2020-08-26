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

const TryOneClickContainer = styled.div`
  background: #fff;
  border-left: 2px solid #023ca2;
  background-color: white;
  margin-bottom: -2px;
  display: inline-block;
`;

const RemainingBox = styled.button`
  font-size: 17px;
  border: 1px;
  width: max-content;
  margin: 10px 0;
  border-radius: 10px;
  padding: 4px;
  span {
    margin: 0 7px;
  }
  svg {
    color: #003ba2;
    font-size: 20px;
  }
`;
const LearnMore = styled.span`
  color: #003ba2;
  font-weight: 700;
  font-size: 16px;
  svg {
    vertical-align: middle;
    margin-bottom: 3px;
  }
`;

const ExplanationBox = styled.div`
  padding: 5px 20px 20px 18px;
  color: #232225;
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
        <div>
          <TryOneClickContainer>
            <RemainingBox onClick={() => toggleShowExplanation()}>
              <FontAwesomeIcon icon={faGift} />
              <span>
                You have{' '}
                <strong>
                  {`${incentives.free_one_click_trade} free One-Click Trades`}
                </strong>{' '}
                to try!
              </span>
              {showExplanation ? (
                <LearnMore>
                  <FontAwesomeIcon icon={faCaretUp} />
                </LearnMore>
              ) : (
                <LearnMore>
                  Learn More <FontAwesomeIcon icon={faCaretDown} />
                </LearnMore>
              )}
            </RemainingBox>

            {showExplanation ? (
              <ExplanationBox>
                <P>
                  Our goal at Passiv is to make investing easier for you. Would
                  you like to try our elite <strong>One-Click Trade</strong>{' '}
                  feature?
                </P>
                <P>Here's how you can get started:</P>
                <OrderedList>
                  <li>
                    Click on <strong>Preview Orders</strong> to get an estimate
                    for your orders.
                  </li>
                  <li>
                    Place your orders by clicking on the{' '}
                    <strong>Confirm</strong> button.
                  </li>
                </OrderedList>
              </ExplanationBox>
            ) : null}
          </TryOneClickContainer>
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default TryOneClickTrades;
