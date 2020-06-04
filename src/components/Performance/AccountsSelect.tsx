import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccounts } from '../../selectors/accounts';
import { setSelectedAccounts } from '../../actions/performance';
import MultiSelect from 'react-multi-select-component';

const SelectContainer = styled.div`
  margin: 0 0 20px auto;
  display: flex;
  .multi-select {
    --rmsc-primary: #05a185;
    --rmsc-hover: #05a185;
    --rmsc-selected: #fff;
    --rmsc-border: #d6d6d6;
    --rmsc-gray: #1b1c24;
    --rmsc-background: #fff;
    --rmsc-spacing: 10px;
    --rmsc-border-radius: 4px;
    --rmsc-height: 44px;
    width: 400px;
  }
  .multi-select span {
    vertical-align: middle;
  }
  .multi-select input {
    vertical-align: top;
  }
`;
const Submit = styled.input`
  padding: 12px 30px;
  margin-left: -2px;
  background: #04a286;
  color: #fff;
  z-index: 2;
  border-radius: 0 4px 4px 0;
`;
export const AccountsSelect = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(selectAccounts);

  const options = accounts.map(a => {
    const l = a.institution_name + ' ' + a.meta.type + ': ' + a.number;
    return { label: l, value: a.number };
  });

  const [selected, setSelected] = useState([]);
  dispatch(setSelectedAccounts(selected));

  return (
    <React.Fragment>
      <SelectContainer>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={'Select Account'}
          selectAllLabel={'Select All Accounts'}
        />
        <Submit type="submit" value="Choose Account" />
      </SelectContainer>
    </React.Fragment>
  );
};

export default AccountsSelect;
