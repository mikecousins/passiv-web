import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePickers from './DatePickers';
import AccountsSelect from './AccountsSelect';
import { setSelectedTimeframe } from '../../actions/performance';
import { selectSelectedTimeframe } from '../../selectors/performance';

const TimeContainer = styled.div`
  border-radius: 6px;
  background: var(--brand-grey);
  border: 1px solid #04a185;
  display: flex;
  box-shadow: 0 4px 12px 2px rgba(2, 2, 2, 0.26);
  z-index: 100;
  margin-right: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  @media (min-width: 900px) {
    width: 470px;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const TimespanStyle = styled.span`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  display: inline-block;
  flex: 1;
  cursor: pointer;
  border-right: 1px solid #04a185;
  display: flex;
  justify-content: center;
  button {
    color: #fff;
    padding: 12px 5px;
  }
  &:last-of-type {
    border-right: none;
  }
  &.selected {
    background-color: #04a286;
  }
`;

const Flex = styled.div`
  position: sticky;
  top: 92px;
  z-index: 10;
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
  }
`;

type Props = {
  timeframe: string;
  selectedTimeframe: string;
  setTimeframe: (newTimeFrame: string) => void;
};
export const TimespanSelector: FunctionComponent<Props> = ({
  timeframe,
  selectedTimeframe,
  setTimeframe,
}) => {
  let timeframeString = '1Y';

  if (timeframe === '1Y') {
    timeframeString = '1 Year';
  } else if (timeframe === 'YTD') {
    timeframeString = 'Year to Date';
  } else if (timeframe === 'ALL') {
    timeframeString = 'All Time';
  } else if (timeframe === '30D') {
    timeframeString = '30 Days';
  } else if (timeframe === 'CST') {
    timeframeString = 'Custom';
  }

  let selected = timeframe === selectedTimeframe;

  return (
    <TimespanStyle
      className={selected ? 'selected' : ''}
      onClick={() => setTimeframe(timeframe)}
    >
      <button>{timeframeString}</button>
    </TimespanStyle>
  );
};

export const TimeframePicker = () => {
  const dispatch = useDispatch();
  let selectedTimeframe = useSelector(selectSelectedTimeframe);
  let showDatePickers = false;
  if (selectedTimeframe === 'CST') {
    showDatePickers = true;
  }
  return (
    <Flex>
      <TimeContainer>
        <TimespanSelector
          timeframe={'1Y'}
          selectedTimeframe={selectedTimeframe}
          setTimeframe={(t) => dispatch(setSelectedTimeframe(t))}
        />
        <TimespanSelector
          timeframe={'YTD'}
          selectedTimeframe={selectedTimeframe}
          setTimeframe={(t) => dispatch(setSelectedTimeframe(t))}
        />
        <TimespanSelector
          timeframe={'ALL'}
          selectedTimeframe={selectedTimeframe}
          setTimeframe={(t) => dispatch(setSelectedTimeframe(t))}
        />
        <TimespanSelector
          timeframe={'CST'}
          selectedTimeframe={selectedTimeframe}
          setTimeframe={(t) => dispatch(setSelectedTimeframe(t))}
        />
        {showDatePickers && <DatePickers />}
      </TimeContainer>
      <AccountsSelect />
    </Flex>
  );
};

export default TimeframePicker;
