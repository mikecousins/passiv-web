import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Group from '../components/Group';
import { selectIsAuthorized } from '../selectors';
import {
  selectDashboardGroups,
  selectGroupsLoading,
} from '../selectors/groups';
import DashboardReporting, {
  CustomizeDashBtn,
  CustomizeDashContainer,
} from '../components/Performance/Dashboard/DashboardReporting';
import HelpLinks from '../components/Dashboard/HelpLinks';
import QuestradeAuthorizationPicker from '../components/QuestradeAuthorizationPicker';
import SetupPrompt from '../components/SetupPrompt/SetupPrompt';
import ConnectQuestrade from '../components/ConnectQuestrade';
import InvestingCourse from '../components/InvestingCourse';
import {
  ContextualMessageMultiWrapper,
  Message,
} from '../components/ContextualMessageMultiWrapper';
import {
  selectHasQuestradeConnection,
  selectDisplayQuestradeConnectPrompt,
} from '../selectors';
import TotalHoldings from '../components/TotalHoldings';
import DashboardConfig from '../components/Performance/Dashboard/DashboardConfig';
import { DashboardGoalWidgets } from '../components/Goals/DashboardGoalWidgets';
import { selectShowInvestingCourse } from '../selectors/subscription';
import WelcomePage from './WelcomePage';

export const DashboardPage = () => {
  const authorized = useSelector(selectIsAuthorized);
  const groups = useSelector(selectDashboardGroups);
  const hasQuestradeConnection = useSelector(selectHasQuestradeConnection);
  const displayQuestradeConnectPrompt = useSelector(
    selectDisplayQuestradeConnectPrompt,
  );
  const showInvestingCourse = useSelector(selectShowInvestingCourse);
  const groupsLoading = useSelector(selectGroupsLoading);

  const [configMode, setConfigMode] = useState(false);

  if (authorized === undefined) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  } else if (authorized === false) {
    return <QuestradeAuthorizationPicker />;
  }

  let groupDisplay = <FontAwesomeIcon icon={faSpinner} spin />;

  let anySetupRemaining = false;
  let anyTargets = true;
  if (groups) {
    groupDisplay = (
      <React.Fragment>
        {groups.map((group) => (
          <Group group={group} key={group.id} />
        ))}
      </React.Fragment>
    );
    let groupsSetupStatus = groups.map((group) => group.setupComplete);
    const verifyAnyFalse = (currentValue: any) => currentValue === false;
    const verifyAnyTrue = (currentValue: any) => currentValue === true;

    anySetupRemaining = groupsSetupStatus.some(verifyAnyFalse);
    anyTargets = !groupsSetupStatus.some(verifyAnyTrue);
  }

  const messages: Message[] = [
    {
      name: 'connect_questrade',
      content: <ConnectQuestrade />,
      visible: displayQuestradeConnectPrompt,
    },
    {
      name: 'onboarding_dashboard',
      content: <WelcomePage />,
      visible: anySetupRemaining,
    },
    {
      name: 'investing_course',
      content: <InvestingCourse />,
      visible: showInvestingCourse,
    },
    {
      name: 'customize_dashboard',
      content: (
        <CustomizeDashContainer>
          <CustomizeDashBtn onClick={() => setConfigMode(!configMode)}>
            <FontAwesomeIcon icon={faCogs} /> Customize Dashboard
          </CustomizeDashBtn>
        </CustomizeDashContainer>
      ),
      visible: hasQuestradeConnection,
    },
  ];

  return (
    <React.Fragment>
      {!groupsLoading && <ContextualMessageMultiWrapper messages={messages} />}

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
