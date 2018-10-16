import React from 'react';

const AccountHoldings = (props) => (
  <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
    <h3>Current Portfolio</h3>
    {props.positions
      && props.positions
      && props.positions.map(position => (
        <div key={position.symbol.id} >
          <span title={position.symbol.description}>{position.symbol.symbol.symbol}</span> - {position.units} - {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(position.price * position.units)}
        </div>
      ))
    }
  </div>
);

export default AccountHoldings;
