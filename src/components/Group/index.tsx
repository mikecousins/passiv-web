import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faAngleRight,
  faChevronUp,
  faChevronDown,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../Tooltip';
import ShadowBox from '../../styled/ShadowBox';
import { Table, H2, H3 } from '../../styled/GlobalElements';
import {
  DashboardRow,
  ViewBtn,
  WarningViewBtn,
  AllocateBtn,
  Container,
} from '../../styled/Group';
import Number from '../Number';
import PortfolioGroupTrades from '../PortfolioGroupTrades';
import { GROUP_PATH } from '../../apps/Paths';
import PreLoadLink from '../PreLoadLink';
import { selectGroupInfo } from '../../selectors/groups';
import { useSelector } from 'react-redux';

type Props = {
  group: any;
};

export const Group = ({ group }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const groupInfo = useSelector(selectGroupInfo);

  let hideTrades = false;
  const currentGroupSettings = groupInfo[group.id].data!.settings;
  if (currentGroupSettings && currentGroupSettings.hide_trades_until !== null) {
    hideTrades =
      Date.parse(currentGroupSettings.hide_trades_until) > Date.now();
  }

  if (!group) {
    return <div>Loading...</div>;
  }

  let accuracy = <FontAwesomeIcon icon={faSpinner} spin />;
  if (group.setupComplete !== undefined) {
    if (group.setupComplete === false) {
      accuracy = (
        <Tooltip label="There is no target set for this portfolio, click Setup to continue.">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </Tooltip>
      );
    } else {
      if (group.accuracy || group.accuracy === 0) {
        accuracy = (
          <Number value={group.accuracy} percentage decimalPlaces={0} />
        );
      }
    }
  }

  let cash = <FontAwesomeIcon icon={faSpinner} spin />;

  if (group.totalCash !== null && group.setupComplete !== undefined) {
    cash = (
      <Number
        value={group.totalCash}
        currency={group.preferredCurrency && group.preferredCurrency.code}
      />
    );
  }

  let totalValue = <FontAwesomeIcon icon={faSpinner} spin />;

  if (group.totalValue !== null && group.setupComplete !== undefined) {
    totalValue = (
      <Number
        value={group.totalValue}
        currency={group.preferredCurrency && group.preferredCurrency.code}
      />
    );
  }

  let viewButton = null;
  if (group.setupComplete === undefined || group.setupComplete === true) {
    viewButton = (
      <ViewBtn>
        <PreLoadLink path={`${GROUP_PATH}/${group.id}`}>
          View
          <FontAwesomeIcon icon={faAngleRight} />
        </PreLoadLink>
      </ViewBtn>
    );
  } else if (!group.hasAccounts) {
    viewButton = (
      <WarningViewBtn>
        <Link to={`/app/group/${group.id}`}>
          Empty Group
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </WarningViewBtn>
    );
  } else {
    viewButton = (
      <WarningViewBtn>
        <Link to={`/app/group/${group.id}`}>
          Setup
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </WarningViewBtn>
    );
  }

  return (
    <Container>
      <ShadowBox>
        <DashboardRow>
          <Table>
            <H2>{group.name}</H2>
            <div>
              <H3>Accuracy</H3>
              {accuracy}
            </div>
            <div>
              <H3>Cash</H3>
              {cash}
            </div>
            <div>
              <H3>Total Value</H3>
              {totalValue}
            </div>
            {viewButton}
            {group.setupComplete && group.rebalance && !hideTrades && (
              <AllocateBtn onClick={() => setExpanded(!expanded)}>
                {group.hasSells ? 'Rebalance' : 'Allocate'}
                &nbsp;
                {expanded ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </AllocateBtn>
            )}
          </Table>
        </DashboardRow>
      </ShadowBox>
      {expanded && !hideTrades && (
        <PortfolioGroupTrades
          trades={group.trades}
          groupId={group.id}
          onClose={() => setExpanded(false)}
          error={null}
        />
      )}
    </Container>
  );
};

export default Group;
