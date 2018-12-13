import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBrokerages } from '../selectors';
import AuthorizationPicker from '../components/AuthorizationPicker';

class QuestradeAuthorizationPicker extends Component {
  state = {
    answered: false,
    haveQuestrade: false,
  }

  resetAnswered() {
    this.setState({answered: false});
  }

  setHaveQuestrade(value) {
    this.setState({answered: true, haveQuestrade: value});
  }

  getQuestradeBrokerage() {
    return this.props.brokerages.find(b => b.name === 'Questrade');
  }

  getQuestradeId() {
    return this.getQuestradeBrokerage().id;
  }

  getQuestradeDefaultType() {
    return this.getQuestradeBrokerage().authorization_types.find(t => t.type === 'trade').type;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.answered ? (
          <div>
          {this.state.haveQuestrade ? (
              <div>
                <button onClick={() => {this.resetAnswered()}}>Back</button>
                <AuthorizationPicker
                  allowSelect={false}
                  brokerage={this.getQuestradeId()}
                  type={this.getQuestradeDefaultType()}
                />
              </div>
            ) : (
              <div>
                <button onClick={() => {this.resetAnswered()}}>Back</button>
                Then you'd better make one!
              </div>
            )
          }
          </div>
        ) : (
          <div>
            Do you have a Questrade account?
            <button onClick={() => {this.setHaveQuestrade(true)}}>Yes</button>
            <button onClick={() => {this.setHaveQuestrade(false)}}>No</button>
          </div>
        )}
      </React.Fragment>
    )
  }
}

const select = state => ({
  brokerages: selectBrokerages(state),
});
const actions = {};

export default connect(select, actions)(QuestradeAuthorizationPicker);
