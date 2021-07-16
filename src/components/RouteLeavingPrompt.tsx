import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@reach/dialog';
import { Location } from 'history';
import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';
import { Button, TransparentButton } from '../styled/Button';
import { ActionContainer, H2Margin } from './ModelAssetClass/AssetClass';

interface Props {
  when?: boolean | undefined;
  navigate: (path: string) => void;
  message: string;
  confirmBtn: boolean;
  cancelBtn: boolean;
}

const RouteLeavingPrompt = ({
  when,
  navigate,
  message,
  confirmBtn,
  cancelBtn,
}: Props) => {
  const [dialog, setDialog] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (confirm && lastLocation) {
      // Navigate to the previous blocked location
      navigate(lastLocation.pathname);
    }
    // eslint-disable-next-line
  }, [confirm, lastLocation]);

  const handleBlockedNavigation = (nextLocation: any, action: any) => {
    if (!confirm && action !== 'REPLACE') {
      setDialog(true);
      setLastLocation(nextLocation);
      return false;
    }
    return true;
  };
  const handleConfirmNavigationClick = () => {
    setDialog(false);
    setConfirm(true);
  };

  return (
    <>
      <Prompt when={when} message={handleBlockedNavigation} />{' '}
      <Dialog
        isOpen={dialog}
        onDismiss={() => setDialog(false)}
        aria-labelledby="dialog1Title"
        aria-describedby="dialog1Desc"
      >
        <button
          onClick={() => {
            setDialog(false);
          }}
          style={{ float: 'right' }}
        >
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </button>
        <br />
        <H2Margin>{message}</H2Margin>

        <ActionContainer>
          {confirmBtn && (
            <Button onClick={handleConfirmNavigationClick}>Confirm</Button>
          )}
          {cancelBtn && (
            <TransparentButton onClick={() => setDialog(false)}>
              Cancel
            </TransparentButton>
          )}
        </ActionContainer>
      </Dialog>
    </>
  );
};
export default RouteLeavingPrompt;
