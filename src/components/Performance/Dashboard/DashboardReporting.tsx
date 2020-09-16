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
  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
`;

export const DashboardReporting = () => {
  const settings = useSelector(selectSettings);

  if (settings === null || settings === undefined) {
    return null;
  }
  // Still need to add setting for showing total holdings
  return (
    <React.Fragment>
      <Flex>
        {settings.show_contributions1Y && (
          <ShadowBox>
            <Contributions1Y />
            {settings.show_contribution_chart && <DashboardContributionChart />}
          </ShadowBox>
        )}
        {settings.show_total_value_chart && (
          <ShadowBox>
            {true && <TotalHoldings />}
            <DashboardTotalValueChart />
          </ShadowBox>
        )}
      </Flex>
    </React.Fragment>
  );
};

export default DashboardReporting;
