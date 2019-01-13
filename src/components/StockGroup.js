import React from 'react';
import ShadowBox from '../styled/ShadowBox';
import { Form, Input, Label } from '../styled/Form';

const StockGroup = (props) => (
  <ShadowBox>
    <div>
      <span>{props.name}</span>
      <span>$123,456</span>
      <span>Current Allocation 18%</span>
      <Label>Desired Allocation: </Label>
      <div>
        <Input type="text" placeholder="" aria-label="Full name" value="20%" />
      </div>
    </div>
    <div>
      {props.children}
    </div>
  </ShadowBox>
);

export default StockGroup;
