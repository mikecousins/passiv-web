import React from 'react';
import styled from '@emotion/styled';

import { P, BorderContainer } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import { Link } from 'react-router-dom';
import WealthicaConnectionCancelButton from './WealthicaConnectionCancelButton';

import { faBug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  handleCancel: any;
};

const StyledTitle = styled.h2`
  font-size: 30px;
  font-weight: 400;
  text-align: left;
  display: block;
  color: #c41515;
`;

const WealthicaConnectionFailed = ({ handleCancel }: Props) => {
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
            <Link to="/app/help">contact support</Link> if this persists.
          </P>
          <WealthicaConnectionCancelButton
            disabled={false}
            handleCancel={handleCancel}
            label={'Try Again'}
          />
        </BorderContainer>
      </ShadowBox>
    </React.Fragment>
  );

  return <React.Fragment>{content}</React.Fragment>;
};

export default WealthicaConnectionFailed;
