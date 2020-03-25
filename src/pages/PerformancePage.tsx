import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadPerformanceAll } from '../actions/performance';
import Performance from '../components/Performance/Performance';

const PerformancePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPerformanceAll());
  }, [dispatch]);

  return <Performance />;
};

export default PerformancePage;
