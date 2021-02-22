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
import ConnectQuestrade from '../components/ConnectQuestrade';
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

export const DashboardPage = () => {
  const authorized = useSelector(selectIsAuthorized);
  const groups = useSelector(selectDashboardGroups);
  const hasQuestradeConnection = useSelector(selectHasQuestradeConnection);
  const displayQuestradeConnectPrompt = useSelector(
    selectDisplayQuestradeConnectPrompt,
  );

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

  let anyTargets = true;

  if (groups) {
    let groupsSetupStatus = groups.map((group) => group.setupComplete);
    const verifyAnyTrue = (currentValue: any) => currentValue === true;

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
      content: <WelcomeVideo />,
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

  return (
    <React.Fragment>
      <ContextualMessageMultiWrapper messages={messages} />

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
