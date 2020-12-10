import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putData } from '../../api';
import { selectCurrentAccount } from '../../selectors/groups';
import styled from '@emotion/styled';
import { Table } from '../../styled/GlobalElements';
import { toast } from 'react-toastify';
import { Account } from '../../types/account';
import NameInputAndEdit from '../NameInputAndEdit';
import { loadAccounts } from '../../actions';

const MetaContainer = styled.div`
  text-align: right;
`;

const NameContainer = styled.div`
  padding-bottom: 0px;
  font-size: 40px;
  text-align: left;
  margin-bottom: 30px;
  position: relative;
  @media (max-width: 900px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
  input {
    font-size: 30px;
    border-top: none;
    border-right: none;
    border-left: none;
    padding-left: 0;
    margin-bottom: 0;
  }
  button {
    font-size: 18px;
    margin: 0 5px;
    min-width: 70px;
    @media (min-width: 900px) {
      top: 0;
    }
  }
`;

type Props = {
  name: string;
};

const AccountName = ({ name }: Props) => {
  const account = useSelector(selectCurrentAccount);
  const [newName, setNewName] = useState(name);
  const [editing, setEditing] = useState(false);

  const inputEl = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setNewName(name);
    setEditing(false);
  }, [name]);

  useEffect(() => {
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  }, [editing, inputEl]);

  const finishEditingName = () => {
    if (account && newName !== name && newName.trim().length > 0) {
      const newAccount: Account = { ...account };
      newAccount.name = newName;
      putData(`/api/v1/accounts/${newAccount.id}/`, newAccount)
        .then(() => {
          dispatch(loadAccounts());
        })
        .catch(() => {
          toast.error('Failed to edit group name');
          setNewName(name);
        });
    } else if (newName.trim().length === 0) {
      toast.error('Failed to edit group name');
      setNewName(name);
    }
    setEditing(false);
  };

  return (
    <MetaContainer>
      <Table>
        <NameInputAndEdit
          value={newName}
          edit={editing}
          StyledContainer={NameContainer}
          onChange={(event: any) => setNewName(event.target.value)}
          onKeyPress={(e: any) => e.key === 'Enter' && finishEditingName()}
          onClickDone={() => finishEditingName()}
          onClickEdit={() => setEditing(true)}
        />
      </Table>
    </MetaContainer>
  );
};

export default AccountName;
