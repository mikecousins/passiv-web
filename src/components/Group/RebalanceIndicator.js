import React from 'react';
import { Link } from 'react-router-dom';

export const RebalanceIndicator = ({ id }) => (
  <span>
    <Link to={`/app/group/${id}`}>Rebalance</Link>
  </span>
);

export default RebalanceIndicator;
