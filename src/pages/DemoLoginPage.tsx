import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSucceeded, logout } from '../actions';
import { postData } from '../api';
import { selectLoggedIn, selectIsDemo } from '../selectors';
import { H1 } from '../styled/GlobalElements';
import DemoNotesContent from '../components/DemoNotesContent';
import ShadowBox from '../styled/ShadowBox';
import { Button } from '../styled/Button';
import { push } from 'connected-react-router';

type Props = {
  location: any;
};

const DemoLoginPage = ({ location }: Props) => {
  const loggedIn = useSelector(selectLoggedIn);
  const isDemo = useSelector(selectIsDemo);
  const dispatch = useDispatch();
  const [triggered, setTriggered] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const demoLogin = () => {
    setTriggered(true);
    setSubmitting(true);
    postData('/api/v1/auth/demo/', {})
      .then((response) => {
        setSubmitting(false);
        dispatch(loginSucceeded(response));
      })
      .catch((error) => {
        setSubmitting(false);
      });
  };

  if (loggedIn) {
    if (isDemo != null && !isDemo && !triggered) {
      dispatch(logout());
    } else {
      return (
        <ShadowBox background="#04a287">
          <DemoNotesContent />
          <Button
            onClick={() => {
              dispatch(push('/dashboard'));
            }}
          >
            Continue
          </Button>
        </ShadowBox>
      );
    }
  }

  if (!triggered) {
    demoLogin();
  }

  if (submitting) {
    return <H1>Initializing your demo account...</H1>;
  } else {
    return <H1>Oops, we weren't able to get you a demo account!</H1>;
  }
};

export default DemoLoginPage;
