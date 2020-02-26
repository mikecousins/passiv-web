import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faSortDown,
  faSortUp,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { selectIsDemo } from '../selectors';
import { loadAuthorizations } from '../actions';
import { putData } from '../api';
import { Table, H3, P, A, Edit } from '../styled/GlobalElements';
import { InputNonFormik } from '../styled/Form';
import ConnectionAccounts from './ConnectionAccounts';
import ConnectionUpdate from './ConnectionUpdate';
import ConnectionDelete from './ConnectionDelete';

const InputContainer = styled.div`
  padding-bottom: 20px;
  font-size: 18px;
`;

const Brokerage = styled.div`
  min-width: 22%;
`;

const Name = styled.div`
  min-width: 36%;
`;

const Read = styled.div`
  min-width: 14%;
  text-align: center;
`;

const Trade = styled.div`
  min-width: 14%;
  text-align: center;
`;

const EditToggle = styled.div`
  min-width: 14%;
  text-align: center;
`;

const Connection = styled.div`
  border-top: 1px solid #eee;
  margin-top: 10px;
  padding-top: 10px;
  &:first-of-type {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const ConnectionActions = styled.div`
  margin: 20px 0 20px;
  background: #deeaff;
  padding: 20px;
  border-radius: 4px;
  h3 {
    line-height: 1.2;
    margin-bottom: 15px;
  }
  div div {
    min-width: 33%;
  }
`;

type Props = {
  authorization: any;
};

const ConnectionsAuthorization = ({ authorization }: Props) => {
  const [showMore, setShowMore] = useState(false);
  const [nameEditing, setNameEditing] = useState(false);
  const [authorizationName, setAuthorizationName] = useState(
    authorization.name,
  );

  const isDemo = useSelector(selectIsDemo);

  const dispatch = useDispatch();

  const finishEditing = () => {
    if (authorizationName !== authorization.name) {
      let newAuthorization = Object.assign({}, authorization);
      newAuthorization.name = authorizationName;
      putData(`/api/v1/authorizations/${authorization.id}`, newAuthorization)
        .then(() => {
          dispatch(loadAuthorizations());
        })
        .catch(() => {
          dispatch(loadAuthorizations());
        });
    }
    setNameEditing(false);
  };

  return (
    <React.Fragment>
      <Connection>
        <Table>
          <Brokerage>
            <H3>Brokerage</H3>
            <P>{authorization.brokerage.name}</P>
          </Brokerage>
          <Name>
            <H3>Name</H3>
            {!nameEditing ? (
              <P>
                {authorizationName}
                <Edit onClick={() => setNameEditing(true)} disabled={isDemo}>
                  <FontAwesomeIcon icon={faPen} />
                  Edit
                </Edit>
              </P>
            ) : (
              <InputContainer>
                <InputNonFormik
                  value={authorizationName}
                  onChange={e => setAuthorizationName(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      finishEditing();
                    }
                  }}
                />
                <Edit onClick={() => finishEditing()}>
                  <FontAwesomeIcon icon={faCheck} />
                  Done
                </Edit>
              </InputContainer>
            )}
          </Name>
          <Read>
            <H3>Read</H3>
            <P>
              {' '}
              {authorization.type === 'read' ||
              authorization.type === 'trade' ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faTimes} />
              )}
            </P>
          </Read>
          <Trade>
            <H3>Trade</H3>
            <P>
              {' '}
              {authorization.type === 'trade' ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faTimes} />
              )}
            </P>
          </Trade>
          <EditToggle>
            <H3>Edit</H3>
            <A>
              <FontAwesomeIcon
                icon={showMore ? faSortUp : faSortDown}
                onClick={() => setShowMore(!showMore)}
              />
            </A>
          </EditToggle>
        </Table>
      </Connection>

      {showMore && (
        <ConnectionActions>
          <Table>
            <ConnectionAccounts authorizationId={authorization.id} />
            <ConnectionUpdate authorization={authorization} isDemo={isDemo} />
            <ConnectionDelete authorization={authorization} isDemo={isDemo} />
          </Table>
        </ConnectionActions>
      )}
    </React.Fragment>
  );
};

export default ConnectionsAuthorization;
