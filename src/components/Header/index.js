import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoutButton from '../LogoutButton';
import RefreshButton from '../RefreshButton';
import styled from '@emotion/styled';
import logo from '../../assets/images/logo-no-name.png';
import logo2x from '../../assets/images/logo-no-name@2x.png';


const StyledHeader = styled.header`
  grid-area: header;
  padding: 10px 20px;
  background: #fff;
`;

export const Header = () => (
  <StyledHeader>
    <nav>
      <div>
        <Link to="/" >
          <img src={logo} srcset={`${logo2x} 2x`} alt="Passiv Logo" />
        </Link>
      </div>
      <div>
        <RefreshButton />
        <LogoutButton />
      </div>
    </nav>
  </StyledHeader>
);

const select = state => ({});
export default connect(select)(Header);
