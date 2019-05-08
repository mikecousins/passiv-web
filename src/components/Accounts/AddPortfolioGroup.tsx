import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '../../styled/Button';
import { initialLoad } from '../../actions';
import { postData } from '../../api';
import { InputNonFormik } from '../../styled/Form';

type Props = {
  reloadAllState: any;
};

const AddPortfolioGroup = ({ reloadAllState }: Props) => {
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
      ) : (
        <React.Fragment>
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
          >
            Add
          </Button>
          <Button onClick={() => setAdding(false)}>Cancel</Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const actions = {
  reloadAllState: initialLoad,
};

export default connect(
  null,
  actions,
)(AddPortfolioGroup);
