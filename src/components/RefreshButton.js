import React from 'react';
import { connect } from 'react-redux';
import { initialLoad } from '../actions';
import { Button } from '../styled/Button';

const RefreshButton = (props) => (
  <Button onClick={() => {props.reloadAllState()}}>
    Refresh
  </Button>
);

const select = state => ({});
const actions = { reloadAllState: initialLoad, };

export default connect(select, actions)(RefreshButton);
