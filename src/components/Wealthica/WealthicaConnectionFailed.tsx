import React from 'react';
import styled from '@emotion/styled';

import { P, BorderContainer } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import WealthicaConnectionCancelButton from './WealthicaConnectionCancelButton';

import { faBug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PreLoadLink from '../PreLoadLink';
import { HELP_PATH } from '../../apps/Paths';

type Props = {
  handleCancel: any;
  handleRetry: any;
};

const StyledTitle = styled.h2`
  font-size: 30px;
  font-weight: 400;
  text-align: left;
  display: block;
  color: #c41515;
`;

const WealthicaConnectionFailed = ({ handleCancel, handleRetry }: Props) => {
  let content = (
    <React.Fragment>
      <ShadowBox>
        <StyledTitle>
          <FontAwesomeIcon icon={faBug} /> Connection Failed!{' '}
        </StyledTitle>
        <BorderContainer>
          <P>
            We were unable to create a brokerage connection with the provided
            credentials. Please try again or{' '}
            <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink> if this
            persists.
          </P>
          <WealthicaConnectionCancelButton
            disabled={false}
            handleCancel={handleRetry}
            label={'Try Again'}
          />
          {handleCancel ? (
            <WealthicaConnectionCancelButton
              disabled={false}
              handleCancel={handleCancel}
              label={'Cancel'}
            />
          ) : null}
        </BorderContainer>
      </ShadowBox>
    </React.Fragment>
  );

  return <React.Fragment>{content}</React.Fragment>;
};

export default WealthicaConnectionFailed;
