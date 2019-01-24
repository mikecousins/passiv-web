import React from 'react';
import { connect } from 'react-redux';
import { initialLoad } from '../actions';
import styled from '@emotion/styled';

export const Button = styled.button`
  position: fixed;
  bottom: 0;
  background: #000;
  color: #fff;
  font-size: 16px;
  padding: 10px 16px;
  display: block;
  &:hover {
  	background: var(--brand-blue);
  }
`;

const RefreshButton = (props) => (
  <Button
    onClick={() => {props.reloadAllState()}}>
    Refresh
  </Button>
);

const select = state => ({});
const actions = { reloadAllState: initialLoad, };

export default connect(select, actions)(RefreshButton);
