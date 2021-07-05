import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import {
  setActivitiesStartDate,
  setActivitiesEndDate,
  loadAllActivities,
  loadFilteredActivities,
} from '../../actions/performance';
import {
  selectActivitiesStartDate,
  selectActivitiesEndDate,
} from '../../selectors/performance';
import { validDates } from './AccountsSelect';
import { formattedToday } from './DatePickers';

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

export const ActivityDatePickers = () => {
  const dispatch = useDispatch();
  const startDate: string = useSelector(selectActivitiesStartDate);
  const endDate: string = useSelector(selectActivitiesEndDate);
  const [showInvalidDateMessage, setshowInvalidDateMessage] = useState(false);
  const handleStartDateChange = (ev: any) =>
    dispatch(setActivitiesStartDate(ev.target.value));
  const handleEndDateChange = (ev: any) =>
    dispatch(setActivitiesEndDate(ev.target.value));
  const today = formattedToday();

  if (startDate === null || endDate === null) {
    return null;
  }

  return (
    <React.Fragment>
      <div>
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
            max={today}
          />
        </End>
        <Submit
          type="submit"
          value="Apply"
          onClick={() => {
            if (validDates(startDate, endDate)) {
              setshowInvalidDateMessage(false);
              console.log('filtered');

              dispatch(loadFilteredActivities(startDate, endDate));
            } else {
              setshowInvalidDateMessage(true);
            }
          }}
        />
        <Submit
          type="submit"
          value="Load All"
          onClick={() => {
            dispatch(loadAllActivities());
          }}
        />
        {showInvalidDateMessage && <div>&nbsp;Invalid Dates</div>}
      </div>
    </React.Fragment>
  );
};

export default ActivityDatePickers;
