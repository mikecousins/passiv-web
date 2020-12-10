import React, { useState } from 'react';
import styled from '@emotion/styled';
import DashboardTotalValueChart from './DashboardTotalValueChart';
import DashboardContributionChart from './DashboardContributionChart';
import TotalHoldings from '../../TotalHoldings';
import Contributions1Y from './Contributions1Y';
import { useSelector } from 'react-redux';
import { selectSettings } from '../../../selectors';
import ShadowBox from '../../../styled/ShadowBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { selectSelectedAccounts } from '../../../selectors/performance';
import { Link } from 'react-router-dom';
import { selectAccounts } from '../../../selectors/accounts';
import Tooltip from '@reach/tooltip';

export const Flex = styled.div`
  &.twoColumns {
    @media (min-width: 900px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
    }
  }
`;
export const LeftAlign = styled.span`
  text-align-last: left;
`;
export const CustomizeDashContainer = styled.div`
  margin-bottom: 12px;
  margin-bottom: 15px;
`;
export const CustomizeDashBtn = styled.span`
  text-decoration: none;
  color: #232225;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: #033ebc;
  }
`;
export const FilteredLabel = styled.span`
  cursor: pointer;
`;
export const AccountFilterNote = styled.span`
  margin-bottom: 5px; // Doesn't seem to be working
`;

export const DashboardReporting = () => {
  const settings = useSelector(selectSettings);
  const selectedAccounts: any[] = useSelector(selectSelectedAccounts);
  const accounts = useSelector(selectAccounts);
  let showAccountFilterLabel = false;
  const [
    showAccountFilterMoreDetails,
    setShowAccountFilterMoreDetails,
  ] = useState(false);
  let accountFilterString = '';

  if (
    selectedAccounts !== undefined &&
    selectedAccounts !== null &&
    selectedAccounts.length > 0 &&
    selectedAccounts.length !==
      accounts.filter((a) => a.institution_name === 'Questrade').length
  ) {
    showAccountFilterLabel = true;
    selectedAccounts.forEach((a) => (accountFilterString += a.label + ', '));
    accountFilterString = accountFilterString.slice(
      0,
      accountFilterString.length - 2,
    );
  }
  let columns = settings?.show_2columns_dashboard ? 'twoColumns' : 'oneColumn';
  if (
    !settings?.show_total_value_chart &&
    !settings?.show_contributions1Y &&
    !settings?.show_contribution_chart &&
    settings?.show_total_holdings
  ) {
    columns = 'oneColumn';
  }

  if (settings === null || settings === undefined) {
    return null;
  }

  return (
    <React.Fragment>
      {showAccountFilterLabel && (
        <Tooltip label="Click for more details">
          <FilteredLabel
            onClick={() =>
              setShowAccountFilterMoreDetails(!showAccountFilterMoreDetails)
            }
          >
            Filtered{' '}
            <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 12 }} />
          </FilteredLabel>
        </Tooltip>
      )}
      {showAccountFilterMoreDetails && (
        <AccountFilterNote>
          Certain data below may have been filtered to: {accountFilterString}.
          Change filter on <Link to="/app/reporting">reporting page</Link>
        </AccountFilterNote>
      )}
      <Flex className={columns}>
        {settings.show_contribution_chart && (
          <ShadowBox>
            {settings.show_contributions1Y && (
              <Contributions1Y smaller={true} />
            )}
            <DashboardContributionChart />
          </ShadowBox>
        )}
        {!settings.show_contribution_chart && settings.show_contributions1Y && (
          <LeftAlign>
            <Contributions1Y smaller={false} />
          </LeftAlign>
        )}
        {settings.show_total_value_chart && (
          <ShadowBox>
            {settings.show_total_holdings && <TotalHoldings smaller={true} />}
            <DashboardTotalValueChart />
          </ShadowBox>
        )}
        {!settings.show_total_value_chart && settings.show_total_holdings && (
          <TotalHoldings smaller={false} />
        )}
      </Flex>
    </React.Fragment>
  );
};

export default DashboardReporting;
