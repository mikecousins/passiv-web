import styled from '@emotion/styled';
import { faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectModelPortfolios } from '../selectors/modelPortfolios';
import { Button } from '../styled/Button';
import { H1, H3, Table } from '../styled/GlobalElements';
import Grid from '../styled/Grid';
import { ViewBtn } from '../styled/Group';
import ShadowBox from '../styled/ShadowBox';
import { ModelPortfolioDetailsType } from '../types/modelPortfolio';
import { StyledP } from './ModelAssetClassPage';
import { postData } from '../api';
import { loadModelPortfolios } from '../actions';

const TransparentButton = styled(Button)`
  background-color: transparent;
  color: var(--brand-blue);
  border: 3px solid var(--brand-blue);
  padding: 20px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 18px;
`;
const StyledViewBtn = styled(ViewBtn)`
  width: 100%;
  text-align: center;
`;
const NewModelButton = styled(Button)`
  padding: 23px 50px;
  font-weight: 600;
  font-size: 18px;
`;
const ModelName = styled(H3)`
  font-size: 22px;
  font-weight: 600;
`;
const InUseDiv = styled.div`
  font-size: 20px;
`;
const InUse = styled.span`
  font-weight: 600;
  margin-right: 7px;
`;

const MyModelPortfoliosPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  return (
    <React.Fragment>
      <H1>Model Portfolios</H1>
      <Table>
        <StyledP>
          A model portfolio is a group of assets and target allocations that are
          designed to meet a particular investing goal.
        </StyledP>
        <div>
          {' '}
          <TransparentButton onClick={() => history.replace('asset-class')}>
            Edit Asset Classes
          </TransparentButton>
          <NewModelButton onClick={() => handleNewModelBtn()}>
            New Model
          </NewModelButton>
        </div>
      </Table>
      <div style={{ marginTop: '50px' }}>
        {modelPortfolios.map((mdl) => {
          return (
            <ShadowBox key={mdl.model_portfolio.id}>
              <Grid columns="4fr 2fr 1fr">
                <ModelName>{mdl.model_portfolio.name}</ModelName>
                {/* TODO: check if 'in use' and then show this  */}
                <InUseDiv>
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="lg"
                    style={{ marginRight: '8px', color: 'var(--brand-green)' }}
                  />
                  <InUse>In Use</InUse> | 2 Groups
                </InUseDiv>
                <StyledViewBtn>
                  <Link to={`model-portfolio/${mdl.model_portfolio.id}`}>
                    View
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Link>
                </StyledViewBtn>
              </Grid>
            </ShadowBox>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default MyModelPortfoliosPage;
