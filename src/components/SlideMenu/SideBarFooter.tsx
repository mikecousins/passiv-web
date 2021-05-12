import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import RefreshButton from './../RefreshButton';
import styled from '@emotion/styled';
import { HELP_PATH } from '../../apps/Paths';
import PreLoadLink from '../PreLoadLink';

export const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 4;
  width: 212px;
  padding: 10px 0px 6px;
  background: #1b1c23;
  button {
    margin-top: 2px;
  }
  a {
    letter-spacing: 0;
  }
  @media (max-width: 900px) {
    width: inherit;
    text-align: center;
  }
`;
export const Help = styled.div`
  display: inline-block;
  margin-bottom: 8px;
  margin-left: 2px;
  padding: 12px 20px;
  text-transform: none;
  background-color: var(--brand-blue);
  border-radius: 4rem;
  svg {
    margin-right: 5px;
  }
  a {
    display: inline-block;
    padding: 0;
    font-size: 16px;
    font-weight: 500;
  }
  @media (max-width: 900px) {
    float: left;
    margin-left: 3px;
  }
`;

export const SideBarFooter = () => (
  <StyledFooter>
    <Help>
      <PreLoadLink path={HELP_PATH}>
        <FontAwesomeIcon icon={faQuestionCircle} /> Help
      </PreLoadLink>
    </Help>
    <RefreshButton />
  </StyledFooter>
);

export default SideBarFooter;
