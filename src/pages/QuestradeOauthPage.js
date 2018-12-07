import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postData } from '../api';
import { baseUrl } from '../actions';

// import { logoutStartedAsync } from '../actions';
// import { selectSettings } from '../selectors';

class QuestradeOauthPage extends Component {
  state = {
    started: false,
    loading: false,
    error: null,
    success: false,
    token: '',
  }

  finishAuthorization() {
    let urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('code');

    if (!this.state.started) {
      this.setState({started: true});
      this.setState({loading: true});
      postData(`${baseUrl}/api/v1/brokerages/authComplete/`, {token: token})
        .then(response => {
          console.log('success', response);
          this.setState({loading: false});
          this.setState({success: true});
        })
        .catch(error => {
          this.setState({loading: false});
          this.setState({error: error});
          console.log('error', error);
        });
    }
  }

  componentDidMount() {
    this.finishAuthorization();
  }

  render() {
    if (this.state.success) {
      return (
        <Redirect to='/app/dashboard' />
      )
    }
    else {
      return (
        <React.Fragment>
          <h1>Questrade Connection</h1>
          {
            this.state.loading ? (
                <p>Loading...</p>
              ) : (
                <p>Failure!</p>
              )
          }
        </React.Fragment>
      )
    }
  };
}

const select = state => ({});
const actions = {};

export default connect(select, actions)(QuestradeOauthPage);
