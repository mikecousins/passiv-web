import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  background: var(--brand-grey);
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-align: left;
  color: #fff;
  padding: 10px 25px 10px 20px;
  display: block;
  height: 81px;
  text-transform: uppercase;
  position: fixed;
  z-index: 4;
  @media (max-width: 900px) {
    padding: 1px 9px 6px 14px;
    height: 72px;
  }
  strong {
    display: inline-block;
    margin-top: 2px;
    @media (max-width: 900px) {
      display: none;
    }
  }
  &:hover {
    background: var(--brand-blue);
    color: #fff;
    span {
      background: #fff;
    }
  }
`;

const Hamburger = styled.div`
  text-align: left;
  float: left;
  margin-right: 14px;
  margin-top: 9px;
  span {
    display: block;
    width: 33px;
    height: 4px;
    margin: 0 0 6px auto;
    position: relative;
    background: #fff;
    border-radius: 3px;
    z-index: 1;
    text-align: right;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
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

type Props = {
  menuVisibility: boolean;
  handleMouseDown: () => void;
};

const MenuButton = ({ menuVisibility, handleMouseDown }: Props) => (
  <Button
    onMouseDown={handleMouseDown}
    type="button"
    role="button"
    aria-label={menuVisibility ? 'Collapse Menu' : 'Expand Menu'}
  >
    <Hamburger>
      <span />
      <span />
      <span />
    </Hamburger>
    <strong>
      {menuVisibility ? 'Collapse' : 'Expand'}
      <br />
      Menu
    </strong>
  </Button>
);

export default MenuButton;
