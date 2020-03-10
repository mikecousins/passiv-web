import React from 'react';
import Performance from '../components/Performance/Performance';
import { useDispatch } from 'react-redux';
import { loadPerformanceAll } from '../actions/performance';

const PerformancePage = () => {
  const dispatch = useDispatch();
  dispatch(loadPerformanceAll());

  return (
    <React.Fragment>
      <Performance />
    </React.Fragment>
  );
};

export default PerformancePage;
