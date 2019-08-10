import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Group from '../components/Group';
import { selectIsAuthorized, selectIsDemoMode } from '../selectors';
import { selectDashboardGroups } from '../selectors/groups';
import TotalHoldings from '../components/TotalHoldings';
import QuestradeAuthorizationPicker from '../components/QuestradeAuthorizationPicker';
import { AppState } from '../store';
import { DashboardGroup } from '../selectors/groups';

interface Props {
  authorized: boolean;
  groups: DashboardGroup[];
  demoMode: boolean;
}

export const DashboardPage = ({ authorized, groups, demoMode }: Props) => {
  if (authorized === undefined) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  } else if (authorized === false) {
    return <QuestradeAuthorizationPicker />;
  }
  let groupDisplay = <FontAwesomeIcon icon={faSpinner} spin />;
  if (groups) {
    groupDisplay = (
      <React.Fragment>
        {groups.map(group => (
          <Group group={group} key={group.id} demo={demoMode} />
        ))}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <TotalHoldings />
      {groupDisplay}
    </React.Fragment>
  );
};

const select = (state: AppState) => ({
  authorized: selectIsAuthorized(state),
  groups: selectDashboardGroups(state),
  demoMode: selectIsDemoMode(state),
});

export default connect(select)(DashboardPage);
