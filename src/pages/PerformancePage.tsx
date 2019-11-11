import React from 'react';
import styled from '@emotion/styled';
import PerformanceAccounts from '../components/Performance/PerformanceAccounts';
import Performance from '../components/Performance/Performance';
import { selectIsDemo } from '../selectors';
import { useSelector } from 'react-redux';

const PerformancePage = () => {
  const isDemo = useSelector(selectIsDemo);
  return (
    <React.Fragment>
      <Performance />
      <PerformanceAccounts />
    </React.Fragment>
  );
};

export default PerformancePage;
