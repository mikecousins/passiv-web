import React from 'react';
import styled from '@emotion/styled';
import { Symbol } from '../styled/Group';
import { P, Table, A } from '../styled/GlobalElements';
import { Error } from '../types/groupInfo';
import PreLoadLink from './PreLoadLink';
import { CONTACT_FORM_PATH } from '../apps/Paths';
import NotificationMessage from './NotificationMessage';

const Ticker = styled.div`
  margin: 30px 0px;
  min-width: 15%;
`;

const Description = styled.div`
  margin: 30px 0px;
  min-width: 85%;
  font-size: 18px;
  font-weight: 600;
`;

type Props = {
  error: Error;
};

const PortfolioGroupErrors = ({ error }: Props) => {
  let errorDisplay = <></>;

  let error_header = 'Something went wrong!';

  if (error && error.meta) {
    switch (error.code) {
      case '2000':
        errorDisplay = (
          <P>
            We encountered an unexpected error while accessing your account
            information. Please try again later or{' '}
            <PreLoadLink path={CONTACT_FORM_PATH}>contact support</PreLoadLink>{' '}
            if this persists.
          </P>
        );
        break;
      case '2001':
        let renderedSymbols = error.meta.symbols.map((symbol: any) => {
          return (
            <React.Fragment>
              <Table>
                <Ticker>
                  <Symbol>{symbol.symbol}</Symbol>
                </Ticker>
                <Description>{symbol.description}</Description>
              </Table>
            </React.Fragment>
          );
        });
        errorDisplay = (
          <React.Fragment>
            <P>
              We were unable to obtain real-time price data for the following
              securities:
            </P>
            {renderedSymbols}
            <P>
              This could simply be a temporary issue with the availability of
              market data, or it could be the result of an issue with the
              security itself such as a delisting or other corporate action. You
              can always remove the security from your target portfolio to get
              past this error, or you can{' '}
              <PreLoadLink path={CONTACT_FORM_PATH}>
                contact support
              </PreLoadLink>{' '}
              if you think this is a mistake.
            </P>
          </React.Fragment>
        );
        break;
      case '2002':
        errorDisplay = (
          <React.Fragment>
            <P>
              We are having trouble communicating with the brokerage linked to
              this account.
            </P>
            <P>
              This is likely a temporary issue due to technical issues at the
              brokerage. Please try again later or{' '}
              <PreLoadLink path={CONTACT_FORM_PATH}>
                contact support
              </PreLoadLink>{' '}
              if this persists.
            </P>
          </React.Fragment>
        );
        break;
      case '3001':
        errorDisplay = (
          <React.Fragment>
            <P>
              Your brokerage's API is currently undergoing maintenance and we
              cannot pull your account information. Please try again later or{' '}
              <PreLoadLink path={CONTACT_FORM_PATH}>
                contact support
              </PreLoadLink>{' '}
              if this persists.
            </P>
          </React.Fragment>
        );
        break;
      case '3002':
        errorDisplay = (
          <React.Fragment>
            <P>
              We are having issues connecting to your brokerage account. This is
              most likely a temporary issue, but if it persists you may need to{' '}
              <A
                href="https://passiv.com/help/tutorials/how-to-manage-your-brokerage-connections"
                target="_blank"
                rel="noopener noreferrer"
              >
                reconnect your brokerage account
              </A>
              . Alternatively, you can always{' '}
              <PreLoadLink path={CONTACT_FORM_PATH}>
                contact support
              </PreLoadLink>
              .
            </P>
          </React.Fragment>
        );
        break;
      default:
        errorDisplay = (
          <P>
            We encountered an unexpected error while accessing your account
            information. Please try again later or{' '}
            <PreLoadLink path={CONTACT_FORM_PATH}>contact support</PreLoadLink>{' '}
            if this persists.
          </P>
        );
        break;
    }
  }

  if (error.code === 'SKIP_TRADES') {
    error_header = 'Warning: Unable to place some trades through Passiv ';
    errorDisplay = (
      <React.Fragment>
        <P>
          Some trades cannot be placed through Passiv. This could be caused by
          your brokerage's API not providing trades functionality. If your
          brokerage's API allows trades to be made, you could change your
          trading permissions to access this feature.
        </P>
        <P>
          If you believe this message is in error, please{' '}
          <PreLoadLink path={CONTACT_FORM_PATH}>contact support</PreLoadLink>.
        </P>
      </React.Fragment>
    );
  }

  return (
    <NotificationMessage error={true} title={error_header} alwaysOpen={false}>
      {errorDisplay}
    </NotificationMessage>
  );
};

export default PortfolioGroupErrors;
