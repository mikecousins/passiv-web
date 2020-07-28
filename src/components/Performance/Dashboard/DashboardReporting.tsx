import React from 'react';
import DashboardTotalValueChart from './DashboardTotalValueChart';
import DashboardContributionChart from './DashboardContributionChart';
import Contributions1Y from './Contributions1Y';
import { useSelector } from 'react-redux';
import { selectSettings } from '../../../selectors';

export const DashboardReporting = () => {
  const settings = useSelector(selectSettings);

  if (settings === null || settings === undefined) {
    return null;
  }

  return (
    <React.Fragment>
      {settings.show_contributions1Y && <Contributions1Y />}
      {settings.show_total_value_chart && <DashboardTotalValueChart />}
      {settings.show_contribution_chart && <DashboardContributionChart />}
    </React.Fragment>
  );
};

export default DashboardReporting;
