import React from 'react';
import { connect } from 'react-redux';
import { initialLoad } from '../actions';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

export const Button = styled.button`
  background: #000;
  color: #fff;
  font-size: 16px;
  padding: 10px 16px;
  display: block;
  svg {
    margin-right: 5px;
  }
  &:hover {
  	background: var(--brand-blue);
  }
`;

const RefreshButton = (props) => (
  <Button
    onClick={() => {props.reloadAllState()}}>
    <FontAwesomeIcon icon={faSyncAlt} />
    Refresh
  </Button>
);

const select = state => ({});
const actions = { reloadAllState: initialLoad, };

export default connect(select, actions)(RefreshButton);
