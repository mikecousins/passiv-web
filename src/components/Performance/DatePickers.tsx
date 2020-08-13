import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { setStartDate, setEndDate } from '../../actions/performance';
import { selectStartDate, selectEndDate } from '../../selectors/performance';

const Range = styled.div`
  background: #04a286;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 8px 0;
  input {
    color: #fff;
    position: relative;
    width: 130px;
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
export const DatePickers = () => {
  const dispatch = useDispatch();
  const startDate: string = useSelector(selectStartDate);
  const endDate: string = useSelector(selectEndDate);
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
