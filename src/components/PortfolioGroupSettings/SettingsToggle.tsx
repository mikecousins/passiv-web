import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import {
  ToggleButton,
  DisabledToggleButton,
  StateText,
  Row
} from '../../styled/ToggleButton';
import Tooltip from '../Tooltip';

type Props = {
  name: string;
  value: boolean;
  onChange?: () => void;
  tip?: string | null;
  disabled?: boolean;
  invert?: boolean;
};

const SettingsToggle = ({
  name,
  value,
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
      <StateText>{value ? 'on' : 'off'}</StateText>
    </ToggleButton>
  );
  if (disabled) {
    toggleButton = (
      <DisabledToggleButton>
        <Tooltip label={tip}>
          <FontAwesomeIcon icon={value ? faToggleOn : faToggleOff} />
        </Tooltip>
        <StateText>{value ? 'on' : 'off'}</StateText>*
      </DisabledToggleButton>
    );
  }
  return (
    <React.Fragment>
      <Row>
        <span>{name}: </span>
        {toggleButton}
      </Row>
    </React.Fragment>
  );
};

export default SettingsToggle;
