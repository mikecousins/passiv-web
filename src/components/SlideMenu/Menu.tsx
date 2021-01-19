import React from 'react';
import SideBar from './SideBar';
import styled from '@emotion/styled';

const FlyOut = styled.div`
  background-color: var(--brand-grey);
  color: #fff;
  width: 212px;
  height: 100%;
  padding-top: 80px;
  position: relative;
  top: 0;
  left: 0px;
  overflow: scroll;
  z-index: 3;
  transition: all 0.25s;
  &.hide {
    width: 0px;
    overflow: hidden;
    left: -250px;
    aside {
      overflow: hidden;
    }
  }

  &.show {
    overflow: hidden;
  }

  h2 a {
    color: #333;
    margin-left: 15px;
    text-decoration: none;
  }

  h2 a:hover {
    text-decoration: underline;
  }

  a {
    color: #fff;
    text-decoration: none;
    padding: 20px 0;
    display: block;
    font-size: 1.125rem;
    letter-spacing: 0.015em;
    padding-left: 30px;
    padding-right: 15px;
  }
  .active {
    background: var(--brand-green);
  }
`;

type Props = {
  menuVisibility: boolean;
};

const Menu = ({ menuVisibility }: Props) => {
  return (
    <FlyOut className={menuVisibility ? 'show' : 'hide'}>
      <SideBar />
    </FlyOut>
  );
};

export default Menu;
