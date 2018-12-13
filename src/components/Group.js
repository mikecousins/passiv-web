  import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
    <div className="rounded overflow-hidden shadow-lg px-6 py-4 my-4 bg-white flex">
      <div className="w-1/3 bg-white py-1 align-middle text-2xl font-bold">{group.name}</div>
      <div className="w-1/6 bg-white py-1 align-middle">
        <div className="text-xl font-bold">
          Accuracy
        </div>
        {accuracy}
      </div>
      <div className="w-1/6 bg-white py-1 align-middle">
        <div className="text-xl font-bold">
          Cash
        </div>
        {cash}
      </div>
      <div className="w-1/6 bg-white py-1 align-middle">
        <div className="text-xl font-bold">
          Total Value
        </div>
        {totalValue}
      </div>
      <div className="w-1/6 bg-white py-1 align-middle">
        <Link to={`/app/group/${group.id}`}>View</Link>
      </div>
    </div>
  );
}

Group.defaultProps = {
  group: PropTypes.object,
}

export default Group;
