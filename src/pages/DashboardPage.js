import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Group from '../components/Group';
import {
  selectIsAuthorized,
  selectDashboardGroups,
  selectIsDemoMode,
} from '../selectors';
import TotalHoldings from '../components/TotalHoldings';
import QuestradeAuthorizationPicker from '../components/QuestradeAuthorizationPicker';
import Tooltip from '../components/Tooltip';

export const DashboardPage = ({ authorized, groups, demoMode }) => {
  if (authorized === undefined) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  } else if (authorized === false) {
    return <QuestradeAuthorizationPicker />;
  }
  let groupDisplay = <FontAwesomeIcon icon={faSpinner} spin />;
  if (groups) {
    groupDisplay = groups.map(group => (
      <Group group={group} key={group.id} demo={demoMode} />
    ));
  }

  return (
    <React.Fragment>
      <TotalHoldings />
      {groupDisplay}
      <Tooltip />
    </React.Fragment>
  );
};

const select = state => ({
  authorized: selectIsAuthorized(state),
  groups: selectDashboardGroups(state),
  demoMode: selectIsDemoMode(state),
});

export default connect(select)(DashboardPage);
