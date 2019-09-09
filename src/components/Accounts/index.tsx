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

const reorder = (list: Account[][], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Accounts = () => {
  const accounts = useSelector(selectAccounts);
  const [groupedAccounts, setGroupedAccounts] = useState<Account[][]>();

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
    const groupedAccounts: Account[][] = [];
    accounts.forEach(account => {
      let lastGroup = '';
      if (groupedAccounts.length > 0) {
        lastGroup =
          groupedAccounts[groupedAccounts.length - 1][0].portfolio_group;
      }

      if (account.portfolio_group === lastGroup) {
        groupedAccounts[groupedAccounts.length - 1].push(account);
      } else {
        groupedAccounts.push([account]);
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

    const newList = reorder(
      groupedAccounts,
      result.source.index,
      result.destination.index,
    );

    setGroupedAccounts(newList);
  };

  if (!accounts || accounts.length === 0 || !groupedAccounts) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {groupedAccounts.map(group => (
        <Droppable
          droppableId={group[0].portfolio_group}
          key={group[0].portfolio_group}
        >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <AccountGroup name={group[0].portfolio_group}>
                {group.map((account, index) => (
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
