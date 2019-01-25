  import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import ShadowBox from '../styled/ShadowBox';
import { Table,H2,H3 } from '../styled/GlobalElements';

// h1
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
`;

const Group = (props) => {
  const { group } = props;
  if (!group) {
    return <div>Loading...</div>;
  }

  let accuracy = <FontAwesomeIcon icon={faSpinner} spin />;
  if (group.accuracy) {
      accuracy = new Intl.NumberFormat('en-CA', { style: 'percent', maximumFractionDigits: 1 }).format(group.accuracy / 100);
  }

  let cash = <FontAwesomeIcon icon={faSpinner} spin />;
  if (group.totalCash) {
      cash = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(group.totalCash);
  }

  let totalValue = <FontAwesomeIcon icon={faSpinner} spin />;
  if (group.totalValue) {
    totalValue = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(group.totalValue);
  }

  return (
    <ShadowBox>
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
          <Link to={`/app/group/${group.id}`}>View</Link>
        </ViewBtn>
      </Table>
    </ShadowBox>
  );
}

Group.defaultProps = {
  group: PropTypes.object,
}

export default Group;
