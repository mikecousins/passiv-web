import React from 'react';
import styled from '@emotion/styled';
import { PerformanceGroups } from '../components/Performance/PerformanceGroups';
import Performance from '../components/Performance/Performance';
import { selectIsDemo } from '../selectors';
import { useSelector } from 'react-redux';

const PerformancePage = () => {
  const isDemo = useSelector(selectIsDemo);
  return (
    <React.Fragment>
      <Performance />
    </React.Fragment>
  );
};

export default PerformancePage;
