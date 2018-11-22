import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Group from '../components/Group';
import { selectDashboardGroups, selectIsDemoMode } from '../selectors';
import TotalHoldings from '../components/TotalHoldings';


class DashboardPage extends React.Component {
  render() {
    let groups = <FontAwesomeIcon icon={faSpinner} spin />;
    if (this.props.groups) {
      groups = this.props.groups.map((group) => <Group group={group} key={group.id} demo={this.props.demoMode} />);
    }

    return (
      <React.Fragment>
        <TotalHoldings />
        {groups}
      </React.Fragment>
    );
  }
}

const select = state => ({
  groups: selectDashboardGroups(state),
  demoMode: selectIsDemoMode(state),
});

export default connect(select)(DashboardPage);
