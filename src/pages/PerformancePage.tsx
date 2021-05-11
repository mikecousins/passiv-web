import React from 'react';
import { useSelector } from 'react-redux';
import Reporting from '../components/Performance/Reporting';
import Performance from '../components/Performance/Performance';
import { selectAdjustedCostBasisFeature } from '../selectors/features';

const PerformancePage = () => {
  const acbFeature = useSelector(selectAdjustedCostBasisFeature);

  return (
    <React.Fragment>
      {acbFeature && <Reporting />}
      {!acbFeature && <Performance />}
    </React.Fragment>
  );
};

export default PerformancePage;
