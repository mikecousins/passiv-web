import React from 'react';
import Performance from '../components/Performance/Performance';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadContributionTimeframe,
  loadTotalEquityTimeframe,
  loadContributions,
} from '../actions';
import { selectSelectedTimeframe } from '../selectors/performance';

const PerformancePage = () => {
  const dispatch = useDispatch();
  const selectedTimeframe = useSelector(selectSelectedTimeframe);
  dispatch(loadContributions(selectedTimeframe));
  dispatch(loadContributionTimeframe(selectedTimeframe));
  dispatch(loadTotalEquityTimeframe(selectedTimeframe));

  return (
    <React.Fragment>
      <Performance />
    </React.Fragment>
  );
};

export default PerformancePage;
