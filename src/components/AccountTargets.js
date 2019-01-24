import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import { toast } from "react-toastify";
import { baseUrl, importTarget, loadGroups } from '../actions';
import { selectCurrentGroupId, selectCurrentGroupTarget } from '../selectors';
import TargetBar from './TargetBar';
import CashBar from './CashBar';
import { Button } from '../styled/Button';
import { patchData, postData, deleteData } from '../api';

import ShadowBox from '../styled/ShadowBox';

export class AccountTargets extends React.Component {
  state = { edit: false }

  setSymbol(target, symbol) {
    target.fullSymbol = symbol;
    target.symbol = symbol.id;
    this.forceUpdate();
  }

  render() {
    const { target, groupId, startImportTarget } = this.props;
    const { edit } = this.state;

    // show a spinner if we don't have our data yet
    if (!target) {
      return (
        <ShadowBox>
          <h3>Target Portfolio</h3>
          <span><FontAwesomeIcon icon={faSpinner} spin /></span>
        </ShadowBox>
      );
    }

    // help them set a target if they don't have one yet
    if (target && target.length === 0) {
      return (
        <ShadowBox>
          <h3>Target Portfolio</h3>
          <span>No target set<button onClick={() => startImportTarget(groupId)}>Import</button></span>
        </ShadowBox>
      );
    }

    return (
      <ShadowBox>
        <h3>Target Portfolio</h3>
        <Formik
          initialValues={{ targets: target }}
          enableReinitialize
          validate={(values, actions) => {
            const errors = {};
            const cashPercentage = 100 - values.targets.reduce((total, target) => {
              if (target.percent) {
                return total + parseFloat(target.percent);
              }
              return total;
            }, 0);
            if (cashPercentage < 0) {
              errors.cash = 'Too low';
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            // set us back to non-editing state
            this.setState({edit: false});

            // create our list of api requests to make
            const apiRequests = [];
            values.targets.forEach(target => {
              if (target.id) {
                if (target.deleted) {
                  // delete this target
                  apiRequests.push(deleteData(`${baseUrl}/api/v1/portfolioGroups/${groupId}/targets/${target.id}/`));
                } else {
                // update if it's an existing target
                apiRequests.push(patchData(`${baseUrl}/api/v1/portfolioGroups/${groupId}/targets/${target.id}/`, target));
              }
            } else {
                // add if it's a new target
                apiRequests.push(postData(`${baseUrl}/api/v1/portfolioGroups/${groupId}/targets/`, target));
              }
            });

            // execute our list of api requests
            Promise.all(apiRequests)
              .then((responses) => {
                // once we're done refresh the groups
                this.props.refreshGroups();
              })
              .catch((error) => {
                // display our error
                toast.error(`Failed to edit target: ${error && error.detail}`);

                // reset the form
                actions.resetForm();
              })
          }}
          onReset={(values, actions) => {
            values.targets = target;
            this.setState({ edit: false });
          }}
          render={(props) => (
            <Form>
              <div>
                <div>
                  Symbol
                </div>
                <div>
                  &nbsp;
                </div>
                <div>
                  <div>
                    Target
                  </div>
                  <div>
                    Actual
                  </div>
                  <div>
                    Delta
                  </div>
                </div>
              </div>
              <FieldArray
                name="targets"
                render={arrayHelpers => {
                  const cashPercentage = 100 - props.values.targets.reduce((total, target) => {
                    if (target.percent) {
                      return total + parseFloat(target.percent);
                    }
                    return total;
                  }, 0);
                  const cashActualPercentage = 100 - props.values.targets.reduce((total, target) => {
                    if (target.actualPercentage) {
                      return total + target.actualPercentage;
                    }
                    return total;
                  }, 0);
                  return (
                  <React.Fragment>
                    {props.values.targets.filter(t => !t.deleted).map((t, index) => (
                      <TargetBar
                        key={t.symbol}
                        target={t}
                        edit={edit}
                        setSymbol={(symbol) => this.setSymbol(t, symbol)}
                        onDelete={(id) => {
                          const target = props.values.targets.find(t => t.id === id);
                          target.deleted = true;
                          this.forceUpdate();
                          props.setFieldTouched('targets.0.percent');
                          toast.success(`${t.fullSymbol.symbol} deleted`);
                        }}
                      >
                        <Field name={`targets.${index}.percent`} readOnly={!this.state.edit} />
                      </TargetBar>
                    ))}
                    <CashBar percentage={cashPercentage} actualPercentage={cashActualPercentage} />
                    <ErrorMessage name="targets" />
                    {edit ? (
                      <React.Fragment>
                        <Button type="button" onClick={() => arrayHelpers.push({ symbol: null, percent: 0 })}>
                          Add
                        </Button>
                        <Button type="button">
                          Import
                        </Button>
                        <Button type="submit" onClick={props.handleSubmit} disabled={(props.isSubmitting || !props.dirty || !props.isValid) && !props.values.targets.find(t => t.deleted)}>
                          Save
                        </Button>
                        <Button type="button" onClick={props.handleReset}>
                          Cancel
                        </Button>
                      </React.Fragment>
                    ) : (
                      <Button type="button" onClick={() => this.setState({ edit: true })}>
                        Edit
                      </Button>
                      )}
                  </React.Fragment>
                )}}
              />
            </Form>
          )}
        />
      </ShadowBox>
    );
  }
}

const actions = {
  startImportTarget: importTarget,
  refreshGroups: loadGroups,
};

const select = state => ({
  groupId: selectCurrentGroupId(state),
  target: selectCurrentGroupTarget(state)
});

export default connect(select, actions)(AccountTargets);
