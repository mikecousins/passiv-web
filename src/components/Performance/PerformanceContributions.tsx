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
  selectContributionTimeframe,
  selectWithdrawalTimeframe,
} from '../../selectors/performance';
import { Contributions } from '../../types/performance';
import Tooltip from '../Tooltip';
import styled from '@emotion/styled';

const AverageContributions = styled.div`
  font-size: 17px;
  color: #504d4dd9;
`;

const LegendItem = styled.div`
  padding: 2px 0 2px 0;
`;
const SubLegendItem = styled.div`
  padding: 2px 0 2px 0;
`;

type Props = {
  selectedTimeframe: string;
};
const PerformanceContributions = (props: Props) => {
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
      <Tooltip
        label="Contributions made during selected timeframe"
        additionalComponent={<ContributionsAndWithdrawals />}
      >
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

const ContributionsAndWithdrawals = () => {
  const contributionsTimeline = useSelector(selectContributionTimeframe);
  const withdrawalsTimeline = useSelector(selectWithdrawalTimeframe);
  let totalContributions = 0;
  contributionsTimeline?.forEach((pastValue) => {
    totalContributions += pastValue.value;
  });
  let totalWithdrawals = 0;
  withdrawalsTimeline?.forEach((pastValue) => {
    totalWithdrawals += pastValue.value;
  });
  return (
    <React.Fragment>
      <LegendItem>
        <div>
          <svg height="16" width="20">
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="white"
              strokeWidth={'1'}
              fill="#04a286"
            />
          </svg>
          &nbsp;Contributions
        </div>
        <SubLegendItem>${toDollarString(totalContributions)}</SubLegendItem>
      </LegendItem>

      <LegendItem>
        <div>
          <svg height="16" width="20">
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="white"
              strokeWidth={'1'}
              fill="#003ba2"
            />
          </svg>
          &nbsp;Withdrawals
        </div>
        <SubLegendItem>${toDollarString(totalWithdrawals)}</SubLegendItem>
      </LegendItem>
    </React.Fragment>
  );
};
