import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { selectGroups, selectIsDemoMode } from '../selectors';
import { toggleDemoMode } from '../actions';

const SideBar = (props) => {
  let groups = <FontAwesomeIcon icon={faSpinner} spin />;
  if (props.groups) {
    groups = props.groups.map((group) => (
      <Link
        to={`/app/group/${group.id}`}
        className="block text-white no-underline text-lg tracking-wide pl-10 py-2"
        key={group.id}
      >
        {group.name}
      </Link>
    ));
  }
  return (
    <div>
      <Link to="/app/dashboard" className="block text-white no-underline text-lg tracking-wide pl-10 py-2">Dashboard</Link>
      {groups}
      <Link to="/app/settings" className="block text-white no-underline text-lg tracking-wide pl-10 py-2">Settings</Link>
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
