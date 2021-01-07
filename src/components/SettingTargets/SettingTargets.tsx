import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import ShadowBox from '../../styled/ShadowBox';
import { loadModelPortfolios } from '../../actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postData } from '../../api';
import styled from '@emotion/styled';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import { useSelector } from 'react-redux';
import { selectModelPortfolios } from '../../selectors/modelPortfolios';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import { selectGroups } from '../../selectors/groups';
import { H1, H2, Table } from '../../styled/GlobalElements';

const StyledMenuButton = styled(MenuButton)`
  border: 1px solid var(--brand-blue);
  padding: 20px;
  color: var(--brand-blue);
  font-size: 18px;
  font-weight: 900;
`;

const StyledMenuList = styled(MenuList)`
  padding: 22px;
`;

const StyledMenuItem = styled(MenuItem)`
  color: var(--brand-blue);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const NewModelBtn = styled.button`
  font-size: 18px;
  font-weight: 600;
`;

const GreyBox = styled.div`
  background: #f1f1f1;
  padding: 20px;
  margin-bottom: 20px;
  line-height: 2rem;
  @media (max-width: 900px) {
    padding: 15px;
  }
`;

const SettingTargets = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const groups = useSelector(selectGroups);
  const modelPortfolios: ModelPortfolioDetailsType[] = useSelector(
    selectModelPortfolios,
  );

  const handleNewModelBtn = () => {
    postData('/api/v1/modelPortfolio/', {})
      .then((res: any) => {
        const id = res.data.model_portfolio.id;
        history.replace(`model-portfolio/${id}`);
        dispatch(loadModelPortfolios());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let toBeLoaded;
  if (showGroupDetails) {
    toBeLoaded = (
      <Menu>
        <StyledMenuButton>
          Securities Default
          <span aria-hidden style={{ marginLeft: '20px' }}>
            <FontAwesomeIcon icon={faAngleDown} size="lg" />
          </span>
        </StyledMenuButton>
        <StyledMenuList>
          {modelPortfolios.map((mdl) => {
            return (
              <StyledMenuItem
                onSelect={() =>
                  history.replace(`model-portfolio/${mdl.model_portfolio.id}`)
                }
                key={mdl.model_portfolio.id}
              >
                {mdl.model_portfolio.name}
              </StyledMenuItem>
            );
          })}
          <NewModelBtn onClick={handleNewModelBtn}>
            <FontAwesomeIcon
              icon={faPlus}
              size="sm"
              style={{ marginRight: '5px' }}
            />
            Create New Model
          </NewModelBtn>
        </StyledMenuList>
      </Menu>
    );
  } else {
    toBeLoaded = (
      <>
        <H1 style={{ marginBottom: '20px' }}>Select Portfolio Group</H1>
        {groups
          ? groups.map((group) => {
              return (
                <GreyBox key={group.id}>
                  <Table>
                    <H2 style={{ fontWeight: 400 }}>{group.name}</H2>{' '}
                    <span style={{ fontWeight: 600 }}>
                      ({group.accounts.length} Account)
                    </span>
                    <div>
                      <span style={{ fontWeight: 600 }}>Target By:</span>{' '}
                      Securities
                    </div>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      size="2x"
                      color="var(--brand-blue)"
                      cursor="pointer"
                      onClick={() => setShowGroupDetails(true)}
                    />
                  </Table>
                </GreyBox>
              );
            })
          : null}
      </>
    );
  }

  return <ShadowBox> {toBeLoaded}</ShadowBox>;
};

export default SettingTargets;
