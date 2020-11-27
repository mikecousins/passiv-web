import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Group from '../components/Group';
import { selectIsAuthorized } from '../selectors';
import { selectDashboardGroups } from '../selectors/groups';
import DashboardReporting, {
  CustomizeDashBtn,
  CustomizeDashContainer,
} from '../components/Performance/Dashboard/DashboardReporting';
import HelpLinks from '../components/Dashboard/HelpLinks';
import QuestradeAuthorizationPicker from '../components/QuestradeAuthorizationPicker';
import WelcomeVideo from '../components/WelcomeVideo/WelcomeVideo';
import { ContextualMessageWrapper } from '../components/ContextualMessageWrapper';
import { selectHasQuestradeConnection } from '../selectors';
import TotalHoldings from '../components/TotalHoldings';
import DashboardConfig from '../components/Performance/Dashboard/DashboardConfig';
import { DashboardGoalWidgets } from '../components/Goals/DashboardGoalWidgets';

export const DashboardPage = () => {
  const authorized = useSelector(selectIsAuthorized);
  const groups = useSelector(selectDashboardGroups);
  const hasQuestradeConnection = useSelector(selectHasQuestradeConnection);
  const [configMode, setConfigMode] = useState(false);

  if (authorized === undefined) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  } else if (authorized === false) {
    return <QuestradeAuthorizationPicker />;
  }

  let groupDisplay = <FontAwesomeIcon icon={faSpinner} spin />;

  if (groups) {
    groupDisplay = (
      <React.Fragment>
        {groups.map((group) => (
          <Group group={group} key={group.id} />
        ))}
      </React.Fragment>
    );
  }

  let anySetupRemaining = false;
  let anyTargets = true;

  if (groups) {
    let groupsSetupStatus = groups.map((group) => group.setupComplete);
    const verifyAnyFalse = (currentValue: any) => currentValue === false;
    const verifyAnyTrue = (currentValue: any) => currentValue === true;

    anySetupRemaining = groupsSetupStatus.some(verifyAnyFalse);
    anyTargets = !groupsSetupStatus.some(verifyAnyTrue);
  }

  return (
    <React.Fragment>
      {anySetupRemaining && (
        <ContextualMessageWrapper name={'setup_prompt'}>
          <WelcomeVideo />
        </ContextualMessageWrapper>
      )}
      {hasQuestradeConnection && (
        <CustomizeDashContainer>
          <CustomizeDashBtn onClick={() => setConfigMode(!configMode)}>
            <FontAwesomeIcon icon={faCogs} /> Customize Dashboard
          </CustomizeDashBtn>
        </CustomizeDashContainer>
      )}
      {configMode && <DashboardConfig />}
      {hasQuestradeConnection && !anyTargets && <DashboardReporting />}
      {!hasQuestradeConnection && <TotalHoldings smaller={false} />}
      <DashboardGoalWidgets />

      {groupDisplay}

      <HelpLinks />
    </React.Fragment>
  );
};

export default DashboardPage;
