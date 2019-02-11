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
`;


const Hello = ({ name }) => (
  <HelloStyle>
    <b>Hi {name}!</b><br/>
    {format(new Date(), 'dddd, Do MMMM')}
  </HelloStyle>
);

export default Hello;
