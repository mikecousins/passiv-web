import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '../../styled/Button';
import { loadGroups } from '../../actions';
import { postData } from '../../api';
import { InputNonFormik, Label } from '../../styled/Form';
import { selectCanCreatePortfolioGroup } from '../../selectors/subscription';
import { AppState } from '../../store';

type Props = {
  reloadAllState: any;
  canCreatePortfolioGroup: any;
};

const AddPortfolioGroup = ({
  reloadAllState,
  canCreatePortfolioGroup,
}: Props) => {
  const [adding, setAdding] = useState(false);
  const [groupName, setGroupName] = useState('');

  const addGroup = () => {
    postData('/api/v1/portfolioGroups', { name: groupName }).then(() =>
      reloadAllState(),
    );
  };
  return (
    <React.Fragment>
      {!adding ? (
        <Button onClick={() => setAdding(true)}>Add Portfolio Group</Button>
      ) : !canCreatePortfolioGroup ? (
        <span>
          <Button onClick={() => setAdding(false)}>Cancel</Button>
          <React.Fragment>
            Modifying portfolio groups is only available to Elite subscribers.
            Upgrade your account to continue!
          </React.Fragment>
        </span>
      ) : (
        <React.Fragment>
          <Label>Portfolio Group Name</Label>
          <InputNonFormik
            type="text"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
          <Button
            onClick={() => {
              addGroup();
              setAdding(false);
            }}
            disabled={groupName === ''}
          >
            Add
          </Button>
          <Button onClick={() => setAdding(false)}>Cancel</Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const select = (state: AppState) => ({
  canCreatePortfolioGroup: selectCanCreatePortfolioGroup(state),
});

const actions = {
  reloadAllState: loadGroups,
};

export default connect(
  select,
  actions,
)(AddPortfolioGroup);
