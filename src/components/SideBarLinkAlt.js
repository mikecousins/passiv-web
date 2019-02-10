import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const SideBarLinkAlt = (props) => {
  let selected = window.location.pathname.startsWith(props.linkPath);

  let colorClass = null;
  if (selected) {
    colorClass = "active"
  }

  return (
    <div className={colorClass}>
      <Link
        to={props.linkPath}
      >
        {props.name}
      </Link>
    </div>
  )

}

const select = state => ({});

const actions = {};

export default connect(select, actions)(SideBarLinkAlt);
