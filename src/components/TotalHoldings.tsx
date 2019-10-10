import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import { selectSettings } from '../selectors';
import { selectTotalGroupHoldings } from '../selectors/groups';
import Number from './Number';
import { putData } from '../api';
import { loadSettings } from '../actions';

export const TotalContainer = styled.div`
  text-align: right;
  margin-bottom: 22px;
  padding: 10px 0 20px;
  @media (max-width: 900px) {
    padding: 10px 0;
  }
  span {
    font-size: 36px;
    font-weight: 500;
    letter-spacing: 0.8px;
    color: #000a12;
  }

  h2 {
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 0.8px;
    text-align: right;
    color: #787878;
    display: block;
    margin-bottom: 12px;
    text-transform: uppercase;
  }
`;

export const TotalHoldings = () => {
  const totalHoldings = useSelector(selectTotalGroupHoldings);
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();
  let displayTotal = <FontAwesomeIcon icon={faSpinner} spin />;
  if (totalHoldings !== null) {
    displayTotal = <Number value={totalHoldings} currency />;
  }
  return (
    <TotalContainer>
      <h2>Total Holdings</h2>
      <span>{displayTotal}</span>
      <Menu>
        <MenuButton>CAD</MenuButton>
        <MenuList>
          <MenuItem
            onSelect={() => {
              settings.preferred_currency = 'USD';
              putData('/api/v1/settings/', settings)
                .then(() => {
                  dispatch(loadSettings());
                })
                .catch(() => {
                  dispatch(loadSettings());
                });
            }}
          >
            USD
          </MenuItem>
        </MenuList>
      </Menu>
    </TotalContainer>
  );
};

export default TotalHoldings;
