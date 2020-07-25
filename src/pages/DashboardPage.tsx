import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Group from '../components/Group';
import { selectIsAuthorized } from '../selectors';
import { selectDashboardGroups } from '../selectors/groups';
import TotalHoldings from '../components/TotalHoldings';
import DashboardReporting from '../components/Performance/Dashboard/DashboardReporting';
import QuestradeAuthorizationPicker from '../components/QuestradeAuthorizationPicker';

export const DashboardPage = () => {
  const authorized = useSelector(selectIsAuthorized);
  const groups = useSelector(selectDashboardGroups);

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
          <Group group={group} key={group.id} />
        ))}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <TotalHoldings />
      <DashboardReporting />
      {groupDisplay}
    </React.Fragment>
  );
};

export default DashboardPage;
