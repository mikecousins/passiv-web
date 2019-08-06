import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBrokerages } from '../selectors';
import { postData } from '../api';
import { Button } from '../styled/Button';
import { DisabledButton } from '../styled/DisabledButton';
import { StepButton } from '../styled/SignupSteps';
import { push } from 'connected-react-router';
import { Formik, ErrorMessage, Field } from 'formik';
import { Form, Input, Label } from '../styled/Form';

class AuthorizationPicker extends Component {
  state = {
    allowSelect:
      this.props.allowSelect === undefined ? true : this.props.allowSelect,
    allowSelectBrokerage:
      this.props.allowSelectBrokerage === undefined
        ? true
        : this.props.allowSelectBrokerage,
    allowSelectType:
      this.props.allowSelectType === undefined
        ? true
        : this.props.allowSelectType,
    updateBrokerageAuthorizationId:
      this.props.updateBrokerageAuthorizationId === undefined
        ? null
        : this.props.updateBrokerageAuthorizationId,
    brokerage: this.props.brokerage ? this.props.brokerage : '',
    type: this.props.type ? this.props.type : '',
    buttonName: this.props.name ? this.props.name : 'Connect',
  };

  receiveMessage(e) {
    var data = JSON.parse(e.data);
    var oAuthVerifier = data.oAuthVerifier;
    console.log('data', data);
    // push(`/app/oauth/tradeit?code=${oAuthVerifier}`);

    window.location = `/app/oauth/tradeit?code=${oAuthVerifier}`;
    console.log('hello?');
    // getTradeItTokens(oAuthVerifier)
  }

  handleRedirect(url) {
    let selectedBrokerage = this.props.brokerages.find(
      b => b.id === this.state.brokerage,
    );
    console.log('brokerage', selectedBrokerage);
    switch (selectedBrokerage.slug) {
      case 'TRADEIT':
        console.log('new window!');
        let newWindow = window.open(
          url,
          `Passiv: Connect ${selectedBrokerage.name}`,
          'height=480,width=640',
        );

        if (window.focus) {
          newWindow.focus();
        }

        if (window.addEventListener) {
          window.addEventListener('message', this.receiveMessage, false);
        } else {
          window.attachEvent('onmessage', this.receiveMessage);
        }
        break;
      case 'QUESTRADE':
        window.location = url;
        break;
      default:
        break;
    }
  }

  startAuthorization() {
    if (this.state.updateBrokerageAuthorizationId === null) {
      postData(`/api/v1/brokerages/${this.state.brokerage}/authorize/`, {
        type: this.state.type,
      }).then(response => {
        console.log('success', response.data);
        this.handleRedirect(response.data.url);
        // window.location = response.data.url;
      });
    } else {
      postData(
        `/api/v1/brokerages/${this.state.brokerage}/authorize/${this.state.updateBrokerageAuthorizationId}`,
        { type: this.state.type },
      ).then(response => {
        console.log('success', response.data);
        this.handleRedirect(response.data.url);
        // window.location = response.data.url;
      });
    }
  }

  selectedBrokeragedTypeMetadata() {
    return this.props.brokerages
      .find(x => x.id === this.state.brokerage)
      .authorization_types.find(type => type.type === this.state.type);
  }

  render() {
    const { brokerages } = this.props;

    let brokerageOptions = null;
    if (brokerages) {
      brokerageOptions = brokerages.map((brokerage, index) => {
        return (
          <option key={brokerage.id} value={brokerage.id}>
            {brokerage.name}
          </option>
        );
      });
    }

    let types = null;
    if (this.state.brokerage) {
      types = brokerages
        .find(x => x.id === this.state.brokerage)
        .authorization_types.map((type, index) => {
          return (
            <option key={type.type} value={type.type}>
              {type.type}
            </option>
          );
        });
    }

    // let keyForm = null;
    // if (this.state.brokerage && this.state.type) {
    //   let typeMetadata = this.selectedBrokeragedTypeMetadata();
    //   if (typeMetadata.auth_type == 'KEYS') {
    //     keyForm = (
    //       <React.Fragment>
    //         <Formik
    //           initialValues={{
    //             keyId: '',
    //             secretKey: '',
    //           }}
    //           render={props => (
    //             <Form onSubmit={props.handleSubmit}>
    //               <Label htmlFor="email">Key ID</Label>
    //               <Input
    //                 name="keyId"
    //                 placeholder="Key ID"
    //               />
    //               <Label>Secret Key</Label>
    //               <Input
    //                 name="secretKey"
    //                 placeholder="Secret Key"
    //               />
    //             </Form>
    //           )}
    //         />
    //       </React.Fragment>
    //     )
    //   }
    // }

    return (
      <React.Fragment>
        {this.state.allowSelect && (
          <React.Fragment>
            <Formik
              initialValues={{
                brokerage: this.state.brokerage,
                type: this.state.type,
                keyId: '',
                secretKey: '',
              }}
              render={props => {
                console.log('brokerages', brokerages);
                let selectedBrokerage = brokerages.find(
                  x => x.id === props.values.brokerage,
                );
                let selectedType = null;
                if (selectedBrokerage) {
                  selectedType = selectedBrokerage.authorization_types.find(
                    x => x.type === props.values.type,
                  );
                }
                console.log('selected brokerage', selectedBrokerage);
                let submitButton = (
                  <DisabledButton disabled>Connect</DisabledButton>
                );
                if (props.values.brokerage && props.values.type) {
                  if (this.state.allowSelect) {
                    submitButton = (
                      <Button
                        onClick={() => {
                          this.startAuthorization();
                        }}
                      >
                        {this.state.buttonName}
                      </Button>
                    );
                  } else {
                    submitButton = (
                      <StepButton
                        onClick={() => {
                          this.startAuthorization();
                        }}
                      >
                        {this.state.buttonName}
                      </StepButton>
                    );
                  }
                }
                return (
                  <Form onSubmit={props.handleSubmit}>
                    {this.state.allowSelectBrokerage && (
                      <Field component="select" name="brokerage">
                        <option disabled value="">
                          Choose your brokerage
                        </option>
                        {brokerages.map((brokerage, index) => {
                          return (
                            <option key={brokerage.id} value={brokerage.id}>
                              {brokerage.name}
                            </option>
                          );
                        })}
                      </Field>
                    )}
                    {this.state.allowSelectType && (
                      <Field component="select" name="type">
                        <option disabled value="">
                          Select an access level
                        </option>
                        {selectedBrokerage &&
                          selectedBrokerage.authorization_types.map(
                            (type, index) => {
                              return (
                                <option key={type.type} value={type.type}>
                                  {type.type}
                                </option>
                              );
                            },
                          )}
                      </Field>
                    )}
                    {selectedType && selectedType.auth_type === 'KEYS' && (
                      <React.Fragment>
                        <Label htmlFor="email">Key ID</Label>
                        <Input name="keyId" placeholder="Key ID" />
                        <Label>Secret Key</Label>
                        <Input name="secretKey" placeholder="Secret Key" />
                      </React.Fragment>
                    )}

                    {submitButton}
                  </Form>
                );
              }}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const select = state => ({
  brokerages: selectBrokerages(state),
});

const actions = {
  push: push,
};

export default connect(select)(AuthorizationPicker);
