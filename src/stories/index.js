import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button } from '../styled/Button';
import { AccountTargets } from '../components/AccountTargets';

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>);

storiesOf('AccountTargets', module)
  .add('Loading', () => <AccountTargets />);
