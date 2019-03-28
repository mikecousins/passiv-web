import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faAngleRight, faChevronUp, faChevronDown, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import ShadowBox from '../../styled/ShadowBox';
import { Table, H2, H3 } from '../../styled/GlobalElements';
import { DashboardRow, ViewBtn, WarningViewBtn, AllocateBtn, Container } from '../../styled/Group';
import Number from '../Number';
import AccountTrades from '../AccountTrades';

export const Group = (props) => {
  const { group, trades } = props;
  if (!group) {
    return <div>Loading...</div>;
  }

  const [expanded, setExpanded] = useState(false);

  let accuracy = <FontAwesomeIcon icon={faSpinner} spin />;
  if (group.setupComplete !== undefined) {
    if (group.setupComplete === false) {
      accuracy = <FontAwesomeIcon icon={faExclamationTriangle} data-tip="No target set" />;
    }
    else {
      if (group.accuracy) {
          accuracy = <Number value={group.accuracy} percentage />;
      }
    }
  }

  let cash = <FontAwesomeIcon icon={faSpinner} spin />;
  if (group.totalCash) {
      cash = <Number value={group.totalCash} currency />;
  }

  let totalValue = <FontAwesomeIcon icon={faSpinner} spin />;
  if (group.totalValue) {
    totalValue = <Number value={group.totalValue} currency />
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
    viewButton = (<ViewBtn>
      <Link to={`/app/group/${group.id}`}>View<FontAwesomeIcon icon={faAngleRight} /></Link>
    </ViewBtn>);
  }
  else {
    viewButton = (<WarningViewBtn>
      <Link to={`/app/group/${group.id}`}>Setup<FontAwesomeIcon icon={faAngleRight} /></Link>
    </WarningViewBtn>);
  }

  return (
    <Container>
      <ShadowBox>
        <DashboardRow>
          <Table>
            <H2>{group.name}</H2>
            <div>
              <H3>
                Accuracy
              </H3>
              {accuracy}
            </div>
            <div>
              <H3>
                Cash
              </H3>
              {cash}
            </div>
            <div>
              <H3>
                Total Value
              </H3>
              {totalValue}
            </div>
            {viewButton}
            {group.setupComplete && group.rebalance && (
              <AllocateBtn onClick={() => setExpanded(!expanded)}>
                {sellsFound ? 'Rebalance' : 'Allocate'}
                &nbsp;
                {expanded ? (<FontAwesomeIcon icon={faChevronUp} />) : (<FontAwesomeIcon icon={faChevronDown} />)}
              </AllocateBtn>
            )}
          </Table>
        </DashboardRow>
      </ShadowBox>
      {expanded && <AccountTrades trades={group.trades} groupId={group.id} />}
      <ReactTooltip
        place="right"
        effect="solid"
      />
    </Container>
  );
}

Group.defaultProps = {
  group: PropTypes.object,
}

export default Group;
