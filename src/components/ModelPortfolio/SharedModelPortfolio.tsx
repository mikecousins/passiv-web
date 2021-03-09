import React from 'react';
import styled from '@emotion/styled';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import ShadowBox from '../../styled/ShadowBox';
import { ResponsiveGrid } from './ModelPortfolio';
import { Box, StyledContainer, StyledName } from './ModelPortfolioBox';
import Grid from '../../styled/Grid';
import { PieChart } from 'react-minimal-pie-chart';
import { H3 } from '../../styled/GlobalElements';
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

const Security = styled.div`
  border-right: 5px solid ${(props) => props.color};
  line-height: 30px;
  padding: 10px;
  margin-bottom: 20px;
  width: 180px;
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
`;

const Questrade = styled.div`
  margin: 20px 0;
  font-size: 18px;
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

  const firstTenSecuirty = orderedSecurities.slice(0, 5);

  const otherSecurities = orderedSecurities.slice(5);

  const otherSecuritiesTotal = otherSecurities.reduce(
    (add: number, security) => {
      add = add + +security.percent;
      return add;
    },
    0,
  );

  const othersList = otherSecurities
    .map((security) => {
      return `${security.symbol.symbol}: ${security.percent}`;
    })
    .join(', ');

  const colors = ['#008F77', '#2A2D34', '#033EBC', '#5f5252', '#E38627'];

  const coloredSecurity = firstTenSecuirty.map((security: any, index) => {
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
    value: otherSecuritiesTotal,
    color: 'purple',
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
      <ShadowBox>
        <ResponsiveGrid
          columns={showSecureApp ? '' : '4fr 2fr'}
          style={{ marginTop: '20px' }}
        >
          <Box>
            <StyledContainer>
              <StyledName>{model.model_portfolio.name}</StyledName>
            </StyledContainer>
            <Grid columns="auto 200px">
              <PieChart
                data={pieChartData}
                style={{ height: '230px' }}
                lineWidth={40}
                paddingAngle={2}
                animate
              />
              <div>
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
                <Security key="other" color="purple">
                  <div>
                    <Symbol>Other</Symbol>
                    <Percent>{otherSecuritiesTotal}%</Percent>
                    <Tooltip
                      label="Other Securities: "
                      additionalComponent={
                        <OtherSecurities securities={otherSecurities} />
                      }
                    >
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        style={{ fontSize: 12 }}
                      />
                    </Tooltip>
                  </div>
                </Security>
              </div>
            </Grid>
            {showSecureApp && <Button onClick={cloneModel}>Clone Model</Button>}
          </Box>
          {!showSecureApp && (
            <ActionBox>
              <H3 style={{ fontSize: '20px' }}>
                Sign up for Passiv and build your own model portfolio!
              </H3>
              <Questrade>
                Something about Questrade users getting Elite on Questrade.
              </Questrade>
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
          )}
        </ResponsiveGrid>
      </ShadowBox>
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
          <li style={{ margin: '5px' }}>
            {security.symbol.symbol}:{' '}
            <span style={{ fontWeight: 700 }}>{security.percent}</span>
          </li>
        );
      })}
    </ul>
  );
};
