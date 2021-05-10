import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { reloadEverything, loadBrokerages } from '../actions';
import { deleteData } from '../api';
import { DeleteButton } from '../styled/DeleteButton';
import { Button } from '../styled/Button';
import { H3, P } from '../styled/GlobalElements';

const ConnectionsDelete = styled.div`
  text-align: right;
`;

type Props = {
  authorization: any;
  isDemo: boolean;
};

export const ConnectionDelete = ({ authorization, isDemo }: Props) => {
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();

  const confirmDelete = (authorization: any) => {
    deleteData(`/api/v1/authorizations/${authorization.id}`)
      .then(() => {
        setDeleting(false);
        dispatch(loadBrokerages());
        dispatch(reloadEverything());
      })
      .catch(() => {
        setDeleting(false);
        dispatch(loadBrokerages());
        dispatch(reloadEverything());
      });
  };

  return (
    <ConnectionsDelete>
      <H3>Delete Connection</H3>
      {deleting ? (
        <React.Fragment>
          <P>
            Are you sure you want to delete this connection? All related
            accounts and groups associated with this connection will also be
            removed.
          </P>
          <Button
            onClick={() => {
              setDeleting(false);
            }}
          >
            Cancel
          </Button>
          <DeleteButton
            onClick={() => {
              confirmDelete(authorization);
            }}
            disabled={isDemo}
          >
            Yes
          </DeleteButton>
        </React.Fragment>
      ) : (
        <DeleteButton
          onClick={() => {
            setDeleting(true);
          }}
          disabled={isDemo}
        >
          Delete
        </DeleteButton>
      )}
    </ConnectionsDelete>
  );
};

export default ConnectionDelete;
