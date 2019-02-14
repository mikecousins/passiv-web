import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircle } from '@fortawesome/free-solid-svg-icons';

const SideBarLink = ({ name, linkPath, rebalance }) => {
  let selected = window.location.pathname.startsWith(linkPath);

  let colorClass = null;
  if (selected) {
    colorClass = "active"
  }

  return (
    <div className={colorClass}>
      <Link
        to={linkPath}
      >
        {rebalance && <FontAwesomeIcon icon={faCircle} style={{color: 'blue'}} />}
        {name}
        <FontAwesomeIcon icon={faAngleRight} />
      </Link>
    </div>
  )

}

const select = state => ({});

const actions = {};

export default connect(select, actions)(SideBarLink);
