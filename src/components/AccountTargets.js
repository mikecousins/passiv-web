import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { importTarget } from '../actions';
import { selectCurrentGroupId, selectCurrentGroupTarget } from '../selectors';
import TargetBar from './TargetBar';

class AccountTargets extends React.Component {
  state = { edit: false }

  render() {
    const { target, groupId, startImportTarget } = this.props;
    const { edit } = this.state;
    let content = <span><FontAwesomeIcon icon={faSpinner} spin /></span>;
    if (target && target.length === 0) {
      content = <span>No target set<button onClick={() => startImportTarget(groupId)}>Import</button></span>
    } else if (target) {
      content = target.map(target => <TargetBar key={target.symbol} symbol={target.displaySymbol.symbol} percentage={target.percent} edit={edit} />);
    }
    return (
      <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
        <h3>Target Portfolio</h3>
        {content}
        {edit ? (
          <React.Fragment>
            <button onClick={() => this.setState({ edit: false })}>
              Save
            </button>
            <button onClick={() => this.setState({ edit: false })}>
              Cancel
            </button>
          </React.Fragment>
        ) : (
          <button onClick={() => this.setState({ edit: true })}>
            Edit
          </button>
        )}
      </div>
    );
  }
}

const actions = { startImportTarget: importTarget };

const select = state => ({
  groupId: selectCurrentGroupId(state),
  target: selectCurrentGroupTarget(state),
  symbols: select
});

export default connect(select, actions)(AccountTargets);
