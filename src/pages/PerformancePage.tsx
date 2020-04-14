import React from 'react';
import { useSelector } from 'react-redux';
import Reporting from '../components/Performance/Reporting';
import Performance from '../components/Performance/Performance';
import {
  selectPerformancePageFeature,
  selectAdjustedCostBasisFeature,
  selectGoalsFeature,
} from '../selectors/features';

const PerformancePage = () => {
  const acbFeature = useSelector(selectAdjustedCostBasisFeature);
  const goalsFeature = useSelector(selectGoalsFeature);

  return (
    <React.Fragment>
      {(acbFeature || goalsFeature) && <Reporting />}
      {!acbFeature && !goalsFeature && <Performance />}
    </React.Fragment>
  );
  //return <Performance />;
};

export default PerformancePage;
