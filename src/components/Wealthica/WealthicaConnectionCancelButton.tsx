import React from 'react';
import { Button } from '../../styled/Button';

type Props = {
  disabled: boolean;
  handleCancel: any;
};

let WealthicaConnectionCancelButton = ({ disabled, handleCancel }: Props) => {
  return (
    <Button type="button" disabled={disabled} onClick={handleCancel}>
      Cancel
    </Button>
  );
};

export default WealthicaConnectionCancelButton;
