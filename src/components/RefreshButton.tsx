import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reloadEverything } from '../actions';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { selectLoggedIn } from '../selectors';
import { selectSelectedAccounts } from '../selectors/performance';

export const Button = styled.button`
  color: #fff;
  font-size: 16px;
  padding: 10px 28px 10px 10px;
  display: block;
  float: right;
  background: none;
  text-transform: none;
  svg {
    margin-right: 5px;
  }
  &:hover {
    color: var(--brand-blue);
  }
`;

const RefreshButton = () => {
  const loggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();
  const selectedAccounts = useSelector(selectSelectedAccounts);
  return (
    <React.Fragment>
      {loggedIn && (
        <Button
          onClick={() => {
            dispatch(
              reloadEverything(selectedAccounts.map((a: any) => a?.value)),
            );
          }}
        >
          <FontAwesomeIcon icon={faSyncAlt} />
          Refresh
        </Button>
      )}
    </React.Fragment>
  );
};

export default RefreshButton;
