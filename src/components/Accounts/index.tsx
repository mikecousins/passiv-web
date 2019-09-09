import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { selectAccounts } from '../../selectors/accounts';
import AccountRow from './AccountRow';
import AddPortfolioGroup from './AddPortfolioGroup';
import { Account } from '../../types/account';
import AccountGroup from './AccountGroup';
import { putData } from '../../api';
import { toast } from 'react-toastify';

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
});

type Group = {
  groupId: string;
  accounts: Account[];
};

const Accounts = () => {
  const accounts = useSelector(selectAccounts);
  const [groupedAccounts, setGroupedAccounts] = useState<Group[]>();

  // group our accounts
  useEffect(() => {
    // sort by group
    accounts.sort((a, b) => {
      if (a.portfolio_group < b.portfolio_group) {
        return -1;
      }
      if (a.portfolio_group > b.portfolio_group) {
        return 1;
      }
      return 0;
    });

    // create nested array by group
    const groupedAccounts: Group[] = [];
    accounts.forEach(account => {
      let lastGroup = '';
      if (groupedAccounts.length > 0) {
        lastGroup = groupedAccounts[groupedAccounts.length - 1].groupId;
      }

      if (account.portfolio_group === lastGroup) {
        groupedAccounts[groupedAccounts.length - 1].accounts.push(account);
      } else {
        groupedAccounts.push({
          groupId: account.portfolio_group,
          accounts: [account],
        });
      }
    });
    setGroupedAccounts(groupedAccounts);
  }, [accounts]);

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (!groupedAccounts) {
      return;
    }

    const newList: Group[] = Array.from(groupedAccounts);
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

    setGroupedAccounts(newList);

    const setPortfolioGroup = () => {};
  };

  if (!accounts || accounts.length === 0 || !groupedAccounts) {
    return null;
  }

  // TODO disable drag and drop if non-paying or on mobile
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {groupedAccounts.map(group => (
        <Droppable droppableId={group.groupId} key={group.groupId}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <AccountGroup name={group.groupId}>
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
