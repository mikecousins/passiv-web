import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Row } from '../../styled/ToggleButton';
import Tooltip from '../Tooltip';
import styled from '@emotion/styled';
import { P } from '../../styled/GlobalElements';
import { CheckBox } from '../../styled/CheckBox';

type NameProps = {
  disabled: boolean;
};
const Name = styled.span<NameProps>`
  font-size: 20px;
  margin-left: 55px;
  line-height: 26px;
  color: ${(props) => (props.disabled ? 'grey' : '')};
`;

const Explanation = styled(P)`
  font-weight: 200;
  font-size: 16px;
  margin-left: 55px;
`;

type Props = {
  name: string;
  explanation?: string;
  value: boolean;
  onChange?: () => void;
  tip?: string | null;
  disabled?: boolean;
  invert?: boolean;
};

const SettingsCheckBox = ({
  name,
  value,
  explanation,
  onChange = () => {},
  tip = null,
  disabled = false,
  invert = false,
}: Props) => {
  if (invert) {
    value = !value;
  }
  let checkBox = (
    <CheckBox disabled={disabled}>
      <label className="container">
        <input
          type="checkbox"
          checked={value && !disabled}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="checkmark"></span>
      </label>
    </CheckBox>
  );
  return (
    <React.Fragment>
      <Row>
        {checkBox}
        <Name disabled={disabled}>
          {name}{' '}
          {tip && disabled && (
            <Tooltip label={tip}>
              <FontAwesomeIcon icon={faInfoCircle} size="sm" />
            </Tooltip>
          )}
        </Name>
        <Explanation>{explanation}</Explanation>
      </Row>
    </React.Fragment>
  );
};

export default SettingsCheckBox;
