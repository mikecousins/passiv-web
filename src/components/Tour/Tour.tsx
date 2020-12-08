import React, { useState, useEffect } from 'react';
import { selectLoggedIn } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import JoyRide from 'react-joyride';
import { getData, postData } from '../../api';
import { loadSettings } from '../../actions';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';

type Props = {
  steps: any;
  name: string;
};

// const StyledJoyRide = styled(JoyRide)`
//   button[title='Next'],
//   button[title='End tour'] button[title='Hide tour'] {
//     background-color: var(--brand-blue) !important;
//     font-weight: 600 !important;
//   }
//   button[title='Back'] {
//     color: var(--brand-blue) !important;
//     font-weight: 600 !important;
//   }
// `;

const Tour = ({ steps, name }: Props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);
  const [showMessage, setShowMessage] = useState(false);

  const handleJoyrideCallback = (data: any) => {
    if (
      data.action === 'skip' ||
      (data.action === 'close' && data.size === 1) ||
      (data.action === 'next' && data.status === 'finished')
    ) {
      postData(`/api/v1/contextualMessages`, {
        name: name,
      })
        .then((res) => {
          dispatch(loadSettings());
        })
        .catch(() => {
          toast.error(`Failed to skip tour "${name}".`);
        });
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getData('/api/v1/settings').then((res) => {
        res.data.contextual_messages.map((c: any) => {
          if (c.name === name) {
            setShowMessage(true);
          }
        });
      });
    }
  }, []);

  return (
    <>
      {showMessage && (
        <JoyRide
          callback={handleJoyrideCallback}
          steps={steps}
          showProgress
          continuous={steps.length > 1 ? true : false}
          showSkipButton={true}
          disableScrolling
          locale={{
            last: 'Hide tour',
            skip: 'Hide',
            close: 'Hide',
          }}
          styles={{
            options: {
              primaryColor: 'orange',
            },
          }}
        />
      )}
    </>
  );
};

export default Tour;
