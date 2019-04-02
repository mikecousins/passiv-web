import React from 'react';
import { connect } from 'react-redux';
import { initialLoad } from '../actions';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { selectLoggedIn } from '../selectors';

export const Button = styled.button`
  color: #fff;
  font-size: 16px;
  padding: 10px 16px;
  display: block;
  float: right;
  background: none;
  text-transform: none;
  svg {
    margin-right: 5px;
  }
  &:hover {
    background: var(--brand-blue);
  }
`;

const RefreshButton = ({ loggedIn, reloadAllState }) => (
  <React.Fragment>
    {loggedIn && (
      <Button
        onClick={() => {
          reloadAllState();
        }}
      >
        <FontAwesomeIcon icon={faSyncAlt} />
        Refresh
      </Button>
    )}
  </React.Fragment>
);

const select = state => ({
  loggedIn: selectLoggedIn(state),
});

const actions = {
  reloadAllState: initialLoad,
};

export default connect(
  select,
  actions,
)(RefreshButton);
