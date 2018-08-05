import React from 'react';
import PieChart from 'react-simple-pie-chart';
import Account from './Account';

const AccountGroup = (props) => (
<div className="rounded overflow-hidden px-6 py-4 mb-4 bg-white">
  <div className="font-bold text-lg mb-2">{props.name}</div>
  <div className="flex">
    <div className="w-1/4 bg-white">
    <PieChart
      slices={props.slices}
    />
    </div>
    <div className="w-3/4 bg-white">
      {props.children}
    </div>
  </div>
</div>
);

export default AccountGroup;
