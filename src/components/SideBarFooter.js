import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import RefreshButton from './RefreshButton';
import styled from '@emotion/styled';

export const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
`
export const Help = styled.div`
  border-radius: 25px;
  background:  var(--brand-blue);
  display: inline-block;
  padding: 9px 16px 8px;
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
