import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBrokerages } from '../selectors';
import AuthorizationPicker from '../components/AuthorizationPicker';
import ShadowBox from '../styled/ShadowBox';
import { StepQuestion, StepButton, SmallStepButton, Step, WhyQuestrade } from '../styled/SignupSteps';
import { Table,H1,P,A,UL } from '../styled/GlobalElements';

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
    return this.getQuestradeBrokerage().authorization_types.find(t => t.type === 'read').type;
  }

  render() {
    let nextPage = null;
    if (this.state.haveQuestrade) {
      nextPage = (
        <React.Fragment>
          <Table>
            <SmallStepButton onClick={() => {this.resetAnswered()}}>Back</SmallStepButton>
            <AuthorizationPicker
              allowSelect={false}
              brokerage={this.getQuestradeId()}
              type={this.getQuestradeDefaultType()}
            />
          </Table>
        </React.Fragment>
      )
    }
    else {
      nextPage = (
        <React.Fragment>
          <WhyQuestrade>
            <P color="white">Not with <A href="https://www.questrade.com" target="_blank">Questrade</A>? Here’s why you should be:</P>
            <UL color="white">
              <li>Free purchasing of ETFs</li>
              <li>Low commissions (just $4.95 - $9.95)</li>
              <li>They’ll rebate the transfer fee (max. $150) when you make the switch.</li>
            </UL>
          </WhyQuestrade>
          <Table spaceAround>
            <SmallStepButton onClick={() => {this.resetAnswered()}}>Back</SmallStepButton>
            <StepButton blue onClick={() => {alert('new account!')}}>Open an Account</StepButton>
          </Table>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <ShadowBox dark>
          <H1 color="white">SETUP</H1>
          <Step>Step 1 - Connect Questrade</Step>
          {
            this.state.answered ? nextPage : (
              <React.Fragment>
                <StepQuestion>Do you have a Questrade account?</StepQuestion>
                <Table spaceAround>
                  <SmallStepButton onClick={() => {this.setHaveQuestrade(false)}}>No</SmallStepButton>
                  <StepButton onClick={() => {this.setHaveQuestrade(true)}}>Yes</StepButton>
                </Table>
              </React.Fragment>
            )
          }
        </ShadowBox>
      </React.Fragment>
    )
  }
}

const select = state => ({
  brokerages: selectBrokerages(state),
});
const actions = {};

export default connect(select, actions)(QuestradeAuthorizationPicker);
