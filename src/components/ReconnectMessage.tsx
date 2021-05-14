import React from 'react';
import '@reach/tooltip/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from './Tooltip';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectDisabledAuthorizations } from '../selectors';
import { selectAccounts } from '../selectors/accounts';
import { selectPathname } from '../selectors/router';
import styled from '@emotion/styled';
import ConnectionUpdate from './ConnectionUpdate';

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

const ReconnectMessage = () => {
  const loggedIn = useSelector(selectLoggedIn);
  const disabledAuthorizations = useSelector(selectDisabledAuthorizations);
  const accounts = useSelector(selectAccounts);
  const pathname = useSelector(selectPathname);

  if (loggedIn && !pathname.startsWith('/oauth')) {
    if (disabledAuthorizations !== false && disabledAuthorizations.length > 0) {
      return (
        <ErrorContainer>
          <H2>Action required: Reconnect</H2>
          <P>
            Passiv has lost its connection to your brokerage account. We
            apologize for the inconvenience, but it's a simple fix! Just click
            the button below to reconnect.
          </P>
          {disabledAuthorizations.map((authorization) => {
            let selectedAccounts = accounts.filter(
              (account) => account.brokerage_authorization === authorization.id,
            );

            let accountString = `${
              selectedAccounts.length
            } Accounts: ${selectedAccounts
              .map((account) => account.name)
              .join(', ')}`;
            return (
              <ReconnectContainer>
                <ReconnectPanel>
                  <ConnectionUpdate
                    authorization={authorization}
                    type={authorization.type}
                    hideTitle={true}
                    name="Reconnect"
                    align="left"
                  />
                </ReconnectPanel>
                <ReconnectPanel>
                  <Tooltip label={accountString}>
                    <span>
                      <Title>Name:</Title>&nbsp;{authorization.name}&nbsp;
                      <FontAwesomeIcon icon={faQuestionCircle} />
                    </span>
                  </Tooltip>
                </ReconnectPanel>
                <ReconnectPanel>
                  <span>
                    <Title>Brokerage:</Title>&nbsp;
                    {authorization.brokerage.name}
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

export default ReconnectMessage;
