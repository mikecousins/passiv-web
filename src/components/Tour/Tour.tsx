import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JoyRide from 'react-joyride';
import { postData } from '../../api';
import { selectContextualMessages } from '../../selectors';
import { loadSettings } from '../../actions';
import { toast } from 'react-toastify';

type Props = {
  steps: any;
  name: string;
};

const Tour = ({ steps, name }: Props) => {
  const dispatch = useDispatch();
  const messages = useSelector(selectContextualMessages);
  const [showMessage, setShowMessage] = useState(false);

  const handleJoyrideCallback = (data: any) => {
    if (
      data.action === 'skip' ||
      // (data.action === 'close' && data.size === 1) ||
      (data.action === 'next' && data.status === 'finished')
    ) {
      postData(`/api/v1/contextualMessages`, {
        name: [name],
      })
        .then(() => {
          dispatch(loadSettings());
        })
        .catch(() => {
          toast.error(`Failed to skip tour "${name}".`);
        });
    }
  };

  useEffect(() => {
    if (messages) {
      messages.map((msg: string) => {
        if (msg === name) {
          setShowMessage(true);
        }
      });
    }
  }, [messages, name]);

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
            skip: 'Hide tour',
            close: 'Hide tour',
          }}
          styles={{
            tooltip: {
              fontSize: 20,
            },
            options: {
              primaryColor: 'orange',
            },
            buttonBack: {
              color: 'var(--brand-blue)',
            },
            buttonNext: {
              backgroundColor: 'var(--brand-blue)',
            },
          }}
        />
      )}
    </>
  );
};

export default Tour;
