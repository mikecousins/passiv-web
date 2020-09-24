import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { P, A } from '../../styled/GlobalElements';
import GoalSetup from './GoalSetup';

const BetaBanner = styled(P)`
  text-align: center;
  padding-bottom: 20px;
  color: #555555;
`;

const AddGoalButton = styled.button`
  float: right;
  background: #03846d;
  color: #fff;
  z-index: 2;
  border-radius: 4px 4px 4px 4px;
  margin-right: 6px;
  padding: 10px;
`;

export const Goals = () => {
  const [currentMode, setCurrentMode] = useState('view');

  return (
    <React.Fragment>
      <AddGoalButton onClick={() => setCurrentMode('add')}>
        Add Goal +{' '}
      </AddGoalButton>
      {currentMode === 'add' && <GoalSetup setGoalMode={setCurrentMode} />}
      {currentMode === 'view' && <div>View Mode</div>}

      <BetaBanner>
        Open Beta: Help us improve our tools by{' '}
        <A href="mailto:reporting@getpassiv.com">sharing feedback</A>
      </BetaBanner>
    </React.Fragment>
  );
};

export default Goals;
