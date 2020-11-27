import React from 'react';
import JoyRide from 'react-joyride';
const IMPORT_TARGETS_AUTO = [
  {
    target: '.tour-import-holdings',
    content:
      'You can import all your holdings automatically from your brokerage account',
  },
  {
    target: '.tour-import-btn',
    content: 'Click import to start importing ',
  },
];

const Tour = () => {
  const handleJoyrideCallback = (data) => {
    if (data.action === 'skip') {
      // call the endpoint
      console.log('data');
    }
  };
  return (
    <>
      <JoyRide
        callback={handleJoyrideCallback}
        steps={IMPORT_TARGETS_AUTO}
        continuous={true}
        showSkipButton={true}
        locale={{
          last: 'End tour',
          skip: 'Close tour',
        }}
      />
    </>
  );
};

export default Tour;
