import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import logo from '../../assets/images/logo-no-name.png';
import logo2x from '../../assets/images/logo-no-name@2x.png';
import Buttons from './Buttons';

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  padding: 10px 20px;
  background: #fff;
  box-shadow: 2px 2px 8px rgba(190, 190, 190, 0.29);
  z-index: 3;
  nav {
    background: #fff;
    display: flex;
    justify-content: space-between;
  }
`;

export const Header = () => (
  <StyledHeader>
    <nav>
      <div>
        <Link to="/" >
          <img src={logo} srcSet={`${logo2x} 2x`} alt="Passiv Logo" />
        </Link>
      </div>
      <Buttons />
    </nav>
  </StyledHeader>
);

export default Header;





