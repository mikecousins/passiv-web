import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { selectGroups, selectIsDemoMode } from '../selectors';
import { toggleDemoMode } from '../actions';

const SideBar = (props) => {
  let groups = <FontAwesomeIcon icon={faSpinner} spin />;
  if (props.groups && props.groups.data && props.groups.data.length > 0) {
    groups = props.groups.data.map((group) => (
      <Link
        to={`/group/${group.id}`}
        className="block text-white no-underline text-lg tracking-wide pl-10 py-2"
        key={group.name}
      >
        {group.name}
      </Link>
    ));
  }
  return (
    <div>
      <Link to="/dashboard" className="block text-white no-underline text-lg tracking-wide pl-10 py-2">Dashboard</Link>
      {groups}
      <Link to="/settings" className="block text-white no-underline text-lg tracking-wide pl-10 py-2">Settings</Link>
      <button
        onClick={props.toggleDemo}
        className="block text-white no-underline text-lg tracking-wide pl-10 py-2 focus:outline-none"
      >
        Demo Mode&nbsp;
        {props.demoMode && <FontAwesomeIcon icon={faToggleOn} />}
        {!props.demoMode && <FontAwesomeIcon icon={faToggleOff} />}
      </button>
    </div>
  );
}

const select = state => ({
  groups: selectGroups(state),
  demoMode:  selectIsDemoMode(state),
});

const actions = { toggleDemo: toggleDemoMode };

export default connect(select, actions)(SideBar);
