import React from 'react';
import { connect } from 'react-redux';
import { selectGroupsRaw } from '../selectors';

class PortfolioGroupPicker extends React.Component {
  render() {
    const groups = this.props.groups.data;
    const { account } = this.props;

    return (
      <React.Fragment>
        <select>
          <option value="null">----------------------</option>
          {groups.map(group =>
            console.log(group.id === account.portfolio_group),
          )}
        </select>
      </React.Fragment>
    );
  }
}

const select = state => ({
  groups: selectGroupsRaw(state),
});

export default connect(select)(PortfolioGroupPicker);
