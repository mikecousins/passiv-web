import React from 'react';
import Performance from '../components/Performance/Performance';
import { useDispatch, useSelector } from 'react-redux';
import { loadPerformanceAll } from '../actions/performance';
import { selectSelectedTimeframe } from '../selectors/performance';

const PerformancePage = () => {
  const dispatch = useDispatch();
  //const selectedTimeframe = '1Y';//useSelector(selectSelectedTimeframe);
  // dispatch(loadContributions('1Y'));
  // dispatch(loadContributionTimeframe('1Y'));
  // dispatch(loadTotalEquityTimeframe('1Y'));
  // dispatch(loadContributions('YTD'));
  // dispatch(loadContributionTimeframe('YTD'));
  // dispatch(loadTotalEquityTimeframe('YTD'));
  // dispatch(loadContributions('30D'));
  // dispatch(loadContributionTimeframe('30D'));
  // dispatch(loadTotalEquityTimeframe('30D'));
  dispatch(loadPerformanceAll());

  return (
    <React.Fragment>
      <Performance />
    </React.Fragment>
  );
};

export default PerformancePage;
