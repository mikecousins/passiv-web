import React from 'react';
import { connect } from 'react-redux';
import { selectGroups } from '../selectors';

const PortfolioGroupPicker = ({ groups, account }) => (
  <React.Fragment>
    <select>
      {groups.map(group => (
        <option value={group.id} key={group.id}>
          {group.name}
        </option>
      ))}
    </select>
  </React.Fragment>
);

const select = state => ({
  groups: selectGroups(state),
});

export default connect(select)(PortfolioGroupPicker);
