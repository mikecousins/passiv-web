import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import SideBarLink from './SideBarLink';
import { useSelector } from 'react-redux';

import RefreshButton from './../RefreshButton';
import styled from '@emotion/styled';
import { HELP_PATH } from '../../apps/Paths';
import PreLoadLink from '../PreLoadLink';
import { selectGroups } from '../../selectors/groups';

import {
  DASHBOARD_PATH,
  GOALS_PATH,
  GROUP_PATH,
  LOGIN_PATH,
  REFERRALS_PATH,
  REGISTER_PATH,
  REPORTING_PATH,
  RESET_PASSWORD_PATH,
  SETTINGS_PATH,
} from '../../apps/Paths';

export const SubMenu = styled.div`
  position: absolute;
  padding: 0 6px 6px;
  background: var(--brand-black);
  transition: 0.5s all;
  z-index: 3;
  width: 500px;
  transform: translateY(-49.44px);

  &.hide {
    visibility: hidden;
    overflow: hidden;
    left: -288px;
    aside {
      overflow: hidden;
    }
  }
  &.show {
    left: 212px;
  }
  @media (max-width: 900px) {
    text-align: left;
    z-index: 2;
    &.hide {
      width: 0;
      left: -200px;
    }
    &.show {
      left: 0;
      top: -32px;
      margin: 0;
      padding: 80px 20px 0;
      width: 100vw;
      height: 100vh;
    }
  }
`;
const GroupContainer = styled.div`
  margin-bottom: 10px;
  text-transform: none;
  font-weight: 500;
  a {
    font-size: 16px;
    padding: 10px 15px 10px 20px;
    margin: 3px 0 3px;
    font-weight: 300;
  }
`;
export const Button = styled.button`
  text-align: left;
  @media (max-width: 900px) {
    color: #fff;
    padding: 15px 15px 30px 10px;
    width: 100%;
    text-transform: uppercase;
    font-weight: 700;
    &:before {
      border: solid #fff;
      content: '';
      border-width: 0 0 2px 2px;
      display: inline-block;
      padding: 2.5px;
      position: absolute;
      left: 22px;

      transform: rotate(45deg) translateY(6px);
      -webkit-transform: rotate(45deg) translateY(6px);
    }
  }
`;

export const SubTitle = styled.div`
  visibility: hidden;
  @media (max-width: 900px) {
    visibility: visible;
    color: var(--brand-green);
    padding: 10px 16px 10px 20px;
    width: 100%;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 20px;
  }
`;

export const Help = styled.div`
  display: inline-block;
  padding: 80px 0;
  text-transform: none;

  &:hover {
    svg,
    a {
      color: var(--brand-blue);
    }
  }
  svg {
    margin-right: 5px;
  }
  a {
    display: block;
    padding: 10px 15px 10px 20px;
    font-size: 16px;
    font-weight: 500;
    max-width: 270px;
    color: var(--brand-green);
    span {
      position: absolute;
      left: 8px;
      font-family: mono;
      font-size: 16px;
      font-weight: 800;
      &:before {
        position: absolute;
        top: -14px;
        left: 1px;
        border-top: 12px solid var(--brand-green);
        border-bottom: 28px solid var(--brand-green);
        height: 60px;
        width: 2px;
        content: '';
      }
    }
    @media (max-width: 900px) {
      margin: 0;
      text-align: left;
    }
  }
`;

type Props = {
  menuVisibility: boolean;
};

const SideBarSubMenu = ({ menuVisibility }: Props) => {
  const groups = useSelector(selectGroups);

  let groupList: JSX.Element | JSX.Element[] = (
    <FontAwesomeIcon icon={faSpinner} spin />
  );

  if (groups) {
    groupList = groups.map((group) => {
      return (
        <React.Fragment key={group.id}>
          <SideBarLink
            key={group.id}
            name={group.name}
            linkPath={`${GROUP_PATH}/${group.id}`}
            rebalance={!!group.rebalance}
            hasAccounts={group.hasAccounts}
            loading={group.loading}
            setupComplete={group.setupComplete}
            spinnerLoading={true}
            hideArrow={true}
          />
          {group.hasAccounts &&
            group.accounts.map((account) => (
              <SideBarLink
                key={account.id}
                name={account.name}
                linkPath={`${GROUP_PATH}/${group.id}/account/${account.id}`}
                hideArrow={true}
                indent={true}
              />
            ))}
        </React.Fragment>
      );
    });
  }

  return (
    <SubMenu className={menuVisibility ? 'show' : 'hide'}>
      <Button type="button" role="button">
        Back
      </Button>
      <SubTitle>
        <h2>Portfolios</h2>
      </SubTitle>
      {groups && groups.length > 0 && (
        <GroupContainer
          className={groups.length > 2 ? 'tour-hide_accounts' : ''}
        >
          {groupList}
        </GroupContainer>
      )}
      <Help>
        <a>
          <span>i</span>Want to learn more about multi-account groups?
        </a>
      </Help>
    </SubMenu>
  );
};

export default SideBarSubMenu;
