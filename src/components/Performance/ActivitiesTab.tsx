import React from 'react';
import { useSelector } from 'react-redux';
import { selectActivities } from '../../selectors/performance';
import { Activity } from '../../types/performance';
import ActivityDatePickers from './ActivityDatePickers';

export const ActivitiesTab = () => {
  const activities = useSelector(selectActivities).data;
  let activityRows: any = [];
  if (activities !== null) {
    activities.forEach((activity: Activity) => {
      activityRows.push(
        <div>
          {activity.type} {activity.description}
        </div>,
      );
    });
  }

  return (
    <React.Fragment>
      <ActivityDatePickers />
      {activityRows}
    </React.Fragment>
  );
};

export default ActivitiesTab;
