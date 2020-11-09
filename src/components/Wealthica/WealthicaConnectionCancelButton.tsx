import React from 'react';
import { Button } from '../../styled/Button';

type Props = {
  disabled: boolean;
  handleCancel: any;
  label: string;
};

let WealthicaConnectionCancelButton = ({
  disabled,
  handleCancel,
  label,
}: Props) => {
  return (
    <Button type="button" disabled={disabled} onClick={handleCancel}>
      {label}
    </Button>
  );
};

export default WealthicaConnectionCancelButton;
