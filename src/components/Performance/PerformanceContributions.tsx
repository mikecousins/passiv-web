import React from 'react';
import { CashReturn, SubHeader, toDollarString } from './Performance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faCaretUp,
  faCaretDown,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import {
  selectContributionMonthsTotal,
  selectContributions,
} from '../../selectors/performance';
import { Contributions } from '../../types/performance';
import Tooltip from '../Tooltip';
import styled from '@emotion/styled';

const AverageContributions = styled.div`
  font-size: 17px;
  color: #504d4dd9;
`;

type Props = {
  selectedTimeframe: string;
};
export const PerformanceContributions = (props: Props) => {
  const contributions: Contributions | undefined = useSelector(
    selectContributions,
  );

  let contributionMonthsTotal: number | undefined = useSelector(
    selectContributionMonthsTotal,
  );
  if (
    contributionMonthsTotal !== null &&
    contributionMonthsTotal !== undefined &&
    contributionMonthsTotal < 1
  ) {
    contributionMonthsTotal = 1;
  }
  let averageMonthlyContribution = 0;
  if (
    contributionMonthsTotal !== null &&
    contributionMonthsTotal !== undefined &&
    contributions !== null &&
    contributions !== undefined
  ) {
    averageMonthlyContribution =
      contributions?.contributions / contributionMonthsTotal;
  }
  const averageMonthlyContributionString = toDollarString(
    averageMonthlyContribution,
  );

  const positive =
    contributions === undefined || !(contributions.contributions < 0);

  let contributionsString = 'loading...';
  if (contributions !== null && contributions !== undefined) {
    contributionsString = toDollarString(contributions.contributions);
  }

  if (contributionsString === 'loading...') {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} spin />
        <br />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Tooltip label="Contributions made during selected timeframe">
        <div>
          <SubHeader>
            Net Contributions{' '}
            <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 12 }} />
          </SubHeader>

          <CashReturn className={positive ? 'positive' : 'negative'}>
            ${contributionsString}{' '}
            {positive ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </CashReturn>
          <AverageContributions>
            Monthly Average:{' '}
            <span style={{ color: '#04a286' }}>
              ${averageMonthlyContributionString}
            </span>
          </AverageContributions>
        </div>
      </Tooltip>
    </React.Fragment>
  );
};

export default PerformanceContributions;
