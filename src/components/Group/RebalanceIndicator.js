import React from 'react';
import { Link } from 'react-router-dom';

export const RebalanceIndicator = ({ id }) => (
  <div>
    <Link to={`/app/group/${id}`}>Rebalance</Link>
  </div>
);

export default RebalanceIndicator;
