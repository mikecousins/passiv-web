import React from 'react';
import JoyRide from 'react-joyride';
import { useSelector } from 'react-redux';
// import { getData, postData } from '../../api';
import { selectShowInAppTour } from '../../selectors/features';

type Props = {
  steps: any;
};

const Tour = ({ steps }: Props) => {
  // const [showMessage, setShowMessage] = useState(true);
  const showInAppTour = useSelector(selectShowInAppTour);

  const handleJoyrideCallback = (data: any) => {
    if (data.action === 'skip') {
      // call the endpoint
      // postData(`/api/v1/contextualMessages`, {
      //   name: 'import_targets_tour',
      // }).then((res) => {
      //   console.log(res);
      // });
      console.log(data);
    }
  };

  // useEffect(() => {
  //   getData('/api/v1/settings').then((res) => {
  //     res.data.contextual_messages.map((c: any) => {
  //       if (c.name === 'import_targets_tour') {
  //         setShowMessage(false);
  //       }
  //     });
  //   });
  // }, []);

  return (
    <>
      {showInAppTour && (
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
