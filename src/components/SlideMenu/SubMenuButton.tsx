import React from 'react';
import styled from '@emotion/styled';

export const Button = styled.button`
  color: #fff;
  text-decoration: none;
  display: block;
  font-size: 1.125rem;
  padding: 14px 15px 14px 20px;
  overflow: visibile;
  font-weight: 700;
  position: relative;
  transition: 0.25s all;
  width: 212px;
  text-align: left;
  @media (max-width: 900px) {
    text-align: center;
  }
  &:hover {
    color: var(--brand-green);
  }
  &:focus {
    background: var(--brand-black);
    box-shadow: -1px 2px 3px 0 rgba(0, 0, 0, 0.27);
    margin-right: -5px;
    padding-right: 5px;
    color: var(--brand-green);
    &:after {
      transform: rotate(135deg) translateY(-9px);
      -webkit-transform: rotate(135deg) translateY(-9px);
    }
  }
  &:visited {
    background-color: var(--brand-grey);
  }
  @media (max-width: 900px) {
    width: 100vw;
    margin: 0 auto;
    &:focus {
      margin: 0 auto;
      padding: 14px 15px 14px 20px;
    }
    &:after {
    }
  }
  &:after {
    border: solid #fff;
    content: '';
    border-width: 0 2.5px 2.5px 0;
    display: inline-block;
    padding: 2.5px;
    margin: auto 0;
    position: absolute;
    right: 22px;

    transform: rotate(-45deg) translateY(9px);
    -webkit-transform: rotate(-45deg) translateY(9px);
  }
`;

export const Hamburger = styled.div`
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

const SubMenuButton = ({ menuVisibility, handleMouseDown }: Props) => (
  <Button
    onMouseDown={handleMouseDown}
    type="button"
    role="button"
    aria-label={menuVisibility ? 'Collapse Menu' : 'Expand Menu'}
  >
    My Portfolios
  </Button>
);

export default SubMenuButton;
