import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo-no-name.png';
import logo2x from '../../assets/images/logo-no-name@2x.png';
import Buttons from './Buttons';
import { selectName } from '../../selectors';

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

export const Header = (props) => (
  <StyledHeader>
    <nav>
      <div>
        <Link to="/" >
          <img src={logo} srcSet={`${logo2x} 2x`} alt="Passiv Logo" />
        </Link>
      </div>
      <div>
        <b>Hi {props.name}!</b><br/>
        {format(new Date(), 'dddd, Do MMMM')}
      </div>
      <Buttons />
    </nav>
  </StyledHeader>
);

const select = state => ({
  name: selectName(state),
});

export default connect(select)(Header);





