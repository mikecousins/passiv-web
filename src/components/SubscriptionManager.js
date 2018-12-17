import React from 'react';
import { connect } from 'react-redux';
import { selectSettings } from '../selectors';

export class SubscriptionManager extends React.Component {
  state = {}

  render() {
    return (
      <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
        <h1>Subscription</h1>
        <div>
          None
        </div>
      </div>
    )
  }
}

const select = state => ({
  settings: selectSettings(state),
});
const actions = {};

export default connect(select, actions)(SubscriptionManager);
