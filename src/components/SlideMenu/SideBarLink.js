import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { RebalanceAlert } from '../../styled/Rebalance';
import { selectPathname } from '../../selectors/router';

const SideBarLink = ({
  name,
  linkPath,
  rebalance,
  hasAccounts,
  loading,
  setupComplete,
  pathname,
  spinnerLoading,
  hideArrow,
}) => {
  if (spinnerLoading === undefined) {
    spinnerLoading = false;
  }
  if (hideArrow === undefined) {
    hideArrow = false;
  }
  let selected = pathname.startsWith(linkPath);

  let colorClass = null;
  if (selected) {
    colorClass = 'active';
  }

  let indicator = null;
  if (loading && spinnerLoading) {
    indicator = (
      <RebalanceAlert>
        <FontAwesomeIcon icon={faSpinner} spin style={{ color: 'white' }} />
      </RebalanceAlert>
    );
  } else {
    if (setupComplete === undefined) {
      indicator = <RebalanceAlert />;
    } else {
      if (setupComplete && rebalance) {
        indicator = (
          <RebalanceAlert>
            <span style={{ background: 'blue' }} />
          </RebalanceAlert>
        );
      } else if (!setupComplete && hasAccounts) {
        indicator = (
          <RebalanceAlert>
            <span style={{ background: 'orange' }} />
          </RebalanceAlert>
        );
      } else if (!hasAccounts) {
        indicator = (
          <RebalanceAlert>
            <span style={{ background: 'red' }} />
          </RebalanceAlert>
        );
      }
    }
  }

  return (
    <div className={colorClass}>
      <Link to={linkPath}>
        {indicator}
        {name}
        {!hideArrow && <FontAwesomeIcon icon={faAngleRight} />}
      </Link>
    </div>
  );
};

const select = state => ({
  pathname: selectPathname(state),
});

export default connect(select)(SideBarLink);
