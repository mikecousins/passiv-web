import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/passiv-logo-xmas.svg';
import logoRaster from '../../assets/images/passiv-logo-xmas.png';
import logoRaster2x from '../../assets/images/passiv-logo-xmas@2x.png';
import { selectName, selectLoggedIn } from '../../selectors';
import Hello from './Hello';
import Offline from './Offline';
import Demo from './Demo';
import { selectIsOnline } from '../../selectors/online';
import { selectIsDemo } from '../../selectors';
import { LogoutButton } from '../LogoutButton';

type StyledHeaderProps = {
  isOnline: boolean;
};

const StyledHeader = styled.header<StyledHeaderProps>`
  position: fixed;
  width: 100%;
  padding: 10px 20px 10px 222px;
  background: ${props => (props.isOnline ? '#fff' : '#FFCF9E')};
  box-shadow: 2px 2px 8px rgba(190, 190, 190, 0.29);
  z-index: 4;
  @media (max-width: 900px) {
    padding: 9px 8px 4px 75px;
  }
  nav {
    background: inherit;
    display: flex;
    justify-content: space-between;
  }
`;
const Logo = styled.div`
  max-width: 44px;
  margin-top: -5px;
  margin-bottom: -5px;
  object {
    max-width: 100%;
  }
`;

export const Header = () => {
  const loggedIn = useSelector(selectLoggedIn);
  const name = useSelector(selectName);
  const isOnline = useSelector(selectIsOnline);
  const isDemo = useSelector(selectIsDemo);
  return (
    <StyledHeader isOnline={isOnline}>
      <nav>
        <Logo>
          <Link to="/">
            <object width="50px" data={logo} type="image/svg+xml">
              <img
                src={logoRaster}
                srcSet={`${logoRaster2x} 2x`}
                alt="Passiv Logo"
              />
            </object>
          </Link>
        </Logo>
        {isOnline && isDemo && <Demo />}
        {!isOnline && <Offline />}
        {loggedIn && <Hello name={name} />}
        {loggedIn && <LogoutButton />}
      </nav>
    </StyledHeader>
  );
};

export default Header;
