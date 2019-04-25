import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faAngleRight,
  faChevronUp,
  faChevronDown,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
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
import AccountTrades from '../AccountTrades';

export const Group = props => {
  const { group, trades } = props;
  const [expanded, setExpanded] = useState(false);
  if (!group) {
    return <div>Loading...</div>;
  }

  let accuracy = <FontAwesomeIcon icon={faSpinner} spin />;
  if (group.setupComplete !== undefined) {
    if (group.setupComplete === false) {
      accuracy = (
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          data-tip="There is no target set for this portfolio, click Setup to continue."
        />
      );
    } else {
      if (group.accuracy) {
        accuracy = (
          <Number value={group.accuracy} percentage decimalPlaces={0} />
        );
      }
    }
  }

  let cash = <FontAwesomeIcon icon={faSpinner} spin />;

  if (group.totalCash !== null && group.setupComplete !== undefined) {
    cash = <Number value={group.totalCash} currency />;
  }

  let totalValue = <FontAwesomeIcon icon={faSpinner} spin />;

  if (group.totalValue !== null && group.setupComplete !== undefined) {
    totalValue = <Number value={group.totalValue} currency />;
  }

  let sellsFound = false;
  if (trades) {
    trades.trades.forEach(trade => {
      if (trade.action === 'SELL') {
        sellsFound = true;
      }
    });
  }

  let viewButton = null;
  if (group.setupComplete === undefined || group.setupComplete === true) {
    viewButton = (
      <ViewBtn>
        <Link to={`/app/group/${group.id}`}>
          View
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </ViewBtn>
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
            {group.setupComplete && group.rebalance && (
              <AllocateBtn onClick={() => setExpanded(!expanded)}>
                {sellsFound ? 'Rebalance' : 'Allocate'}
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
      {expanded && <AccountTrades trades={group.trades} groupId={group.id} />}
    </Container>
  );
};

Group.defaultProps = {
  group: PropTypes.object,
};

export default Group;
