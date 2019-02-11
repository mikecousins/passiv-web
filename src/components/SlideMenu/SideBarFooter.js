import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import RefreshButton from './../RefreshButton';
import styled from '@emotion/styled';

export const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 4;
  width: 100%;
  padding: 12px 5px 10px;
  background: #1b1c23;
  button {
    margin-top: 4px;
  }
`
export const Help = styled.div`
  border-radius: 25px;
  background:  var(--brand-blue);
  display: inline-block;
  margin-bottom: 8px;
  margin-left: 5px;
  padding: 12px 20px 12px 18px;
  text-transform: none;
  svg {
    margin-right: 5px;
  }
  a {
    display: inline-block;
    padding: 0;
  }
`

const SideBarFooter = (props) => {

  return (
    <StyledFooter>
      <Help>
        <FontAwesomeIcon icon={faQuestionCircle} />
        <Link
          to="/app/help">
          Help
        </Link>
      </Help>
      <RefreshButton />
    </StyledFooter>
  )
};

export default SideBarFooter;
