import React from 'react';

type Props = {
  onClick: () => void;
};

const RebalanceIndicator = ({ onClick }: Props) => (
  <button onClick={onClick}>Rebalance</button>
);

export default RebalanceIndicator;
