import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AccountHoldings = (props) => (
  <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
    <h3>Current Portfolio</h3>
    <br />
    {!props.positions && <FontAwesomeIcon icon={faSpinner} spin />}
    {props.positions
      && props.positions.map(position => (
        <div key={position.symbol.id} >
          <span title={position.symbol.description}>{position.symbol.symbol.symbol}</span> - {position.units} - {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(position.price * position.units)}
        </div>
      ))
    }
  </div>
);

export default AccountHoldings;
