import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  ModelPortfolioDetailsType,
  TargetWithPercentage,
} from '../../types/modelPortfolio';
import { selectRouter } from '../../selectors/router';
import ShadowBox from '../../styled/ShadowBox';
import { ResponsiveGrid } from './ModelPortfolio';
import { Box, StyledContainer, StyledName } from './ModelPortfolioBox';
import Grid from '../../styled/Grid';
import { PieChart } from 'react-minimal-pie-chart';
import { H1, H3, P } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import Tooltip from '../Tooltip';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectShowSecureApp } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getData, postData } from '../../api';
import { loadModelPortfolios } from '../../actions';
import { toast } from 'react-toastify';
import { StyledP } from '../../pages/ModelAssetClassPage';

import shareModelImage from '../../assets/images/shareModelImage.png';

const ImageContainer = styled.div`
  background: url(${shareModelImage}) no-repeat;
  background-size: contain;
  width: 300px;
  height: 300px;
  position: absolute;
  right: 0;
  bottom: -83px;
  @media (max-width: 900px) {
    bottom: -300px;
  }
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
  margin-bottom: 231px;
  padding: 20px;
`;

const AboutPassiv = styled(P)`
  margin: 10px 0 20px;
  font-size: 18px;
  line-height: 1.3;
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
const Disclaimer = styled.small`
  max-width: 860px;
  line-height: 1.3;
  font-size: 16px;
  display: inline-block;
  margin-top: 50px;
  margin-bottom: 40px;
  color: #717171;
`;

const SharedModelPortfolio = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const router = useSelector(selectRouter);

  const showSecureApp = useSelector(selectShowSecureApp);

  const [isSharedModel, setIsSharedModel] = useState(false);
  const [sharedModel, setSharedModel] = useState<ModelPortfolioDetailsType>();

  let shareId = router?.location?.query?.share;
  const modelId = router.location.pathname.split('/')[3];

  useEffect(() => {
    // check if the model is a shared model
    if (shareId) {
      getData(`/api/v1/modelPortfolio/${modelId}/share/${shareId}`)
        .then((res) => {
          setIsSharedModel(true);
          setSharedModel(res.data);
        })
        .catch((err) => {
          setIsSharedModel(false);
          history.replace('/app/login');
        });
    } else {
      setIsSharedModel(false);
      history.replace('/app/login');
    }
    // eslint-disable-next-line
  }, []);

  if (!sharedModel || !isSharedModel) {
    return <div></div>;
  }
  const orderedSecurities = sharedModel.model_portfolio_security.sort(
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
        sharedModel.model_portfolio.share_portfolio = false;
        sharedModel.model_portfolio.total_assigned_portfolio_groups = 0;
        // post new data to it
        postData(`api/v1/modelPortfolio/${modelId}`, sharedModel)
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
        <ResponsiveGrid
          columns={'4fr 2fr'}
          style={{ marginTop: '20px', position: 'relative' }}
        >
          <Box>
            <StyledContainer>
              <StyledName>{sharedModel.model_portfolio.name}</StyledName>
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
                <H3 style={{ fontSize: '18px', lineHeight: '1.2' }}>
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
                    to={`/app/login?next=/app/shared-model-portfolio/${sharedModel.model_portfolio.id}?share=${shareId}`}
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
      <Disclaimer>
        * Disclaimer: The content of this page is for informational purposes
        only and is not intended to provide financial advice, and shall not be
        relied upon by you in that regard. Investments or trading strategies
        should be evaluated relative to each individual's objectives and risk
        tolerance. The views and opinions expressed in this page are those of
        the user only and do not reflect the position of Passiv.
      </Disclaimer>
    </>
  );
};

export default SharedModelPortfolio;

type Prop = {
  securities: TargetWithPercentage[];
};
const OtherSecurities = ({ securities }: Prop) => {
  return (
    <ul>
      {securities.map((security) => {
        return (
          <li style={{ margin: '7px' }} key={security.symbol.id}>
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
