import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { postData } from '../api';
import { loadGroup } from '../actions';
import { selectGroups } from '../selectors/groups';
import OnboardingProgress from '../components/OnboardingProgress';
import { GroupData } from '../types/group';

const ImportAccountsPage = () => {
  const groups = useSelector(selectGroups);
  const dispatch = useDispatch();
  const [groupsToImport, setGroupsToImport] = useState();

  // import all the new groups
  useEffect(() => {
    if (groups && !groupsToImport) {
      const newGroups: GroupData[] = [];
      groups.forEach(group => {
        if (!group.setupComplete) {
          newGroups.push(group);
        }
      });
      newGroups.forEach(group => {
        postData(`/api/v1/portfolioGroups/${group.id}/import/`, {})
          .then(() => {
            toast.success(`Imported target for group: ${group.name}`);
            dispatch(loadGroup({ ids: [group.id] }));
          })
          .catch(() => {
            toast.error('Failed to import target');
          });
      });
      setGroupsToImport(newGroups);
    }
  }, [dispatch, groups, groupsToImport]);

  if (!groups || !groups.find(group => !group.setupComplete)) {
    return (
      <div>
        <p>
          We are now importing your targets.{' '}
          <FontAwesomeIcon icon={faSpinner} spin />
        </p>
        <OnboardingProgress step={4} />
      </div>
    );
  }
  return (
    <div>
      <p>
        We have now imported all of your holdings to make your default targets.
      </p>
      <Link to="/app/summary">Next</Link>
    </div>
  );
};

export default ImportAccountsPage;
