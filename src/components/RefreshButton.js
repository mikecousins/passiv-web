import React from 'react';
import { connect } from 'react-redux';
import { initialLoad } from '../actions';


const RefreshButton = (props) => (
  <button
    type="button"
    onClick={props.reloadAllState}
    className="bg-blue hover:bg-blue-dark text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Refresh
  </button>
);

const select = state => ({});
const actions = { reloadAllState: initialLoad, };

export default connect(select, actions)(RefreshButton);
