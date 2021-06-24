import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContextualMessages } from '../selectors';
import { loadSettings } from '../actions';
import { Button } from '../styled/Button';
import styled from '@emotion/styled';
import { postData } from '../api';
import { toast } from 'react-toastify';

const ButtonContainer = styled.div`
  text-align: right;
`;

const PaddedButton = styled(Button)`
  margin-right: 10px;
`;

type Props = {
  name: string;
  text?: string;
  children?: any;
};

export const HideButton = ({ name, text }: Props) => {
  const dispatch = useDispatch();
  return (
    <ButtonContainer>
      <PaddedButton
        onClick={() => {
          postData(`/api/v1/contextualMessages`, {
            name: [name],
          })
            .then((response) => {
              dispatch(loadSettings());
            })
            .catch((error) => {
              toast.error(`Failed to hide contextual message "${name}"`);
            });
        }}
      >
        {text !== undefined ? text : 'Hide'}
      </PaddedButton>
    </ButtonContainer>
  );
};

export const ContextualMessageWrapper = ({ name, children }: Props) => {
  const messages = useSelector(selectContextualMessages);

  if (messages && messages.some((messageName) => messageName === name)) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return null;
};
