import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AccountHoldings = (props) => (
  <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
    <h3>Current Portfolio</h3>
    <br />
    <table className="w-full text-left">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Units</th>
          <th>Price</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {!props.positions && <tr><td colSpan="4" className="text-center py-4"><FontAwesomeIcon icon={faSpinner} spin /></td></tr>}
        {props.positions
          && props.positions.map(position => (
            <tr key={position.symbol.id}>
              <td className="p-2 border-t border-grey-lighter">
                <span title={position.symbol.description}>{position.symbol.symbol.symbol}</span>
              </td>
              <td className="p-2 border-t border-grey-lighter">
                {position.units}
              </td>
              <td className="p-2 border-t border-grey-lighter">
                {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(position.price)}
              </td>
              <td className="p-2 border-t border-grey-lighter">
                {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(position.price * position.units)}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default AccountHoldings;
