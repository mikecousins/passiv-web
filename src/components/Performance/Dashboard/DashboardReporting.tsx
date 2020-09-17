import React, { useState } from 'react';
import styled from '@emotion/styled';
import DashboardTotalValueChart from './DashboardTotalValueChart';
import DashboardContributionChart from './DashboardContributionChart';
import TotalHoldings from '../../TotalHoldings';
import Contributions1Y from './Contributions1Y';
import DashboardConfig from './DashboardConfig';
import { useSelector } from 'react-redux';
import { selectSettings } from '../../../selectors';
import ShadowBox from '../../../styled/ShadowBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

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
export const CustomizeDashBtn = styled.div`
  margin-bottom: 12px;
  text-decoration: none;
  color: #232225;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: #033ebc;
  }
`;

export const DashboardReporting = () => {
  const settings = useSelector(selectSettings);
  const [configMode, setConfigMode] = useState(false);
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
  // Still need to add setting for showing total holdings
  return (
    <React.Fragment>
      <CustomizeDashBtn onClick={() => setConfigMode(!configMode)}>
        <FontAwesomeIcon icon={faCogs} /> Customize Dashboard
      </CustomizeDashBtn>
      {configMode && <DashboardConfig />}
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
