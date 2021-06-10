import React, { useState } from 'react';
import { Button, SmallButton } from '../styled/Button';

import { A, H1, H2 } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';

const QuickTradingPage = () => {
  const [status, setStatus] = useState('none');

  let result = (
    <div>
      <Button onClick={() => setStatus('pin')}>Login with your PIN</Button>
      <A onClick={() => setStatus('new')}>Create an account quickly</A>
    </div>
  );

  switch (status) {
    case 'pin':
      result = (
        <div>
          <form>
            <input type="text" placeholder="Enter your PIN" />
            <SmallButton onClick={() => setStatus('enter')}>Enter</SmallButton>
          </form>
        </div>
      );
      break;
    case 'new':
      result = (
        <div>
          <H2>Start by creatin a Trading PIN</H2>
          <form>
            <label htmlFor="PIN1">Enter your PIN:</label>
            <input type="text" name="PIN1" />
            <br />
            <label htmlFor="PIN2">Confirm your PIN:</label>
            <input type="text" name="PIN2" />
            <br />
            <small>
              *Note: Don't forget your PIN or you will need to reconnect your
              accounts.
            </small>
            <SmallButton onClick={() => setStatus('new-2')}>
              Register
            </SmallButton>
          </form>
        </div>
      );
      break;
    case 'new-2':
      result = (
        <div>
          Would you like to share your holdings data with X?
          <form>
            <input type="radio" id="yes" name="share-data" value="yes" />
            <label htmlFor="yes">Yes</label>
            <input type="radio" id="no" name="share-data" value="no" />
            <label htmlFor="no">No</label>
            <br />
            <small>
              *Note: This will allow X to read your account positions and
              balances to provide you with addition of functionality.
            </small>
            <SmallButton onClick={() => setStatus('new-3')}>
              Continue
            </SmallButton>
          </form>
        </div>
      );
      break;
    case 'new-3':
      result = <div></div>;
      break;
    default:
      break;
  }

  return (
    <ShadowBox background="var(--brand-light-green)">
      <H1>Quick Trading By Passiv</H1>
      {result}
    </ShadowBox>
  );
};

export default QuickTradingPage;
