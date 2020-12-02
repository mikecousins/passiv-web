import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import JoyRide from 'react-joyride';
import { getData, postData } from '../../api';
import { loadSettings } from '../../actions';
import { toast } from 'react-toastify';

type Props = {
  steps: any;
  name: string;
};

const Tour = ({ steps, name }: Props) => {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const handleJoyrideCallback = (data: any) => {
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
          continuous={true}
          showSkipButton={true}
          locale={{
            last: 'End tour',
            skip: 'Close tour',
          }}
          styles={{
            options: {
              arrowColor: '#ffffff',
              backgroundColor: '#ffffff',
              primaryColor: 'orange',
              textColor: 'black',
              width: 500,
              zIndex: 1,
            },
          }}
        />
      )}
    </>
  );
};

export default Tour;
