import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { SubHeader } from './Performance';
import {
  selectContributionStreak,
  selectContributionMonthsContributed,
  selectContributionMonthsTotal,
} from '../../selectors/performance';

export const PerformanceContributionStreak = () => {
  const contributionStreak: number | undefined = useSelector(
    selectContributionStreak,
  );
  const contributionMonthsContributed: number | undefined = useSelector(
    selectContributionMonthsContributed,
  );
  const contributionMonthsTotal: number | undefined = useSelector(
    selectContributionMonthsTotal,
  );

  let contributionStreakString = 'loading...';
  if (contributionStreak !== null && contributionStreak !== undefined) {
    if (contributionStreak > 1) {
      contributionStreakString = contributionStreak + ' Months!';
    } else if (contributionStreak > 1) {
      contributionStreakString = contributionStreak + ' Month';
    } else {
      contributionStreakString = '0 Months';
    }
  }

  let contributionMonthsString = 'loading...';
  if (
    contributionMonthsContributed !== null &&
    contributionMonthsContributed !== undefined &&
    contributionMonthsTotal !== null &&
    contributionMonthsTotal !== undefined
  ) {
    contributionMonthsString =
      'Contributed ' +
      contributionMonthsContributed +
      '/' +
      contributionMonthsTotal +
      ' Months';
  }

  if (contributionStreakString === 'loading...') {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} spin />
        <br />
      </div>
    );
  }

  return (
    <React.Fragment>
      <SubHeader>Streak</SubHeader>
      {contributionStreakString}
      <br />
      {contributionMonthsString}
    </React.Fragment>
  );
};

export default PerformanceContributionStreak;
