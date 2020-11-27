import React, { useState, useEffect } from 'react';
import JoyRide from 'react-joyride';
import { getData, postData } from '../../api';
const IMPORT_TARGETS_AUTO = [
  {
    target: '.tour-import-holdings',
    content:
      'You can import all your holdings automatically from your brokerage account.',
  },
  {
    target: '.tour-import-targets-btn',
    content: 'Click to start importing ',
  },
];

const Tour = () => {
  const [showMessage, setShowMessage] = useState(true);
  const handleJoyrideCallback = (data: any) => {
    if (data.action === 'skip') {
      // call the endpoint
      postData(`/api/v1/contextualMessages`, {
        name: 'import_targets_tour',
      }).then((res) => {
        console.log(res);
      });
      console.log(data);
    }
  };

  useEffect(() => {
    getData('/api/v1/settings').then((res) => {
      res.data.contextual_messages.map((c: any) => {
        if (c.name === 'import_targets_tour') {
          setShowMessage(false);
        }
      });
    });
  }, []);

  return (
    <>
      {showMessage && (
        <JoyRide
          callback={handleJoyrideCallback}
          steps={IMPORT_TARGETS_AUTO}
          continuous={true}
          showSkipButton={true}
          locale={{
            last: 'End tour',
            skip: 'Close tour',
          }}
          styles={{
            options: {
              arrowColor: '#BEE0DB',
              backgroundColor: '#BEE0DB',
              primaryColor: '#000',
              textColor: 'black',
              width: 500,
              zIndex: 1000,
            },
          }}
        />
      )}
    </>
  );
};

export default Tour;
