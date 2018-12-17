import React from 'react';
import { connect } from 'react-redux';
import { selectBrokerages, selectAuthorizations } from '../selectors';
import { initialLoad } from '../actions';
import AuthorizationPicker from '../components/AuthorizationPicker';

export class ConnectionsManager extends React.Component {
  state = {
    creatingNewConnection: false,
  }

  startCreatingNewConnection() {
    console.log('LOOL')
    this.setState({creatingNewConnection: true});
  }

  cancelCreatingNewConnection() {
    this.setState({creatingNewConnection: false});
  }

  render() {
    let authorizations = null;
    if (this.props.authorizations) {
      authorizations = this.props.authorizations.map(a =>
        <div key={a.id}>
          <span>{a.brokerage.name}</span>
          <button onClick={() => {
              alert(`Deleted ${a.id}`);
              this.props.reloadAllState();
            }
          }>
            Delete
          </button>
        </div>
      )
    }
    return (
      <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
        <h1>Connections</h1>
        {authorizations}
        {
          this.state.creatingNewConnection ?
            (
              <div>
                <button
                  onClick={() => {this.cancelCreatingNewConnection()}}
                  className="bg-blue hover:bg-blue-dark text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <AuthorizationPicker />
              </div>
            ) : (
              <div>
                <button
                  onClick={() => {this.startCreatingNewConnection()}}
                  className="bg-blue hover:bg-blue-dark text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  New Connection
                </button>
              </div>
            )
        }
      </div>
    )
  }
}

const select = state => ({
  brokerages: selectBrokerages(state),
  authorizations: selectAuthorizations(state),
});
const actions = { reloadAllState: initialLoad, };

export default connect(select, actions)(ConnectionsManager);
