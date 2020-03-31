import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { SubHeader } from './Performance';
import {
  selectContributionStreak,
  selectContributionMonthsContributed,
  selectContributionMonthsTotal,
} from '../../selectors/performance';

const ContributionStreak = styled.div`
  font-size: 17px;
  color: #504d4dd9;
`;

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
      <div>
        <SubHeader>Streak</SubHeader>
        <ContributionStreak>
          {contributionStreakString}
          <br />
          {contributionMonthsString}
        </ContributionStreak>
      </div>
    </React.Fragment>
  );
};

export default PerformanceContributionStreak;
