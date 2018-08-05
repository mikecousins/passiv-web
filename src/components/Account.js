import React from 'react';

const Account = (props) => (
  <div className="flex">
    <div className="w-1/6 bg-white h-12">{props.name}</div>
    <div className="w-1/6 bg-green-lighter h-12">Canada</div>
    <div className="w-1/6 bg-teal-lighter h-12">USA</div>
    <div className="w-1/6 bg-blue-lighter h-12">Europe/Asia</div>
    <div className="w-1/6 bg-indigo-lighter h-12">Emerging</div>
    <div className="w-1/6 bg-purple-lighter h-12">Bonds</div>
  </div>
);

export default Account;
