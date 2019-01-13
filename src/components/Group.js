  import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import ShadowBox from '../styled/ShadowBox';

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
      <div>{group.name}</div>
      <div>
        <div>
          Accuracy
        </div>
        {accuracy}
      </div>
      <div>
        <div>
          Cash
        </div>
        {cash}
      </div>
      <div>
        <div>
          Total Value
        </div>
        {totalValue}
      </div>
      <div>
        <Link to={`/app/group/${group.id}`}>View</Link>
      </div>
    </ShadowBox>
  );
}

Group.defaultProps = {
  group: PropTypes.object,
}

export default Group;
