import React from 'react';
import { connect } from 'react-redux';
import Group from '../components/Group';
import { selectFullGroups, selectIsDemoMode, selectTotalHoldings } from '../selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class DashboardPage extends React.Component {
  render() {
    let groups = <FontAwesomeIcon icon={faSpinner} spin />;
    if (this.props.groups) {
      groups = this.props.groups.map((group) => <Group group={group} key={group.id} balances={this.props.balances} positions={this.props.positions} demo={this.props.demoMode} />);
    }
    let displayTotal = <FontAwesomeIcon icon={faSpinner} spin />;
    if (this.props.demoMode) {
      displayTotal = <span>$-------.--</span>;
    } else if (this.props.totalHoldings) {
      displayTotal = <span>{new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(this.props.totalHoldings)}</span>;
    }
    return (
      <React.Fragment>
        <div className="mb-4 text-xl font-bold text-right">
          Total Holdings<br/>
          {displayTotal}
        </div>
        {groups}
      </React.Fragment>
    );
  }
}

const select = state => ({
  groups: selectFullGroups(state),
  totalHoldings: selectTotalHoldings(state),
  demoMode: selectIsDemoMode(state),
});

export default connect(select)(DashboardPage);
