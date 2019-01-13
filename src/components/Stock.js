import React from 'react';

const Stock = (props) => (
  <div>
    <div>{props.name}</div>
    <div>$45,678</div>
    <div>
      <label>
        <span className="px-4">Stock Group: </span>
        <select className="px-2">
          <option>Canada</option>
          <option>USA</option>
          <option>Europe/Asia</option>
          <option>Emerging</option>
          <option>Bonds</option>
          <option>Exclude</option>
          <option>New Group</option>
        </select>
      </label>
    </div>
  </div>
);

export default Stock;
