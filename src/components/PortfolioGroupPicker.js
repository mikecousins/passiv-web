import React from 'react';
import { connect } from 'react-redux';
import { selectGroups } from '../selectors/groups';

const PortfolioGroupPicker = ({ groups, group, onChange, disabled }) => (
  <React.Fragment>
    <select disabled={disabled} value={group} onChange={onChange}>
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
