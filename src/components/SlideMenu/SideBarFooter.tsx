import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import RefreshButton from './../RefreshButton';
import styled from '@emotion/styled';

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
`;
export const Help = styled.div`
  display: inline-block;
  margin-bottom: 8px;
  padding: 12px 20px 12px 20px;
  text-transform: none;
  &:hover {
    svg {
      color: var(--brand-blue);
    }
  }
  svg {
    margin-right: 5px;
  }
  a {
    display: inline-block;
    padding: 0;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const SideBarFooter = () => (
  <StyledFooter>
    <Help>
      <FontAwesomeIcon icon={faQuestionCircle} />
      <Link to="/app/help">Help</Link>
    </Help>
    <RefreshButton />
  </StyledFooter>
);

export default SideBarFooter;
