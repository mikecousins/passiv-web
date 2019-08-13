import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { RebalanceAlert } from '../../styled/Rebalance';
import { useSelector } from 'react-redux';
import { selectPathname } from '../../selectors/router';

type Props = {
  name: string;
  linkPath: string;
  rebalance?: boolean;
  hasAccounts?: boolean;
  loading?: boolean;
  setupComplete?: boolean;
  spinnerLoading?: boolean;
  hideArrow?: boolean;
}

const SideBarLink = ({
  name,
  linkPath,
  rebalance,
  hasAccounts,
  loading,
  setupComplete,
  spinnerLoading,
  hideArrow,
}: Props) => {
  const pathname = useSelector(selectPathname);

  if (spinnerLoading === undefined) {
    spinnerLoading = false;
  }
  if (hideArrow === undefined) {
    hideArrow = false;
  }
  let selected = pathname.startsWith(linkPath);

  let colorClass = undefined;
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
            <span style={{ background: 'orange' }} />
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

export default SideBarLink;
