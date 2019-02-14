import React from 'react';
import styled from '@emotion/styled';

export const Button = styled.button`
  background: #f2f2f2;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-align: right;
  color: #232225;
  padding: 10px 25px 10px 20px;
  display: block;
  height: 84px;
  text-transform: uppercase;
  position: relative;
  z-index: 4;
  strong {
    display: inline-block;
    margin-top: 2px;
  }
  &:hover {
    background: var(--brand-blue);
    color: #fff;
    span {
      background: #fff;
    }
  }
`;

export const Hamburger = styled.div`
  text-align: right;
  float: left;
  margin-right: 14px;
  span {
    display: block;
    width: 33px;
    height: 4px;
    margin: 0 0 5px auto;
    position: relative;
    background: #232225;
    border-radius: 3px;
    z-index: 1;
    text-align: right;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                opacity 0.55s ease;
  }

  span:first-of-type {
    transform-origin: 0% 0%;
  }

  span:nth-last-of-type(2) {
    transform-origin: 0% 100%;
    width: 22px;
  }

  input:checked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #232323;
  }

  input:checked ~ span:nth-last-of-type(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }
  input:checked ~ span:nth-last-of-type(2) {
    transform: rotate(-45deg) translate(0, -1px);
  }
`;

class MenuButton extends React.Component {
  render() {
    return (
      <Button onMouseDown={this.props.handleMouseDown}>
        <Hamburger>
          <span></span>
          <span></span>
          <span></span>
        </Hamburger>
        <strong>Menu</strong>
      </Button>
    );
  }
}

export default MenuButton;
