import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Group from '../components/Group';
import {
  selectDashboardGroups,
  selectAllGroupsLoading,
} from '../selectors/groups';
import { selectShowOnboardingApp } from '../selectors/app';
import Welcome from '../components/Welcome';
import DashboardReporting, {
  CustomizeDashBtn,
  CustomizeDashContainer,
} from '../components/Performance/Dashboard/DashboardReporting';
import HelpLinks from '../components/Dashboard/HelpLinks';
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
import DashboardGoalWidgets from '../components/Goals/DashboardGoalWidgets';
import { selectShowInvestingCourse } from '../selectors/subscription';
import ThreeReferTshirt from '../components/ThreeReferTshirt';

const DashboardPage = () => {
  const showOnboardingApp = useSelector(selectShowOnboardingApp);
  const groups = useSelector(selectDashboardGroups);
  const hasQuestradeConnection = useSelector(selectHasQuestradeConnection);
  const displayQuestradeConnectPrompt = useSelector(
    selectDisplayQuestradeConnectPrompt,
  );
  const showInvestingCourse = useSelector(selectShowInvestingCourse);
  const groupsLoading = useSelector(selectAllGroupsLoading);

  const [configMode, setConfigMode] = useState(false);

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
      name: 'setup_prompt',
      content: <SetupPrompt />,
      visible: anySetupRemaining,
    },
    {
      name: 'investing_course',
      content: <InvestingCourse />,
      visible: showInvestingCourse,
    },
    {
      name: '3refer_tShirt',
      content: <ThreeReferTshirt />,
      visible: true,
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

  if (showOnboardingApp) {
    return <Welcome />;
  }

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
