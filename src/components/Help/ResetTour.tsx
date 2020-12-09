import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { A, H2, P } from '../../styled/GlobalElements';
import { StateText, ToggleButton } from '../../styled/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { selectContextualMessages } from '../../selectors';
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
    color: #04a287;
  }
  a {
    border-radius: 4px;
    background: var(--brand-blue);
    color: #fff;
    display: inline-block;
    margin-bottom: 8px;
    margin-left: 5px;
    padding: 12px 20px 12px 18px;
    text-transform: none;
    text-decoration: none;
  }
`;

const ResetTour = () => {
  const messages = useSelector(selectContextualMessages);
  // const showTour = useSelector(selectShowTour)
  const [tour, setTour] = useState(true);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (messages?.length === 9) {
  //     setTour(true);
  //   }
  // }, [messages]);

  const updateTour = () => {
    setTour(!tour);
    if (tour === true) {
      postData(`/api/v1/contextualMessages`, {
        name: [
          'settings_page_tour',
          'overview_tab_tour',
          'group_settings_tour',
          'target_actual_bar_tour',
          'setup_portfolio_tour',
          'trades_tour',
        ],
      })
        .then(() => {
          dispatch(loadSettings());
        })
        .catch(() => {
          toast.error('Failed to turn off tours.');
        });
    } else {
      putData(`/api/v1/contextualMessages`, {
        name: [
          'settings_page_tour',
          'overview_tab_tour',
          'group_settings_tour',
          'target_actual_bar_tour',
          'setup_portfolio_tour',
          'trades_tour',
        ],
      })
        .then(() => {
          dispatch(loadSettings());
        })
        .catch(() => {
          toast.error('Failed to turn on tours.');
        });
    }
  };

  return (
    <TourContainer>
      <H2>Passiv Tours</H2>
      {tour ? (
        <P>Turn in-app tours Off or reset all the tours</P>
      ) : (
        <P>Need a refresher? Turn in-app tours back On </P>
      )}
      <ToggleButton onClick={updateTour}>
        {tour ? (
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
      {tour && (
        <A
          style={{
            color: 'var(--brand-blue)',
            background: 'white',
            border: '1px solid var(--brand-blue) ',
            marginLeft: '30px',
            fontWeight: 'bold',
          }}
        >
          Reset Tour
        </A>
      )}
    </TourContainer>
  );
};

export default ResetTour;

// {tour ? (
//   <>
//     {/* //! show only if they have one tour hidden AND tour turn ON (in /settings endpoint)*/}
//     <A>Reset Tour</A>
//     {/* //! show only if they have tour ON (in /settings endpoint) */}
//     <A style={{ background: 'white', color: 'red' }}>Turn off Tour</A>
//   </>
// ) : (
//   <A> Turn on Tour </A>
// )}
