import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { RebalanceAlert } from '../../styled/Rebalance';


const SideBarLink = ({ name, linkPath, rebalance }) => {
  let selected = window.location.pathname.startsWith(linkPath);

  let colorClass = null;
  if (selected) {
    colorClass = "active"
  }

  return (
    <div className={colorClass}>
      <Link
        to={linkPath}>
        <RebalanceAlert>{rebalance && <span style={{background: 'blue'}} />}</RebalanceAlert>
        {name}
        <FontAwesomeIcon icon={faAngleRight} />
      </Link>
    </div>
  )

}

const select = state => ({});

const actions = {};

export default connect(select, actions)(SideBarLink);
