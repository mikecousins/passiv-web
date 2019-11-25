import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { postData } from '../api';
import { loadGroup } from '../actions';
import { selectGroups } from '../selectors/groups';
import { toast } from 'react-toastify';

const ImportAccountsPage = () => {
  const groups = useSelector(selectGroups);
  const dispatch = useDispatch();

  // import all the new groups
  useEffect(() => {
    if (groups) {
      groups.forEach(group => {
        if (!group.setupComplete) {
          postData(`/api/v1/portfolioGroups/${group.id}/import/`, {})
            .then(() => {
              toast.success(`Imported target for group: ${group.name}`);
              dispatch(loadGroup({ ids: [group.id] }));
            })
            .catch(() => {
              toast.error('Failed to import target');
            });
        }
      });
    }
  }, [groups]);

  if (!groups?.find(group => !group.setupComplete)) {
    return (
      <div>
        <p>
          We are now importing your targets.{' '}
          <FontAwesomeIcon icon={faSpinner} spin />
        </p>
      </div>
    );
  }
  return (
    <div>
      <p>
        We have now imported all of your holdings to make your default targets.
      </p>
      <Link to="/summary">Next</Link>
    </div>
  );
};

export default ImportAccountsPage;
