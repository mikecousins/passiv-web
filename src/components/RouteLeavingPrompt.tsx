import Dialog from '@reach/dialog';
import { Location } from 'history';
import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';
import { Button } from '../styled/Button';
import {
  ActionContainer,
  DeleteBtn,
  H2Margin,
} from './ModelAssetClass/AssetClass';

interface Props {
  when?: boolean | undefined;
  navigate: (path: string) => void;
}

const RouteLeavingPrompt = ({ when, navigate }: Props) => {
  const [dialog, setDialog] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (confirm && lastLocation) {
      // Navigate to the previous blocked location
      navigate(lastLocation.pathname);
    }
  }, [confirm, lastLocation]);

  const handleBlockedNavigation = (nextLocation: any, action: any) => {
    if (!confirm) {
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
        <H2Margin>
          You have unsaved changes. Are you sure you want to leave this page
          without saving?{' '}
        </H2Margin>
        <ActionContainer>
          <DeleteBtn onClick={handleConfirmNavigationClick}>Confirm</DeleteBtn>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
        </ActionContainer>
      </Dialog>
    </>
  );
};
export default RouteLeavingPrompt;
