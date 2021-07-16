import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/logo-no-name.svg';
import logoRaster from '../../assets/images/logo-no-name.png';
import logoRaster2x from '../../assets/images/logo-no-name@2x.png';
import { selectName, selectLoggedIn } from '../../selectors';
import Hello from './Hello';
import Offline from './Offline';
import Demo from './Demo';
import { selectIsOnline } from '../../selectors/online';
import { selectIsDemo } from '../../selectors';
import LogoutButton from '../LogoutButton';
import { selectPathname } from '../../selectors/router';

type StyledHeaderProps = {
  isOnline: boolean;
  noSideBar: boolean;
};

const StyledHeader = styled.header<StyledHeaderProps>`
  position: fixed;
  width: 100%;
  padding: 10px 20px 10px;
  padding-left: ${(props) => (props.noSideBar ? '5px' : '222px')};
  background: ${(props) =>
    props.isOnline ? '#fff' : 'var(--brand-light-orange)'};
  border-bottom: ${(props) =>
    !props.isOnline && '5px solid var(--brand-orange);'};
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
const Logo = styled.header`
  margin-top: 2px;
  @media (max-width: 900px) {
    margin-top: 0;
  }
  object {
    max-height: 55.5px;
  }
`;

const Header = () => {
  const loggedIn = useSelector(selectLoggedIn);
  const name = useSelector(selectName);
  const isOnline = useSelector(selectIsOnline);
  const isDemo = useSelector(selectIsDemo);
  const pathname = useSelector(selectPathname);

  return (
    <StyledHeader isOnline={isOnline} noSideBar={pathname === '/quick-trade'}>
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
