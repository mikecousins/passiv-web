import React from 'react';
import styled from '@emotion/styled';
import { A, H2, P } from '../../styled/GlobalElements';
import { StateText, ToggleButton } from '../../styled/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectSettings, selectTakeTour } from '../../selectors';
import { postData, putData } from '../../api';
import { loadSettings } from '../../actions';
import { toast } from 'react-toastify';

const TourContainer = styled.div`
  flex: 1;
  padding: 7rem 1rem 5rem;
  text-align: center;
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  p {
    font-size: 24px;
    margin-bottom: 30px;
  }
  svg {
    margin-left: 12px;
    font-size: 50px;
    color: var(--brand-green);
  }
  a {
    border-radius: 4px;
    display: inline-block;
    margin-bottom: 8px;
    margin-left: 30px;
    padding: 12px 20px 12px 18px;
    text-transform: none;
    text-decoration: none;
    color: var(--brand-blue);
    background: white;
    border: 1px solid var(--brand-blue);
    font-weight: bold;
  }
`;

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
    <TourContainer>
      <H2>Passiv Tours</H2>
      {showTour ? (
        <P>Turn in-app tours Off or reset all the tours</P>
      ) : (
        <P>Need a refresher? Turn in-app tours back On </P>
      )}
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
      {showTour && <A onClick={() => handleResetTours()}>Reset Tours</A>}
    </TourContainer>
  );
};

export default ResetTour;
