import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import uuid from 'uuid';
import { loadGroup } from '../actions';
import {
  selectCurrentGroupId,
  selectCurrentGroupPositions,
  selectCurrentGroupTotalEquityExcludedRemoved,
  selectCurrentGroupCash,
} from '../selectors';
import TargetBar from './TargetBar';
import CashBar from './CashBar';
import { Button } from '../styled/Button';
import { H3, Edit } from '../styled/GlobalElements';
import { TargetRow } from '../styled/Target';
import { postData } from '../api';

export const TargetSelector = ({
  lockable,
  groupId,
  target,
  refreshGroup,
  positions,
  totalEquity,
  cash,
}) => {
  const [edit, setEdit] = useState(false);
  const [forceUpdateToggle, setForceUpdateToggle] = useState(false);

  const canEdit = edit || !lockable;

  const forceUpdate = () => {
    setForceUpdateToggle(!forceUpdateToggle);
  };

  const setSymbol = (target, symbol) => {
    target.fullSymbol = symbol;
    target.symbol = symbol.id;
    forceUpdate();
  };

  const resetTargets = () => {
    postData(`/api/v1/portfolioGroups/${groupId}/targets/`, [])
      .then(response => {
        // once we're done refresh the groups
        setEdit(false);
        refreshGroup({ ids: [groupId] });
      })
      .catch(error => {
        // display our error
        toast.error(
          `Failed to reset targets: ${error.response &&
            error.response.data.detail}`,
        );
        setEdit(false);
        // reset the form
        actions.resetForm();
      });
  };

  const generateNewTarget = () => {
    let target = {
      symbol: null,
      percent: 0,
      key: uuid.v4(),
    };
    return target;
  };

  const initialTargets = target.map(target => {
    target.key = target.id;
    return target;
  });

  return (
    <Formik
      initialValues={{ targets: initialTargets }}
      enableReinitialize
      validate={(values, actions) => {
        console.log('validating targets', values.targets);
        const errors = {};
        const cashPercentage =
          100 -
          values.targets.reduce((total, target) => {
            if (!target.deleted && target.percent) {
              return total + parseFloat(target.percent);
            }
            return total;
          }, 0);
        if (cashPercentage < 0) {
          errors.cash = 'Too low';
        }
        values.targets.forEach((target, index) => {
          if (target.deleted === undefined || target.deleted === false) {
            if (target.symbol === null) {
              errors.targets = 'Symbol missing on new target';
            }
          }
        });
        console.log('validation errors', errors);
        return errors;
      }}
      onSubmit={(values, actions) => {
        // set us back to non-editing state
        setEdit(false);
        const newTargets = values.targets.filter(t => !t.deleted);
        postData(`/api/v1/portfolioGroups/${groupId}/targets/`, newTargets)
          .then(response => {
            // once we're done refresh the groups
            refreshGroup({ ids: [groupId] });
          })
          .catch(error => {
            // display our error
            toast.error(
              `Failed to edit targets: ${error.response &&
                error.response.data.detail}`,
            );

            // reset the form
            actions.resetForm();
          });
      }}
      onReset={(values, actions) => {
        values.targets = target;
        setEdit(false);
      }}
      render={props => (
        <div>
          <TargetRow>
            <H3 />
            <H3>Target</H3>
            <H3>Actual</H3>
          </TargetRow>
          <FieldArray
            name="targets"
            render={arrayHelpers => {
              // calculate any new targets actual percentages
              props.values.targets
                .filter(target => target.actualPercentage === undefined)
                .forEach(target => {
                  if (
                    positions &&
                    positions.find(
                      position => position.symbol.id === target.symbol,
                    )
                  ) {
                    const position = positions.find(
                      position => position.symbol.id === target.symbol,
                    );
                    target.actualPercentage =
                      ((position.price * position.units) / totalEquity) * 100;
                  }
                });

              // calculate the desired cash percentage
              const cashPercentage =
                100 -
                props.values.targets.reduce((total, target) => {
                  if (!target.deleted && target.percent) {
                    return total + parseFloat(target.percent);
                  }
                  return total;
                }, 0);

              // calculate the actual cash percentage
              const cashActualPercentage = (cash / totalEquity) * 100;

              if (props.values.targets.filter(t => !t.deleted).length === 0) {
                arrayHelpers.push(generateNewTarget());
              }
              return (
                <React.Fragment>
                  {props.values.targets.map((t, index) => {
                    if (t.deleted) {
                      return null;
                    }
                    return (
                      <div key={t.key}>
                        <TargetBar
                          key={t.symbol}
                          target={t}
                          edit={canEdit}
                          setSymbol={symbol => {
                            setSymbol(t, symbol);
                            props.setFieldTouched(`targets.${index}.symbol`);
                          }}
                          onDelete={key => {
                            let target = props.values.targets.find(
                              t => t.key === key,
                            );
                            target.deleted = true;
                            props.setFieldTouched('targets.0.percent');
                            props.setFieldValue(
                              'targets.0.percent',
                              props.values.targets[0].percent,
                            );
                            forceUpdate();
                          }}
                        >
                          <Field
                            type="number"
                            name={`targets.${index}.percent`}
                            readOnly={!canEdit}
                          />
                        </TargetBar>
                      </div>
                    );
                  })}
                  <div key="cashBar">
                    <CashBar
                      percentage={cashPercentage}
                      actualPercentage={cashActualPercentage}
                    />
                  </div>
                  <ErrorMessage name="targets" component="div" />
                  {canEdit ? (
                    <React.Fragment>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push(generateNewTarget())}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (lockable) {
                            resetTargets();
                          } else {
                            let len = props.values.targets.length;
                            for (let i = 0; i < len; i++) {
                              props.values.targets.pop(0);
                            }
                            arrayHelpers.push(generateNewTarget());
                          }
                        }}
                      >
                        Reset
                      </button>
                      <Button
                        type="submit"
                        onClick={props.handleSubmit}
                        disabled={
                          props.isSubmitting || !props.dirty || !props.isValid
                        }
                      >
                        Save
                      </Button>
                      {lockable && (
                        <button
                          type="button"
                          onClick={() => {
                            props.values.targets.forEach(t => {
                              if (t.deleted) {
                                delete t.deleted;
                              }
                            });
                            props.handleReset();
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </React.Fragment>
                  ) : (
                    <Edit type="button" onClick={() => setEdit(true)}>
                      <FontAwesomeIcon icon={faLock} />
                      Edit Targets
                    </Edit>
                  )}
                </React.Fragment>
              );
            }}
          />
        </div>
      )}
    />
  );
};

const actions = {
  refreshGroup: loadGroup,
};

const select = state => ({
  groupId: selectCurrentGroupId(state),
  positions: selectCurrentGroupPositions(state),
  totalEquity: selectCurrentGroupTotalEquityExcludedRemoved(state),
  cash: selectCurrentGroupCash(state),
});

export default connect(
  select,
  actions,
)(TargetSelector);
