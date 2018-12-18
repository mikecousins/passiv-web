import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button } from '../styled/Button';
import { LogoutButton } from '../styled/LogoutButton';
import { AccountTargets } from '../components/AccountTargets';

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>);

storiesOf('Button', module)
  .add('log out', () => <LogoutButton onClick={action('clicked')}>Logout</LogoutButton>);

  storiesOf('Button', module)
    .add('disabled', () => <DisabledButton onClick={action('clicked')}>Submit</DisabledButton>);

storiesOf('AccountTargets', module)
  .add('Loading', () => <AccountTargets />);
