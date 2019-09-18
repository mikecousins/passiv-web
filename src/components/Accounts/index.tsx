import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { selectGroupedAccounts, Group } from '../../selectors/groups';
import AccountRow from './AccountRow';
import AddPortfolioGroup from './AddPortfolioGroup';
import AccountGroup from './AccountGroup';
import { putData } from '../../api';
import { H2, A, Edit } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import { selectCanCrossAccountBalance } from '../../selectors/subscription';
import styled from '@emotion/styled';

export const Header = styled.form`
  h2 {
    display: inline-block;
  }
  a {
    margin-left: 14px;
  }
  svg {
    margin-right: 3px;
  }
`;

const Accounts = () => {
  const accounts = useSelector(selectGroupedAccounts);
  const [localAccounts, setLocalAccounts] = useState(accounts);
  const [isEditing, setIsEditing] = useState(false);
  const canCrossAccountBalance = useSelector(selectCanCrossAccountBalance);

  // when we get new accounts back from the server, reset our accounts
  useEffect(() => setLocalAccounts(accounts), [accounts]);

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: `1px 20px 7px`,
    margin: `0 0 8px 0`,

    // change background colour if dragging
    background: isDragging ? '#b5f3e8' : '#F1F1F1',

    borderRight: isEditing ? `18px solid #03a287` : `none`,

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    padding: 8,
    marginBottom: 20,
    border: `1px solid #2a2d34`,
    marginTop: 40,
  });

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (!localAccounts) {
      return;
    }

    if (result.destination.droppableId === 'new') {
      // TODO add logic to handle this
    }

    const newList: Group[] = Array.from(localAccounts);
    const sourceList = newList.find(
      group => group.groupId === result.source.droppableId,
    );
    const destList = newList.find(
      group => group.groupId === result.destination!.droppableId,
    );
    if (sourceList && destList) {
      const [moved] = sourceList.accounts.splice(result.source.index, 1);
      destList.accounts.splice(result.destination.index, 0, moved);

      const newAccount = {
        ...moved,
        portfolio_group: result.destination!.droppableId,
      };
      putData(`/api/v1/accounts/${moved.id}`, newAccount)
        .then(() => {
          toast.success('Moved the account successfully');
        })
        .catch(() => {
          toast.error('Failed to move the account');
        });
    }

    setLocalAccounts(newList);
  };

  if (!localAccounts) {
    return null;
  }

  return (
    <React.Fragment>
      <Header>
        <H2>Accounts&nbsp;</H2>
        {isEditing ? (
          <A onClick={() => setIsEditing(false)}>
            <FontAwesomeIcon icon={faCheck} />
            Done
          </A>
        ) : (
          <Edit
            onClick={() => setIsEditing(true)}
            disabled={!canCrossAccountBalance}
          >
            <FontAwesomeIcon icon={faPen} />
            Edit Groups
          </Edit>
        )}
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        {localAccounts.map(group => (
          <Droppable droppableId={group.groupId} key={group.groupId}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <AccountGroup name={group.name}>
                  {group.accounts.map((account, index) => (
                    <Draggable
                      key={account.id}
                      draggableId={account.id}
                      index={index}
                      isDragDisabled={!isEditing}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                          )}
                        >
                          <AccountRow
                            account={account}
                            isDraggable={isEditing}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </AccountGroup>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
        {isEditing && (
          <Droppable droppableId="new" key="new">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <AccountGroup name="New Group"></AccountGroup>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
        <AddPortfolioGroup />
      </DragDropContext>
    </React.Fragment>
  );
};

export default Accounts;
