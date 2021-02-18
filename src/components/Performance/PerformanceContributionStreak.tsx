import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faFireAlt,
  faQuestionCircle,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
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
const ContributionPercent = styled.span`
  color: ${'#04a286'};
`;
const SubHeader = styled.span`
  font-size: 18px;
  text-align: center;
`;
const Br = styled.span`
  display: block;
  margin: -10px;
`;

const StreakDots = styled.span`
  vertical-align: middle;
  display: inline-block;
  font-size: 9px;
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
  let streakDots = [];

  let contributionStreakString = 'loading...';
  if (contributionStreak !== null && contributionStreak !== undefined) {
    if (contributionStreak > 1) {
      contributionStreakString = contributionStreak + ' Months ';
    } else if (contributionStreak > 0) {
      contributionStreakString = contributionStreak + ' Month ';
    } else {
      contributionStreakString = '0 Months ';
    }
    for (let i = 0; i < contributionStreak; i++) {
      streakDots.push(
        <FontAwesomeIcon
          icon={faCircle}
          color="#04a286"
          style={{ padding: 1 }}
          key={'dot' + i}
        />,
      );
    }
  }

  let contributionMonthsString = 'loading...';
  let contributionPercentString = '';
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
      ' Months ';
    contributionPercentString =
      '(' +
      ((100 * contributionMonthsContributed) / contributionMonthsTotal).toFixed(
        0,
      ) +
      '%)';
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
          <SubHeader>
            Contribution Streak{' '}
            <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 12 }} />
          </SubHeader>
        </Tooltip>
        <Br />
        <StreakDots>{streakDots}</StreakDots>
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
            <span>
              {contributionMonthsString}
              <ContributionPercent>
                {contributionPercentString}
              </ContributionPercent>
            </span>
          </Tooltip>
        </ContributionStreak>
      </div>
    </React.Fragment>
  );
};

export default PerformanceContributionStreak;
