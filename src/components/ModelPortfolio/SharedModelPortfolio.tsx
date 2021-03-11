import React from 'react';
import styled from '@emotion/styled';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import ShadowBox from '../../styled/ShadowBox';
import { ResponsiveGrid } from './ModelPortfolio';
import { Box, StyledContainer, StyledName } from './ModelPortfolioBox';
import Grid from '../../styled/Grid';
import { PieChart } from 'react-minimal-pie-chart';
import { H1, H3 } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import { Link, useHistory } from 'react-router-dom';
import Tooltip from '../Tooltip';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectShowSecureApp } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../api';
import { loadModelPortfolios } from '../../actions';
import { toast } from 'react-toastify';
import { StyledP } from '../../pages/ModelAssetClassPage';

import shareModelImage from '../../assets/images/shareModelImage.png';

const ImageContainer = styled.div`
  background: url(${shareModelImage}) no-repeat;
  background-size: contain;
`;

const ListOfSecurities = styled.div`
  margin: 20px;
  @media (max-width: 900px) {
    margin: 10px;
  }
`;

const Security = styled.div`
  border-right: 5px solid ${(props) => props.color};
  line-height: 30px;
  padding: 10px;
  margin-bottom: 20px;
  height: 35px;
`;

const Symbol = styled.span`
  font-size: 18px;
`;

const Percent = styled.span`
  font-size: 20px;
  font-weight: 900;
  margin-left: 12px;
  float: right;
`;

const ActionBox = styled.div`
  border: 1px solid #2a2d34;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 15px;
  max-height: 370px;
`;

const AboutPassiv = styled.div`
  margin: 20px 0;
  font-size: 18px;
  line-height: 21px;
`;

const SignUpBtn = styled(Button)`
  width: 187px;
  margin-bottom: 20px;
`;

const Clone = styled.div`
  a {
    font-size: 18px;
    color: #003ba2;
    font-weight: 700;
  }
`;

type Props = {
  model: ModelPortfolioDetailsType;
  shareId: string;
};
const SharedModelPortfolio = ({ model, shareId }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const showSecureApp = useSelector(selectShowSecureApp);

  const orderedSecurities = model.model_portfolio_security.sort(
    (a, b) => +b.percent - +a.percent,
  );

  const firstFive = orderedSecurities.slice(0, 5);

  const otherSecurities = orderedSecurities.slice(5);

  const otherSecuritiesTotal = otherSecurities
    .reduce((add: number, security) => {
      add = add + +security.percent;
      return add;
    }, 0)
    .toFixed(3);

  const othersList = otherSecurities
    .map((security) => {
      return `${security.symbol.symbol}: ${security.percent}`;
    })
    .join(', ');

  const colors = ['#0A6167', '#008F77', '#033EBC', '#002B3E', '#002668'];

  const coloredSecurity = firstFive.map((security: any, index) => {
    security.color = colors[index];
    return security;
  });

  const pieChartData = coloredSecurity.map((security) => {
    return {
      title: security.symbol.symbol,
      value: +security.percent,
      color: security.color,
    };
  });

  pieChartData.push({
    title: othersList,
    value: +otherSecuritiesTotal,
    color: '#2A2D34',
  });

  const cloneModel = () => {
    // create a new model
    postData('api/v1/modelPortfolio', {})
      .then((res) => {
        const modelId = res.data.model_portfolio.id;
        model.model_portfolio.share_portfolio = false;
        model.model_portfolio.total_assigned_portfolio_groups = 0;
        // post new data to it
        postData(`api/v1/modelPortfolio/${modelId}`, model)
          .then(() => {
            dispatch(loadModelPortfolios());
            history.push(`/app/models`);
          })
          .catch((err) => {
            toast.error('Unable to clone model.');
          });
      })
      .catch(() => toast.error('Unable to clone model.'));
  };

  return (
    <>
      <H1>Shared Model *</H1>
      <StyledP>
        A model portfolio is a group of assets and target allocations that are
        designed to meet a particular investing goal.
      </StyledP>
      <ShadowBox>
        <ResponsiveGrid columns={'4fr 2fr'} style={{ marginTop: '20px' }}>
          <Box>
            <StyledContainer>
              <StyledName>{model.model_portfolio.name}</StyledName>
            </StyledContainer>
            <Grid columns="auto 300px">
              <PieChart
                data={pieChartData}
                style={{ height: '270px', maxWidth: '350px' }}
                lineWidth={40}
                paddingAngle={2}
                animate
              />
              <ListOfSecurities>
                {coloredSecurity.map((security) => {
                  return (
                    <Security key={security.symbol.id} color={security.color}>
                      <div>
                        <Symbol>{security.symbol.symbol}</Symbol>
                        <Percent>{security.percent}%</Percent>
                      </div>
                    </Security>
                  );
                })}
                {otherSecurities.length > 0 && (
                  <Security key="other" color="#2A2D34">
                    <div>
                      <Symbol>Other</Symbol>{' '}
                      <Percent>{otherSecuritiesTotal}%</Percent>
                      <Tooltip
                        label="Other Securities: "
                        additionalComponent={
                          <OtherSecurities securities={otherSecurities} />
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                      </Tooltip>
                    </div>
                  </Security>
                )}
              </ListOfSecurities>
            </Grid>
            {showSecureApp && <Button onClick={cloneModel}>Clone Model</Button>}
          </Box>
          {!showSecureApp && (
            <>
              <ActionBox>
                <H3 style={{ fontSize: '20px' }}>
                  Build your own model portfolio!
                </H3>
                <AboutPassiv>
                  Passiv makes investing easier at online brokerages. Passiv
                  helps you maintain your portfolio’s allocation, manage
                  multiple accounts, and rebalance at the click of a button.{' '}
                  <a
                    href="https://passiv.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more
                  </a>
                </AboutPassiv>
                <SignUpBtn
                  onClick={() => history.push(`/app/register?ref=${shareId}`)}
                >
                  Free Sign Up
                </SignUpBtn>
                <Clone>
                  <Link
                    to={`/app/login?next=/app/model-portfolio/${model.model_portfolio.id}/share/${shareId}`}
                  >
                    Already a user? Login & Clone.
                  </Link>
                </Clone>
              </ActionBox>
              <ImageContainer></ImageContainer>
            </>
          )}
        </ResponsiveGrid>
      </ShadowBox>
      <small>
        * Disclaimer: The content of this page is for informational purposes
        only and is not intended to provide financial advice, and shall not be
        relied upon by you in that regard. Investments or trading strategies
        should be evaluated relative to each individual's objectives and risk
        tolerance. The views and opinions expressed in this page are those of
        the user only and do not reflect the position of Passiv.
      </small>
    </>
  );
};

export default SharedModelPortfolio;

type Prop = {
  securities: any;
};
const OtherSecurities = ({ securities }: Prop) => {
  return (
    <ul>
      {securities.map((security: any) => {
        return (
          <li style={{ margin: '7px' }}>
            {security.symbol.symbol}:
            <span style={{ fontWeight: 700, float: 'right' }}>
              {security.percent} %
            </span>
          </li>
        );
      })}
    </ul>
  );
};
