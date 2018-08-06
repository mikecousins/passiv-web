import React from 'react';
import PieChart from 'react-simple-pie-chart';
import { Link } from 'react-router-dom';

const StockGroup = (props) => (
  <div className="rounded overflow-hidden px-6 py-4 mb-4 bg-white shadow">
    <div className="flex mb-4 h-6">
      <span className="font-bold text-lg mb-2">{props.name}</span>
      <span className="font-semi-bold text-lg px-4">$123,456</span>
      <span className="font-semi-bold text-lg  px-4">Current Allocation 18%</span>
      <label className="font-semi-bold text-lg  px-4">Desired Allocation: </label>
      <div className="flex items-center border-b border-b-2 border-teal py-2">
        <input className="appearance-none bg-transparent border-none text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="" aria-label="Full name" value="20%" />
      </div>
    </div>
    <div>
      {props.children}
    </div>
  </div>
);

export default StockGroup;
