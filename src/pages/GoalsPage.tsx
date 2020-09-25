import React from 'react';
import { useSelector } from 'react-redux';
import Reporting from '../components/Performance/Reporting';
import Performance from '../components/Performance/Performance';
import { selectGoalsFeature } from '../selectors/features';
import Goals from '../components/Goals/Goals';

const GoalsPage = () => {
  const goalsFeature = useSelector(selectGoalsFeature);

  return (
    <React.Fragment>
      <Goals />
    </React.Fragment>
  );
};

export default GoalsPage;
