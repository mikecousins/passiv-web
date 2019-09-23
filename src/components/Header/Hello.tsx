import React from 'react';
import { format } from 'date-fns';
import styled from '@emotion/styled';

export const HelloStyle = styled.div`
  margin: 0 20px 0 auto;
  padding-top: 8px;
  line-height: 1.2;
  text-align: right;
  b {
    font-size: 22px;
    font-weight: 700;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

type Props = {
  name: string;
};

const Hello = ({ name }: Props) => (
  <HelloStyle>
    <b>Hi {name === null ? 'there' : name}!</b>
    <br />
    {format(new Date(), 'EEEE, do MMMM')}
  </HelloStyle>
);

export default Hello;
