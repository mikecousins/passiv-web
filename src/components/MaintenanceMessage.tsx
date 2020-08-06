import React from 'react';
import '@reach/tooltip/styles.css';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectMaintenanceBrokerages } from '../selectors';
import styled from '@emotion/styled';

import { H2, P } from '../styled/GlobalElements';
import { ErrorContainer } from '../styled/Group';

const ReconnectContainer = styled.div`
  font-size: 18px;
`;

const ReconnectPanel = styled.div`
  display: inline-block;
  padding: 10px 20px 10px 0;

  &:last-of-type {
    padding-right: 0;
  }
`;

const Title = styled.span`
  font-weight: 600;
`;

const MaintenanceMessage = () => {
  const loggedIn = useSelector(selectLoggedIn);
  const maintenanceBrokerages = useSelector(selectMaintenanceBrokerages);

  if (loggedIn) {
    if (maintenanceBrokerages !== null && maintenanceBrokerages.length > 0) {
      return (
        <ErrorContainer>
          <H2>Brokerage Maintenance</H2>
          <P>
            The following brokerages are currently undergoing maintenance.
            Account information linked to these brokerages may be incomplete or
            unavailable until the maintenance is finished.
          </P>
          <P>
            This may also prevent you from creating new brokerage connections.
          </P>
          {maintenanceBrokerages.map((brokerage: any) => {
            return (
              <ReconnectContainer key={brokerage.id}>
                <ReconnectPanel></ReconnectPanel>
                <ReconnectPanel>
                  <span>
                    <Title>Brokerage:</Title>&nbsp;
                    {brokerage.name}
                  </span>
                </ReconnectPanel>
              </ReconnectContainer>
            );
          })}
        </ErrorContainer>
      );
    }
  }
  return null;
};

export default MaintenanceMessage;
