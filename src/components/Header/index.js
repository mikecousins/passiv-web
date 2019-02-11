import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo-no-name.png';
import logo2x from '../../assets/images/logo-no-name@2x.png';
import Buttons from './Buttons';
import { selectName, selectLoggedIn } from '../../selectors';
import Hello from './Hello';

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  padding: 10px 20px 10px 160px;
  background: #fff;
  box-shadow: 2px 2px 8px rgba(190, 190, 190, 0.29);
  z-index: 3;
  nav {
    background: #fff;
    display: flex;
    justify-content: space-between;
  }
`;
const Logo = styled.header`
  margin-top: 2px;
`;
export const Header = ({ name, loggedIn }) => (
  <StyledHeader>
    <nav>
      <Logo>
        <Link to="/" >
          <img src={logo} srcSet={`${logo2x} 2x`} alt="Passiv Logo" />
        </Link>
      </Logo>
      {loggedIn && <Hello name={name} />}

      <Buttons />
    </nav>
  </StyledHeader>
);

const select = state => ({
  loggedIn: selectLoggedIn(state),
  name: selectName(state),
});

export default connect(select)(Header);





