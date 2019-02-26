import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { RebalanceAlert } from '../../styled/Rebalance';

const SideBarLink = ({ name, linkPath, rebalance, loading }) => {
  let selected = window.location.pathname.startsWith(linkPath);

  let colorClass = null;
  if (selected) {
    colorClass = "active"
  }

  return (
    <div className={colorClass}>
      <Link
        to={linkPath}>
        {
          loading ? (
            <React.Fragment>
              <RebalanceAlert><FontAwesomeIcon icon={faSpinner} spin /></RebalanceAlert>

            </React.Fragment>
          ) : (
            <React.Fragment>
              <RebalanceAlert>{rebalance && <span style={{background: 'blue'}} />}</RebalanceAlert>
            </React.Fragment>
          )
        }
        {name}
        <FontAwesomeIcon icon={faAngleRight} />

      </Link>
    </div>
  )

}

const select = state => ({});

const actions = {};

export default connect(select, actions)(SideBarLink);
