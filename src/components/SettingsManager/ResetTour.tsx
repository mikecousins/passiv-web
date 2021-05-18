import React from 'react';
import { A, DisabledBox, OptionsTitle } from '../../styled/GlobalElements';
import { StateText, ToggleButton } from '../../styled/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectSettings, selectTakeTour } from '../../selectors';
import { postData, putData } from '../../api';
import { loadSettings } from '../../actions';
import { toast } from 'react-toastify';

const ResetTour = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const showTour = useSelector(selectTakeTour);

  const updateTour = () => {
    if (!settings) {
      return;
    }
    let newSettings = { ...settings };
    if (!showTour) {
      newSettings.take_passiv_tour = true;
      putData('api/v1/settings/', newSettings)
        .then(() => {
          dispatch(loadSettings());
        })
        .catch(() => {
          toast.error('Unable to turn tours on.');
        });
    } else {
      newSettings.take_passiv_tour = false;
      putData('api/v1/settings/', newSettings)
        .then(() => {
          dispatch(loadSettings());
        })
        .catch(() => {
          toast.error('Unable to turn tours off.');
        });
    }
  };

  const handleResetTours = () => {
    postData('api/v1/resetPassivTour/', {})
      .then(() => {
        toast.success('Tours has been reset successfully.');
        dispatch(loadSettings());
      })
      .catch(() => {
        toast.error('Unable to reset tours.');
      });
  };

  return (
    <>
      <OptionsTitle>In-app Walkthroughs: </OptionsTitle>
      <ToggleButton onClick={updateTour}>
        {showTour ? (
          <React.Fragment>
            <FontAwesomeIcon icon={faToggleOn} />
            <StateText>on</StateText>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FontAwesomeIcon icon={faToggleOff} />
            <StateText>off</StateText>
          </React.Fragment>
        )}
      </ToggleButton>
      {showTour ? (
        <>
          <DisabledBox>
            Click on Reset Tours to show the tips that have been hidden or
            disable to hide all tours.
          </DisabledBox>
          <div style={{ marginTop: '20px' }}>
            <A onClick={() => handleResetTours()}>Reset Tours</A>
          </div>
        </>
      ) : (
        <DisabledBox>
          Get a tour of Passiv. Enable to learn about features and useful tips.
        </DisabledBox>
      )}
    </>
  );
};

export default ResetTour;
