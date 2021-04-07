import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putData } from '../../api';
import { loadGroup } from '../../actions';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { Formik, Field } from 'formik';
import { Form } from '../../styled/Form';
import { H3 } from '../../styled/GlobalElements';

import {
  selectCurrentGroupSettings,
  selectCurrentGroupId,
} from '../../selectors/groups';

const InlineDiv = styled.div`
  display: inline-block;
  width: 50%;
`;

const StyledFieldBase = styled(Field)`
  max-width: 50%;
`;

export const StyledSelect = styled(StyledFieldBase)`
  padding: 11px 52px 10px 14px;
  display: inline-block;
  background-color: #fff;
  border-radius: 0;
  border: 1px solid #03846d;
  -webkit-appearance: none;

  background-image: linear-gradient(45deg, #0000 50%, #fff 50%),
    linear-gradient(135deg, #fff 50%, #0000 50%),
    linear-gradient(to right, #04a287, #04a287);

  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), 100% 0;

  background-size: 8px 5px, 5px 5px, 2.5em 3.5em;
  background-repeat: no-repeat;
`;

type Props = {
  edit: boolean;
};

const OrderTargetAllocations = ({ edit }: Props) => {
  const settings = useSelector(selectCurrentGroupSettings);
  const groupId = useSelector(selectCurrentGroupId);
  const dispatch = useDispatch();

  const orderByOptions = {
    Alphabetically: 0,
    'By Target Allocation': 1,
    'By Asset Percentages': 2,
    'By Most Underweight': 3,
    'By Most Overweight': 4,
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

  const handleChange = (e: any) => {
    if (settings) {
      settings.order_targets_by = e.target.value;
      updateSettings();
    }
  };

  const orderByOptionsEntries = Object.entries(orderByOptions);

  if (!edit) {
    return null;
  }

  return (
    <React.Fragment>
      <InlineDiv>
        <H3>Order Targets</H3>
        <Formik
          initialValues={{
            orderBy: settings ? settings.order_targets_by : 0,
          }}
          onSubmit={() => {}}
        >
          <Form onChange={(e) => handleChange(e)}>
            <StyledSelect as="select" name="orderBy">
              {orderByOptionsEntries.map((entry) => (
                <option value={entry[1]} key={entry[0].split(' ').join('')}>
                  {entry[0]}
                </option>
              ))}
            </StyledSelect>
          </Form>
        </Formik>
      </InlineDiv>
    </React.Fragment>
  );
};

export default OrderTargetAllocations;
