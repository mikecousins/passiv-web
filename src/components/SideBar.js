import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { selectGroups, selectIsDemoMode } from '../selectors';
import { toggleDemoMode } from '../actions';
import SideBarLink from './SideBarLink';

import styled from '@emotion/styled';

const StyledAside = styled.aside`
  background-color: var(--brand-grey);
  color: #fff;
  padding-top: 30px;
`;

const SideBar = (props) => {
  let groups = <FontAwesomeIcon icon={faSpinner} spin />;
  if (props.groups) {
    groups = props.groups.map((group) => (
      <SideBarLink
        key={group.id}
        name={group.name}
        linkPath={`/app/group/${group.id}`}
      />
    ));
  }
  return (
    <StyledAside>
      <SideBarLink
        name="Dashboard"
        linkPath="/app/dashboard"
      />
      {groups}
      <SideBarLink
        name="Settings"
        linkPath="/app/settings"
      />

      {/*<button
        onClick={props.toggleDemo}
        className="block text-white no-underline text-lg tracking-wide pl-10 py-2 focus:outline-none"
      >
        Demo Mode&nbsp;
        {props.demoMode && <FontAwesomeIcon icon={faToggleOn} />}
        {!props.demoMode && <FontAwesomeIcon icon={faToggleOff} />}
      </button> */}
    </StyledAside>
  );
}

const select = state => ({
  groups: selectGroups(state),
  demoMode:  selectIsDemoMode(state),
});

const actions = { toggleDemo: toggleDemoMode };

export default connect(select, actions)(SideBar);
