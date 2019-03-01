import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faAngleRight, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { RebalanceAlert } from '../../styled/Rebalance';

const SideBarLink = ({ name, linkPath, rebalance, loading, setupComplete }) => {
  let selected = window.location.pathname.startsWith(linkPath);

  let colorClass = null;
  if (selected) {
    colorClass = "active"
  }

  let indicator = null;
  if (loading) {
    indicator = (<RebalanceAlert><FontAwesomeIcon icon={faSpinner} spin /></RebalanceAlert>);
  }
  else {
    if (setupComplete === undefined) {
        indicator = (<RebalanceAlert></RebalanceAlert>);
    }
    else {
      if (setupComplete) {
        indicator = (<RebalanceAlert>{rebalance && <span style={{background: 'blue'}} />}</RebalanceAlert>);
      }
      else {
        indicator = (<RebalanceAlert>{ <span style={{background: 'orange'}} /> }</RebalanceAlert>);
      }
    }

  }


  return (
    <div className={colorClass}>
      <Link
        to={linkPath}>
        { indicator }
        {name}
        <FontAwesomeIcon icon={faAngleRight} />

      </Link>
    </div>
  )

}

const select = state => ({});

const actions = {};

export default connect(select, actions)(SideBarLink);
