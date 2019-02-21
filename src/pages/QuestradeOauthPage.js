import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postData } from '../api';
import { initialLoad } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
      this.setState({started: true, loading: true});
      postData('/api/v1/brokerages/authComplete/', { token: token })
        .then(response => {
          console.log('success', response);
          this.setState({loading: false, success: true});
          this.props.reloadAllState();
        })
        .catch(error => {
          this.setState({loading: false, error: error});
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
                <div>
                  <p>Loading...</p>
                  <FontAwesomeIcon icon={faSpinner} spin />
                </div>
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
const actions = {
  reloadAllState: initialLoad,
};

export default connect(select, actions)(QuestradeOauthPage);
