import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putData } from '../../api';
import styled from '@emotion/styled';
import { Formik, Field } from 'formik';
import { Form } from '../../styled/Form';

import {
  selectCurrentGroupSettings,
  selectCurrentGroupId,
} from '../../selectors/groups';

const StyledFieldBase = styled(Field)`
  width: 50%;
`;

const StyledSelect = styled(StyledFieldBase)`
  padding: 11px 52px 10px 14px;
  display: inline-block;
  background-color: #fff;
  border-radius: 0;
  border: 1px solid #000;
  -webkit-appearance: none;

  background-image: linear-gradient(45deg, #0000 50%, #fff 50%),
    linear-gradient(135deg, #fff 50%, #0000 50%),
    linear-gradient(to right, #2a2d34, #2a2d34);

  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), 100% 0;

  background-size: 8px 5px, 5px 5px, 2.5em 3.5em;
  background-repeat: no-repeat;
`;

const OrderTargetAllocations = () => {
  const settings = useSelector(selectCurrentGroupSettings);
  const dispatch = useDispatch();

  const orderByOptions = {
    Alphabetical: 0,
    'Target Allocation Percentage': 1,
    'Actual Assets Percentage': 2,
    'Most Underweight Assets': 3,
    'Most Overweight Assets': 4,
  };

  const updateSettings = () => {
    if (settings) {
      putData(`/api/v1/portfolioGroups/${groupId}/settings/`, settings)
        .then(() => {
          dispatch(loadGroup({ ids: [groupId] }));
        })
        .catch(() => {
          toast.error('Failed to update settings');
        });
    }
  };

  const orderByOptionsEntries = Object.entries(orderByOptions);
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          value: '3',
        }}
        onSubmit={() => console.log('Hello')}
      >
        <Form>
          <StyledSelect as="select" name="orderBy">
            {orderByOptionsEntries.map(entry => (
              <option value={entry[1]} key={entry[0].split(' ').join('')}>
                {entry[0]}
              </option>
            ))}
          </StyledSelect>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default OrderTargetAllocations;
