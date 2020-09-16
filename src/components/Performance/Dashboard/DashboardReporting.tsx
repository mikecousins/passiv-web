import React from 'react';
import styled from '@emotion/styled';
import DashboardTotalValueChart from './DashboardTotalValueChart';
import DashboardContributionChart from './DashboardContributionChart';
import TotalHoldings from '../../TotalHoldings';
import Contributions1Y from './Contributions1Y';
import { useSelector } from 'react-redux';
import { selectSettings } from '../../../selectors';
import ShadowBox from '../../../styled/ShadowBox';

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

export const DashboardReporting = () => {
  const settings = useSelector(selectSettings);

  if (settings === null || settings === undefined) {
    return null;
  }
  // Still need to add setting for showing total holdings
  return (
    <React.Fragment>
      <Flex
        className={
          settings.show_2columns_dashboard ? 'twoColumns' : 'oneColumn'
        }
      >
        {settings.show_contribution_chart && (
          <ShadowBox>
            {settings.show_contributions1Y && <Contributions1Y />}
            <DashboardContributionChart />
          </ShadowBox>
        )}
        {!settings.show_contribution_chart && settings.show_contributions1Y && (
          <LeftAlign>
            <Contributions1Y />
          </LeftAlign>
        )}
        {settings.show_total_value_chart && (
          <ShadowBox>
            {settings.show_total_holdings && <TotalHoldings />}
            <DashboardTotalValueChart />
          </ShadowBox>
        )}
        {!settings.show_total_value_chart && settings.show_total_holdings && (
          <TotalHoldings />
        )}
      </Flex>
    </React.Fragment>
  );
};

export default DashboardReporting;
