import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { importTarget } from '../actions';
import { selectCurrentGroupId, selectCurrentTarget } from '../selectors';

const AccountTargets = (props) => {
  const { target, groupId, startImportTarget } = props;
  let content = <span><FontAwesomeIcon icon={faSpinner} spin /></span>;
  if (target && target.length === 0) {
    content = <span>No target set<button onClick={() => startImportTarget(groupId)}>Import</button></span>
  } else if (target) {
    content = target.map(target => <div key={target.id}>{target.displaySymbol.symbol} - {target.percent}%</div>);
  }
  return (
    <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
      <h3>Target Portfolio</h3>
      {content}
    </div>
  );
}

const actions = { startImportTarget: importTarget };

const select = state => ({
  groupId: selectCurrentGroupId(state),
  target: selectCurrentTarget(state),
  symbols: select
});

export default connect(select, actions)(AccountTargets);
