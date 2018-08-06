import React from 'react';

const Account = (props) => {
  if (props.edit) {
    return (
      <div className="flex py-2">
        <div className="w-1/4 bg-white py-1 align-middle">{props.name}</div>
        <div className="w-3/4 bg-white py-1 align-middle">
          <label>
            <span className="px-4">Account Group:</span>
            <select className="px-2">
              <option>Retirement</option>
              <option>RESP</option>
              <option>New Group</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
  return (
    <div className="flex py-2">
      <div className="w-1/6 bg-white py-1 align-middle">{props.name}</div>
      <div className="w-1/6 bg-green-dark py-1 text-center align-middle">Canada</div>
      <div className="w-1/6 bg-green py-1 text-center align-middle">USA</div>
      <div className="w-1/6 bg-green-light py-1 text-center align-middle">Europe/Asia</div>
      <div className="w-1/6 bg-green-lighter py-1 text-center align-middle">Emerging</div>
      <div className="w-1/6 bg-green-lightest py-1 text-center align-middle">Bonds</div>
    </div>
  );
}

export default Account;
