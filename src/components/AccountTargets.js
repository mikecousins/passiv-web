import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { baseUrl, importTarget } from '../actions';
import { selectCurrentGroupId, selectCurrentGroupTarget } from '../selectors';
import TargetBar from './TargetBar';
import { Button } from '../styled/Button';
import { postData } from '../api';

export class AccountTargets extends React.Component {
  state = { edit: false }

  render() {
    const { target, groupId, startImportTarget } = this.props;
    const { edit } = this.state;

    // show a spinner if we don't have our data yet
    if (!target) {
      return (
        <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
          <h3>Target Portfolio</h3>
          <span><FontAwesomeIcon icon={faSpinner} spin /></span>
        </div>
      );
    }

    // help them set a target if they don't have one yet
    if (target && target.length === 0) {
      return (
        <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
          <h3>Target Portfolio</h3>
          <span>No target set<button onClick={() => startImportTarget(groupId)}>Import</button></span>
        </div>
      );
    }
    const targetSchema = Yup.array().of(Yup.object().shape({
      percent: Yup.number()
        .required('Required'),
    }));

    return (
      <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
        <h3>Target Portfolio</h3>
        <Formik
          initialValues={{ targets: target }}
          validationSchema={targetSchema}
          onSubmit={values => {
            // post the new targets and update our data
            postData(`${baseUrl}/api/v1/portfolioGroups/${this.props.group.id}/`, values)
            .then(response => {
              console.log('success', response);
              this.setState({loading: false});
              this.props.refreshGroups();
            })
            .catch(error => {
              console.log('error', error);
              this.setState({loading: false});
            });
          }}
          render={(props) => (
            <Form>
              <FieldArray
                name="targets"
                render={arrayHelpers => (
                  <React.Fragment>
                    {props.values.targets.map(t => <TargetBar key={t.symbol} symbol={t.displaySymbol.symbol} percentage={t.percent} edit={edit} />)}
                  </React.Fragment>
                )}
              />
              <ErrorMessage name="targets" />
              {edit ? (
                <React.Fragment>
                  <Button onClick={() => this.setState({ edit: false })} disabled={!props.isDirty}>
                    Save
                  </Button>
                  <Button onClick={() => this.setState({ edit: false })}>
                    Cancel
                  </Button>
                </React.Fragment>
              ) : (
                <Button onClick={() => this.setState({ edit: true })}>
                  Edit
                </Button>
                )}
            </Form>
          )}
        />
      </div>
    );
  }
}

const actions = { startImportTarget: importTarget };

const select = state => ({
  groupId: selectCurrentGroupId(state),
  target: selectCurrentGroupTarget(state),
  symbols: select
});

export default connect(select, actions)(AccountTargets);
