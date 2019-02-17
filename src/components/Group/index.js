import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faAngleRight, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import { Table,H2,H3 } from '../../styled/GlobalElements';
import Number from '../Number';
import AccountTrades from '../AccountTrades';

export const DashboardRow = styled.div`
  div{
    align-items: center;
    text-align: center;
  }
  h2 {
    min-width: 20%;
    font-size: 22px;
    letter-spacing: 0.01em;
  }
`;
export const ViewBtn = styled.div`
  background-color: #fff;
  margin: -20px 0;
  padding: 34px 40px 34px;
  padding-right: 20px;
  border-left: 1px solid #eee;
  display: block;
  a {
    font-size: 20px;
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: 2px;
    color: #033ebc;
    display: block;
    text-decoration: none;
  }
  svg {
    padding-left: 3px;
  }
`;

export const AllocateBtn= styled.div`
  button {
    position: absolute;
    top: 100%;
    margin-top: -20px;
    left: 0;
    font-size: 16px;
    padding: 8px 24px;
    border-radius: 4px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.37);
    background-color: #003ba2;
    color: #fff;
  }
`;

export const Group = (props) => {
  const { group, trades } = props;
  if (!group) {
    return <div>Loading...</div>;
  }

  const [expanded, setExpanded] = useState(false);

  let accuracy = <FontAwesomeIcon icon={faSpinner} spin />;
  if (group.accuracy) {
      accuracy = <Number value={group.accuracy} percentage />;
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

  return (
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
          <ViewBtn>
            <Link to={`/app/group/${group.id}`}>View<FontAwesomeIcon icon={faAngleRight} /></Link>
          </ViewBtn>
          {group.rebalance && (
            <AllocateBtn>
              <button onClick={() => setExpanded(!expanded)}>
                {sellsFound ? 'Rebalance' : 'Allocate'}
                &nbsp;
                {expanded ? (<FontAwesomeIcon icon={faChevronUp} />) : (<FontAwesomeIcon icon={faChevronDown} />)}
              </button>
            </AllocateBtn>
          )}
        </Table>
      </DashboardRow>
      {expanded && <AccountTrades trades={group.trades} />}
    </ShadowBox>
  );
}

Group.defaultProps = {
  group: PropTypes.object,
}

export default Group;
