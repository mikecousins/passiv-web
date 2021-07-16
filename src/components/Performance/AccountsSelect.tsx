import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccounts } from '../../selectors/accounts';
import {
  selectSelectedAccounts,
  selectStartDate,
  selectEndDate,
} from '../../selectors/performance';
import { setSelectedAccounts } from '../../actions/performance';
import MultiSelect from 'react-multi-select-component';
import {
  loadPerformanceAll,
  loadPerformanceCustom,
} from '../../actions/performance';
import { selectBrokerages } from '../../selectors';
import { Account } from '../../types/account';
import { Brokerage } from '../../types/brokerage';

const SelectContainer = styled.div`
  margin: 0 0 20px auto;
  display: flex;
  height: 100%;
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
    height: 100%;
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

const AccountsSelect = () => {
  const dispatch = useDispatch();
  // Create list of accounts for dropdown, sort by institution name and then account name
  const brokerages = useSelector(selectBrokerages);
  const accounts = useSelector(selectAccounts)
    .filter((a) => a.portfolio_group !== null)
    .filter((a) => hasReporting(a, brokerages))
    .sort((a, b) =>
      a.institution_name !== b.institution_name
        ? a.institution_name < b.institution_name
          ? -1
          : 1
        : a.name < b.name
        ? -1
        : 1,
    );
  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);
  const selectedAccounts = useSelector(selectSelectedAccounts);
  let hasDuplicates = false;
  const [showInvalidDateMessage, setshowInvalidDateMessage] = useState(false);
  for (let i = 0; i < accounts.length - 1; i++) {
    if (
      accounts
        .slice(i + 1)
        .map((a) => a.name)
        .includes(accounts[i].name)
    ) {
      hasDuplicates = true;
    }
  }

  const options = accounts.map((a) => {
    let l = a.name;
    if (hasDuplicates) {
      l = a.name + ': ' + a.number;
    }
    return { label: l, value: a.number };
  });

  const selectedOptions: any = [];
  options.forEach((option) => {
    if (selectedAccounts.map((a: any) => a?.value).includes(option.value)) {
      selectedOptions.push(option);
    }
  });
  const [selected, setSelected] = useState<any[]>(selectedOptions);
  if (selectedAccounts !== selected) {
    dispatch(setSelectedAccounts(selected));
  }

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
        <Submit
          type="submit"
          value="Apply"
          onClick={() => {
            if (validDates(startDate, endDate)) {
              setshowInvalidDateMessage(false);
              dispatch(
                loadPerformanceCustom(
                  selected.map((a) => a?.value),
                  startDate,
                  endDate,
                ),
              );
            } else {
              setshowInvalidDateMessage(true);
            }
            dispatch(loadPerformanceAll(selected.map((a) => a?.value)));
          }}
        />
      </SelectContainer>
      {showInvalidDateMessage && <div>Invalid Dates</div>}
    </React.Fragment>
  );
};

export default AccountsSelect;

export const validDates = (startDate: string, endDate: string) => {
  if (startDate !== undefined && endDate !== undefined) {
    if (startDate < endDate) {
      return true;
    }
  }
  return false;
};

export const hasReporting = (
  account: Account,
  brokerages: Brokerage[] | undefined,
) => {
  let reportingEnabled = false;
  if (brokerages !== undefined) {
    brokerages.forEach((b) => {
      if (account.institution_name === b.name && b.has_reporting) {
        reportingEnabled = true;
      }
    });
    return reportingEnabled;
  }

  return false;
};
