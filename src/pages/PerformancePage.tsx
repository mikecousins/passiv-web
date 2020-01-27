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
  dispatch(loadContributionTimeframe(useSelector(selectSelectedTimeframe)));
  // dispatch(loadTotalEquityTimeframe(useSelector(selectSelectedTimeframe))));
  dispatch(loadContributions(useSelector(selectSelectedTimeframe)));

  return (
    <React.Fragment>
      <Performance />
    </React.Fragment>
  );
};

export default PerformancePage;
