import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
  const [showMessage, setShowMessage] = useState(false);
  const handleJoyrideCallback = (data: any) => {
    console.log(data);

    if (data.action === 'skip') {
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
    getData('/api/v1/settings').then((res) => {
      res.data.contextual_messages.map((c: any) => {
        if (c.name === name) {
          setShowMessage(true);
        }
      });
    });
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
          scrollOffset={500}
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
