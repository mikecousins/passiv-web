import React from 'react';

const Stock = (props) => (
  <div className="flex py-2">
    <div className="w-1/4 bg-white py-1">{props.name}</div>
    <div className="w-1/4 bg-white py-1 align-middle">$45,678</div>
    <div className="w-1/2 bg-white py-1 align-middle">
      <label>
        <span className="px-4">Stock Group: </span>
        <select className="px-2">
          <option>Canada</option>
          <option>USA</option>
          <option>New Group</option>
        </select>
      </label>
    </div>
  </div>
);

export default Stock;
