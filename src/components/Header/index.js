import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo-no-name.svg';
import logoRaster from '../../assets/images/logo-no-name.png';
import logoRaster2x from '../../assets/images/logo-no-name@2x.png';
import Buttons from './Buttons';
import { selectName, selectLoggedIn } from '../../selectors';
import Hello from './Hello';
import { selectIsOnline } from '../../selectors/online';

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  padding: 10px 20px 10px 222px;
  background: ${props => (props.isOnline ? '#fff' : '#FFCF9E')};
  box-shadow: 2px 2px 8px rgba(190, 190, 190, 0.29);
  z-index: 4;
  @media (max-width: 900px) {
    padding: 9px 8px 2px 75px;
  }
  nav {
    background: #fff;
    display: flex;
    justify-content: space-between;
  }
`;
const Logo = styled.header`
  margin-top: 2px;
  @media (max-width: 900px) {
    margin-top: 0;
  }
`;

export const Header = ({ name, loggedIn, isOnline }) => (
  <StyledHeader isOnline={isOnline}>
    <nav>
      <Logo>
        <Link to="/">
          <object
            width="50px"
            data={logo}
            alt="Passiv Logo"
            type="image/svg+xml"
          >
            <img
              src={logoRaster}
              srcSet={`${logoRaster2x} 2x`}
              alt="Passiv Logo"
            />
          </object>
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
  isOnline: selectIsOnline(state),
});

export default connect(select)(Header);
