import React from 'react';

const AccountTargets = (props) => (
  <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
    <h3>Target Portfolio</h3>
    {!props.target && <span>No target set!</span>}
    {props.target && (
      <span>Put the sliders here</span>
    )}
  </div>
);

export default AccountTargets;
