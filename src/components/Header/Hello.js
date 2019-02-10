import React from 'react';
import { format } from 'date-fns';

const Hello = ({ name }) => (
  <div>
        <b>Hi {name}!</b><br/>
        {format(new Date(), 'dddd, Do MMMM')}
      </div>
);

export default Hello;
