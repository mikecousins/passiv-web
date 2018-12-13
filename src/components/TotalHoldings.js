import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { selectTotalGroupHoldings, selectIsDemoMode } from '../selectors';

const TotalHoldings = (props) => {
  const { demoMode, totalHoldings } = props;
  let displayTotal = <FontAwesomeIcon icon={faSpinner} spin />;
  if (demoMode) {
    displayTotal = <span>$-------.--</span>;
  } else if (totalHoldings) {
    displayTotal = <span>{new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(totalHoldings)}</span>;
  }
  return (
    <div className="mb-4 text-xl font-bold text-right">
      Total Holdings<br/>
      {displayTotal}
    </div>
  );
}

const select = state => ({
  totalHoldings: selectTotalGroupHoldings(state),
  demoMode: selectIsDemoMode(state),
});

export default connect(select)(TotalHoldings);
