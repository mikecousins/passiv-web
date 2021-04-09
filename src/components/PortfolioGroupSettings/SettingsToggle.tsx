import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import {
  ToggleButton,
  DisabledToggleButton,
  StateText,
  Row,
} from '../../styled/ToggleButton';
import Tooltip from '../Tooltip';
import styled from '@emotion/styled';
import { P } from '../../styled/GlobalElements';

export const ToggleText = styled(StateText)`
  font-size: 20px;
  font-weight: 500;
  width: 30px;
  display: inline-block;
`;

const Name = styled.span`
  font-size: 20px;
  margin-left: 14px;
  vertical-align: middle;
`;

const Explanation = styled(P)`
  font-weight: 200;
  font-size: 16px;
  margin: 0px 0 20px 75px;
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

const SettingsToggle = ({
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
  let toggleButton = (
    <ToggleButton onClick={onChange}>
      <Tooltip label={tip}>
        <FontAwesomeIcon icon={value ? faToggleOn : faToggleOff} />
      </Tooltip>
      <ToggleText>{value ? 'On' : 'Off'}</ToggleText>
    </ToggleButton>
  );
  if (disabled) {
    toggleButton = (
      <DisabledToggleButton>
        <Tooltip label={tip}>
          <FontAwesomeIcon icon={value ? faToggleOn : faToggleOff} />
        </Tooltip>
        <ToggleText>{value ? 'On' : 'Off'}</ToggleText>*
      </DisabledToggleButton>
    );
  }
  return (
    <React.Fragment>
      <Row>
        {toggleButton}
        <Name>{name}</Name>
        <Explanation>{explanation}</Explanation>
      </Row>
    </React.Fragment>
  );
};

export default SettingsToggle;
