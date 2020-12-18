import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loadSettings, logout } from '../actions';
import { putData } from '../api';
import { selectSettings } from '../selectors';
import { selectIsMobile } from '../selectors/browser';
import { Table } from '../styled/GlobalElements';
import { LogoutButton as StyledLogoutButton } from '../styled/LogoutButton';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const isMobile = useSelector(selectIsMobile);

  const handleHideTourBtn = () => {
    if (!settings) {
      return;
    }
    let newSettings = { ...settings };
    newSettings.take_passiv_tour = false;
    putData('api/v1/settings/', newSettings)
      .then(() => {
        dispatch(loadSettings());
      })
      .catch(() => {
        toast.error('Unable to turn tours off.');
      });
  };
  return (
    <Table>
      {settings?.take_passiv_tour && !isMobile && (
        <StyledLogoutButton
          style={{
            color: 'var(--brand-blue)',
            borderColor: 'var(--brand-blue)',
          }}
          onClick={handleHideTourBtn}
        >
          Hide Tours
        </StyledLogoutButton>
      )}

      <StyledLogoutButton onClick={() => dispatch(logout())}>
        Logout
      </StyledLogoutButton>
    </Table>
  );
};

export default LogoutButton;
