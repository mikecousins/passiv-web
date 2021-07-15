import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import {
  setStartDate,
  setEndDate,
  loadPerformanceCustom,
} from '../../actions/performance';
import {
  selectStartDate,
  selectEndDate,
  selectSelectedAccounts,
} from '../../selectors/performance';
import { validDates } from './AccountsSelect';

const Range = styled.div`
  background: #04a286;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 8px 0;
  justify-content: flex-end;
  input {
    color: #fff;
    position: relative;
    padding: 6px 20px;
    &::-webkit-calendar-picker-indicator {
      font-size: 14px;
      position: absolute;
      right: 3px;
    }
  }
  label {
    margin-right: 2px;
  }
`;
const Start = styled.div`
  display: flex;
  margin-right: 4px;
  padding: 0 6px;
  align-items: center;
`;
const End = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6px;
`;
const Submit = styled.input`
  background: #03846d;
  color: #fff;
  z-index: 2;
  border-radius: 4px 4px 4px 4px;
  margin-right: 6px;
`;

const DatePickers = () => {
  const dispatch = useDispatch();
  const startDate: string = useSelector(selectStartDate);
  const endDate: string = useSelector(selectEndDate);
  const accounts: any[] = useSelector(selectSelectedAccounts);
  const [showInvalidDateMessage, setshowInvalidDateMessage] = useState(false);
  const handleStartDateChange = (ev: any) =>
    dispatch(setStartDate(ev.target.value));
  const handleEndDateChange = (ev: any) =>
    dispatch(setEndDate(ev.target.value));
  const today = formattedToday();

  if (startDate === null || endDate === null) {
    return null;
  }

  return (
    <React.Fragment>
      <Range>
        <Start>
          <label>Start:</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            max={endDate}
          />
        </Start>
        <End>
          <label>End:</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate}
            max={today}
          />
        </End>
        <Submit
          type="submit"
          value="Apply"
          onClick={() => {
            if (validDates(startDate, endDate)) {
              setshowInvalidDateMessage(false);
              dispatch(
                loadPerformanceCustom(
                  accounts.map((a) => a?.value),
                  startDate,
                  endDate,
                ),
              );
            } else {
              setshowInvalidDateMessage(true);
            }
          }}
        />
        {showInvalidDateMessage && <div>&nbsp;Invalid Dates</div>}
      </Range>
    </React.Fragment>
  );
};

export default DatePickers;

export const formattedToday = () => {
  let d = new Date();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const formattedYearAgo = () => {
  const today = formattedToday();
  const lastYear = parseInt(today.substr(0, 4)) - 1;

  return lastYear.toString() + today.substr(4);
};
