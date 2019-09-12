import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { selectGroupedAccounts, Group } from '../../selectors/groups';
import AccountRow from './AccountRow';
import AddPortfolioGroup from './AddPortfolioGroup';
import AccountGroup from './AccountGroup';
import { putData } from '../../api';

const Accounts = () => {
  const accounts = useSelector(selectGroupedAccounts);
  const [localAccounts, setLocalAccounts] = useState(accounts);

  // when we get new accounts back from the server, reset our accounts
  useEffect(() => setLocalAccounts(accounts), [accounts]);

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 16,
    margin: `0 0 8px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
  });

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (!localAccounts) {
      return;
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

  // TODO disable drag and drop if non-paying
  return (
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
                        <AccountRow account={account} />
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
      <AddPortfolioGroup />
    </DragDropContext>
  );
};

export default Accounts;
