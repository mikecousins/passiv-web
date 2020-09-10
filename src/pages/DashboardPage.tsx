import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCogs } from '@fortawesome/free-solid-svg-icons';
import Group from '../components/Group';
import { selectIsAuthorized } from '../selectors';
import { selectDashboardGroups } from '../selectors/groups';
import TotalHoldings from '../components/TotalHoldings';
import DashboardReporting from '../components/Performance/Dashboard/DashboardReporting';
import QuestradeAuthorizationPicker from '../components/QuestradeAuthorizationPicker';
import WelcomeVideo from '../components/WelcomeVideo/WelcomeVideo';
import { ContextualMessageWrapper } from '../components/ContextualMessageWrapper';

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

  let anySetupRemaining = false;

  if (groups) {
    let groupsSetupStatus = groups.map(group => group.setupComplete);
    const verifyAnyFalse = (currentValue: any) => currentValue === false;

    anySetupRemaining = groupsSetupStatus.some(verifyAnyFalse);
  }

  return (
    <React.Fragment>
      {anySetupRemaining && (
        <ContextualMessageWrapper name={'setup_prompt'}>
          <WelcomeVideo />
        </ContextualMessageWrapper>
      )}
      <TotalHoldings />

      {groupDisplay}
    </React.Fragment>
  );
};

export default DashboardPage;
