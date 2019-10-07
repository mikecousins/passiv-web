import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import AccountGroup from './AccountGroup';
import { deleteData, putData, postData } from '../../api';
import { H2, A, Edit, H3, P, DisabledBox } from '../../styled/GlobalElements';
import { selectCanCrossAccountBalance } from '../../selectors/subscription';
import { loadAccounts, loadGroups } from '../../actions';
import { Button } from '../../styled/Button';
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

export const PaddedP = styled(P)`
  padding-top: 20px;
`;

const Accounts = () => {
  const accounts = useSelector(selectGroupedAccounts);
  const [localAccounts, setLocalAccounts] = useState(accounts);
  const [isEditing, setIsEditing] = useState(false);
  const canCrossAccountBalance = useSelector(selectCanCrossAccountBalance);
  const dispatch = useDispatch();

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

  const getListStyle = (isDraggingOver: boolean, fake: boolean = false) => ({
    padding: 8,
    marginBottom: 20,
    border: fake
      ? '1px dashed #2a2d34'
      : isDraggingOver
      ? '2px solid #2a2d34'
      : '1px solid #2a2d34',
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

    const newList: Group[] = Array.from(localAccounts);
    const sourceList = newList.find(
      group => group.groupId === result.source.droppableId,
    );
    const destList = newList.find(
      group => group.groupId === result.destination!.droppableId,
    );

    if (sourceList) {
      const [moved] = sourceList.accounts.splice(result.source.index, 1);
      const newAccount = {
        ...moved,
        portfolio_group: result.destination!.droppableId,
      };

      if (destList) {
        destList.accounts.splice(result.destination.index, 0, moved);
        putData(`/api/v1/accounts/${moved.id}`, newAccount)
          .then(() => {
            dispatch(loadAccounts());
            dispatch(loadGroups());
            toast.success('Moved the account successfully');
          })
          .catch(() => {
            dispatch(loadAccounts());
            dispatch(loadGroups());
            toast.error('Failed to move the account');
          });
      } else if (result.destination.droppableId === 'new') {
        postData('/api/v1/portfolioGroups', { name: 'New Group' }).then(
          newGroup => {
            newAccount.portfolio_group = newGroup.data[0].id;
            putData(`/api/v1/accounts/${moved.id}`, newAccount)
              .then(() => {
                dispatch(loadAccounts());
                dispatch(loadGroups());
                toast.success('Moved the account successfully');
              })
              .catch(() => {
                dispatch(loadAccounts());
                dispatch(loadGroups());
                toast.error('Failed to move the account');
              });
          },
        );
      }
    }

    setLocalAccounts(newList);
  };

  if (!localAccounts) {
    return null;
  }

  return (
    <React.Fragment>
      <Header>
        <H2>Accounts</H2>
        {isEditing ? (
          <A onClick={() => setIsEditing(false)}>
            <FontAwesomeIcon icon={faCheck} />
            Done
          </A>
        ) : (
          <React.Fragment>
            <Edit
              onClick={() => setIsEditing(true)}
              disabled={!canCrossAccountBalance}
            >
              <FontAwesomeIcon icon={faPen} />
              Edit Groups
            </Edit>
            {!canCrossAccountBalance && (
              <DisabledBox>
                Editing account groups is an Elite feature, subscribe to access
                it!
              </DisabledBox>
            )}
          </React.Fragment>
        )}
      </Header>
      <PaddedP>
        Passiv lets you organize your investment accounts into groups, where
        each group has its own target portfolio. By default, each account gets
        its own group. Drag and drop to reorganize.
      </PaddedP>
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
                  {group.accounts.length > 0 ? (
                    <React.Fragment>
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
                              <AccountRow account={account} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {group.accounts.length === 0 &&
                        !snapshot.isDraggingOver && <H3>Empty group</H3>}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <span>There are no accounts in this group</span>
                      <Button
                        onClick={() => {
                          deleteData(`/api/v1/portfolioGroups/${group.groupId}`)
                            .then(() => {
                              dispatch(loadGroups());
                            })
                            .catch(() => {
                              dispatch(loadGroups());
                            });
                        }}
                      >
                        Delete
                      </Button>
                    </React.Fragment>
                  )}
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
                style={getListStyle(snapshot.isDraggingOver, true)}
              >
                <AccountGroup name="New Group"></AccountGroup>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </React.Fragment>
  );
};

export default Accounts;
