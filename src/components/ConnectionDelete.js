import React from 'react'
import { connect } from 'react-redux'
import { initialLoad, loadBrokerages } from '../actions';
import { deleteData } from '../api';

import ShadowBox from '../styled/ShadowBox';
import { DeleteButton } from '../styled/DeleteButton';
import { Button } from '../styled/Button';
import { H3 } from '../styled/GlobalElements';

class ConnectionDelete extends React.Component{
  state = {
    deletingConnection: false,
  }

  startDeletingConnection = () => this.setState({deletingConnection: true})
  cancelDeletingConnection = () => this.setState({deletingConnection: false})

  confirmDelete = (authorization) => {
    deleteData(`/api/v1/authorizations/${authorization.id}`)
      .then(response => {
        console.log('success', response.data);
        this.setState({deletingConnection: false});
        this.props.reloadBrokerages();
        this.props.reloadAllState();
      })
      .catch(error => {
        console.log('error', error.response.data);
        this.setState({deletingConnection: false});
        this.props.reloadBrokerages();
        this.props.reloadAllState();
      });
  }


  render() {
    const { authorization } = this.props
    const { deletingConnection } = this.state

    return(
      <ShadowBox>
        <H3>Delete Connection</H3>

        {deletingConnection ?
          (
            <React.Fragment>
              <p>Are you sure you want to delete this connection and all its accounts?</p>
              <DeleteButton onClick={() => {this.cancelDeletingConnection()}}> Cancel </DeleteButton>
              <Button onClick={() => {this.confirmDelete(authorization)}}> Yes </Button>
            </React.Fragment>
          )
          : (<DeleteButton onClick={() => {this.startDeletingConnection()}}>Delete</DeleteButton>)
        }


      </ShadowBox>
    )
  }

}

const select = state => ({});

const actions = {reloadAllState: initialLoad, reloadBrokerages: loadBrokerages};

export default connect(select, actions)(ConnectionDelete)
