import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { selectSettings } from '../selectors';
import { baseUrl, loadSettings } from '../actions';
import { putData } from '../api';

export class CredentialsManager extends React.Component {
  state = {
    name: this.props.settings && this.props.settings.name,
    email: this.props.settings && this.props.settings.email,
    editingName: false,
    editingEmail: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.settings && nextProps.settings.name,
      email: nextProps.settings && nextProps.settings.email,
    });
  }

  startEditingName() {
    this.setState({editingName: true});
  }

  finishEditing() {
    if (this.state.name !== this.props.settings.name || this.state.email !== this.props.settings.email) {
      let settings = Object.assign({}, this.props.settings);
      settings.name = this.state.name;
      settings.email = this.state.email;
      putData(`${baseUrl}/api/v1/settings/`, settings)
        .then(response => {
          console.log('success', response);
          this.props.refreshSettings();
        })
        .catch(error => {
          console.log('error', error);
          this.props.refreshSettings();
        });
    }
    this.setState({editingName: false, editingEmail: false});
  }

  startEditingEmail() {
    this.setState({editingEmail: true});
  }


  render() {
    return (
      <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
        <h1>Credentials</h1>
        <div>
          {this.state.editingName ? (
            <div>
              <input value={this.state.name} onChange={(event) => {this.setState({name: event.target.value})}}/>
              <button className="text-base" onClick={() => this.finishEditing()}>Done</button>
            </div>
          ) : (
            <div>
              Name: {this.state.name}
              <button className="text-base" onClick={() => this.startEditingName()}><FontAwesomeIcon icon={faPen} />Edit</button>
            </div>
          )}
        </div>
        <div>
          {this.state.editingEmail ? (
            <div>
              <input value={this.state.email} onChange={(event) => {this.setState({email: event.target.value})}}/>
              <button className="text-base" onClick={() => this.finishEditing()}>Done</button>
            </div>
          ) : (
            <div>
              Email: {this.state.email}
              <button className="text-base" onClick={() => this.startEditingEmail()}><FontAwesomeIcon icon={faPen} />Edit</button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const select = state => ({
  settings: selectSettings(state),
});
const actions = {
  refreshSettings: loadSettings,
};

export default connect(select, actions)(CredentialsManager);
