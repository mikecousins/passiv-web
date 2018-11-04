import React from 'react';
import { connect } from 'react-redux';
import Group from '../components/Group';
import { selectFullGroups, selectIsDemoMode } from '../selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class DashboardPage extends React.Component {
  render() {
    let groups = <FontAwesomeIcon icon={faSpinner} spin />;
    let total = 0;
    if (this.props.groups) {
      groups = this.props.groups.map((group) => <Group group={group} key={group.id} balances={this.props.balances} positions={this.props.positions} demo={this.props.demoMode} />);
      /*
      if (this.props.balances.data && this.props.balances.data.length > 0) {
        this.props.balances.data.forEach(balance => total += parseFloat(balance.cash));
      }
      if (this.props.positions.data && this.props.positions.data.length > 0) {
        this.props.positions.data.forEach(position => total += position.units * parseFloat(position.price));
      }*/
    }
    let displayTotal = <span>{new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(total)}</span>;
    if (this.props.demoMode) {
      displayTotal = <span>$-------.--</span>;
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
  demoMode: selectIsDemoMode(state),
});

export default connect(select)(DashboardPage);
