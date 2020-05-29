import React, { useState } from "react";
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faCaretUp,
  faCaretDown,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import MultiSelect from "react-multi-select-component";

const SelectContainer = styled.div`
  position: absolute;
  width: 300px;
  .multi-select {
    --rmsc-primary: #05a185;
    --rmsc-hover: #05a185;
    --rmsc-selected: #fff;
    --rmsc-border: #f5f7f9;
    --rmsc-gray: #1b1c24;
    --rmsc-background: #fff;
    --rmsc-spacing: 10px;
    --rmsc-border-radius: 4px;
    --rmsc-height: 44px;
  }
  .multi-select span {
    vertical-align: middle;
  }
  .multi-select input {
    vertical-align: top;
  }
`;

export const AccountsSelect = () => {

const options = [
    { label: "Grapes", value: "grapes" },
    { label: "Mango", value: "mango" },
    { label: "Strawberry", value: "strawberry", disabled: true },
  ];

  const [selected, setSelected] = useState([]);

  return (
    <React.Fragment>
      <SelectContainer>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={"Select Account"}
        />
      </SelectContainer>
    </React.Fragment>
  );
};

export default AccountsSelect;
