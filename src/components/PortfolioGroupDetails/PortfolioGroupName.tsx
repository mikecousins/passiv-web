import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { patchData } from '../../api';
import { selectCurrentGroup } from '../../selectors/groups';
import styled from '@emotion/styled';
import { Table } from '../../styled/GlobalElements';
import { toast } from 'react-toastify';
import { GroupData } from '../../types/group';
import { loadGroupsList } from '../../actions';
import NameInputAndEdit from '../NameInputAndEdit';

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

const PortfolioGroupName = ({ name }: Props) => {
  const group = useSelector(selectCurrentGroup);
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
    if (group && newName !== name && newName.trim().length > 0) {
      const newGroup: GroupData = { ...group };
      newGroup.name = newName;
      patchData(`/api/v1/portfolioGroups/${newGroup.id}/`, newGroup)
        .then(() => {
          dispatch(loadGroupsList());
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

export default PortfolioGroupName;
