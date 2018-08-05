import React from 'react';
import PieChart from 'react-simple-pie-chart';
import { Link } from 'react-router-dom';

const AccountGroup = (props) => (
<div className="rounded overflow-hidden px-6 py-4 mb-4 bg-white">
  <div className="flex mb-4 h-6">
    <span className="font-bold text-lg mb-2 px-4">{props.name}</span>
    <span className="font-semi-bold text-lg px-4">$123,456</span>
    <span className="font-semi-bold text-lg text-grey px-4">97% accuracy</span>
    <Link to="/group" className="text-lg text-blue-light px-4">
      Edit
    </Link>
  </div>
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
