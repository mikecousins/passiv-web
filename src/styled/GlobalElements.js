import styled from '@emotion/styled';
import { css } from '@emotion/core';

const dynamicStyle = props =>
  css`
    color: ${props.color};
  `;

const dynamicMargin = props =>
  css`
    margin: ${props.margin};
  `;

// h1
export const H1 = styled.h1`
  font-size: 42px;
  font-weight: 500;
  line-height: 2.17;
  letter-spacing: -1.5px;
  color: #2a2d34;
  @media (max-width: 900px) {
    line-height: 1.3;
    margin-bottom: 20px;
  }
  ${dynamicStyle};
  ${dynamicMargin};
`;

// h2
export const H2 = styled.h2`
  font-size: 30px;
  font-weight: 600;
  text-align: left;
  color: #232225;
  display: block;
  ${dynamicMargin};
`;

// h3
export const H3 = styled.h3`
  font-size: 18px;
  font-weight: 900;
  line-height: 1.78;
  letter-spacing: 1px;
  color: #232225;
  ${dynamicMargin};
`;

// ul
export const UL = styled.ul`
  color: #2a2d34;
  ${dynamicStyle};
  li {
    margin-bottom: 10px;
  }
`;

// table
export const Table = styled.div`
  display: block;
  justify-content: inherit;
  @media (min-width: 900px) {
    display: flex;
    justify-content: ${props =>
      props.spaceAround ? 'inherit' : 'space-between'};
  }
`;

// p
export const P = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0 0 12px;
  ${dynamicStyle};
`;

// a
export const A = styled.a`
  font-size: 18px;
  text-align: left;
  color: #1250be;
  cursor: pointer;
`;

// a that looks like button
export const AButton = styled.a`
  background-color: ${props => (props.disabled ? '#003aa1' : '#003BA2')};
  opacity: ${props => (props.disabled ? '.7' : '1')};
  :hover,
  :visited,
  :link,
  :active {
    text-decoration: none;
  }

  border: none;
  color: white;
  padding: 13px 18px 15px;
  margin: 5px;
`;

// edit
export const Edit = styled.button`
  color: var(--brand-blue);
  margin-left: 10px;
  svg {
    padding-right: 3px;
  }
`;

//title
export const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const WarningBox = styled.div`
  background: #fceeb5;
  border-radius: 4px;
  padding: 10px 20px 10px;
  margin: 10px 0 10px 0;
  p {
    margin: 0;
  }
`;

export const ErrorMessage = styled.div`
  width: 100%;
  text-align: left;
  margin: 20px 0;
`;
