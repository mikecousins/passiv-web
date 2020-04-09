import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { SubHeader } from './Performance';
import {
  selectContributionStreak,
  selectContributionMonthsContributed,
  selectContributionMonthsTotal,
} from '../../selectors/performance';
import Tooltip from '../Tooltip';

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
      contributionStreakString = contributionStreak + ' Months ';
    } else if (contributionStreak > 1) {
      contributionStreakString = contributionStreak + ' Month ';
    } else {
      contributionStreakString = '0 Months ';
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
        <Tooltip label="Stats on how often you've been contributing">
          <SubHeader>Contribution Streak</SubHeader>
        </Tooltip>

        <ContributionStreak>
          <Tooltip label="Number of months you've consecutively contributed to your accounts">
            <span>
              {contributionStreakString}
              {contributionStreak !== undefined && contributionStreak > 1 ? (
                <FontAwesomeIcon icon={faFireAlt} />
              ) : (
                <span></span>
              )}
            </span>
          </Tooltip>
          <br />
          <Tooltip label="Number of months you've made contributions in the selected timeframe">
            <span>{contributionMonthsString}</span>
          </Tooltip>
        </ContributionStreak>
      </div>
    </React.Fragment>
  );
};

export default PerformanceContributionStreak;
