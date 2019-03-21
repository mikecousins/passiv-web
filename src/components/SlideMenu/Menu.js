import React from 'react';
import styled from '@emotion/styled';

const FlyOut = styled.div`
  background-color: var(--brand-grey);
  color: #fff;
  width: 250px;
  height: 100%;
  padding-top: 110px;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform .3s cubic-bezier(0, .52, 0, 1);
  overflow: scroll;
  z-index: 3;

  &.hide {
    transform: translate3d(-100vw, 0, 0);
  }

  &.show {
    transform: translate3d(0vw, 0, 0);
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
    padding-left: 30px;
    padding-right: 15px;
    widht: 100%;
    svg {
      float: right;
    }
  }
  .active {
    background: var(--brand-green);
  }
`;

class Menu extends React.Component {
  render() {
    var visibility = "hide";

    if (this.props.menuVisibility) {
      visibility = "show";
    }

    return (
      <FlyOut id="flyoutMenu"
           className={visibility}>
        <ul>
          <li><a href="https://getpassiv.com/">Passiv Home</a></li>
          <li><a href="https://getpassiv.com/about">About</a></li>
          <li><a href="https://getpassiv.com/blog/">Blog</a></li>
          <li><a href="https://getpassiv.com/security/">Security</a></li>
          <li><a href="https://getpassiv.com/pricing/">Pricing</a></li>
        </ul>
      </FlyOut>
    );
  }
}

export default Menu;

