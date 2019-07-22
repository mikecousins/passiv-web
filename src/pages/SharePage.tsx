import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { selectQueryTokens } from '../selectors/router';
import { H1, H2, P } from '../styled/GlobalElements';

const PortfolioContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  flex: 1;
`;

const SharePage = () => {
  const query = useSelector(selectQueryTokens);
  return (
    <React.Fragment>
      <H1>Shared Portfolio</H1>
      <PortfolioContainer>
        <Column>
          {query.symbols &&
            query.symbols.map((symbol: string, index: number) => (
              <Item key={index}>{symbol}</Item>
            ))}
        </Column>
        <Column>
          {query.percentages &&
            query.percentages.map((percentage: string, index: number) => (
              <Item key={index}>{percentage}%</Item>
            ))}
        </Column>
      </PortfolioContainer>
      <H2>Copy It</H2>
      <P>
        You aren't currently logged in. Please{' '}
        <Link to="/app/login">login</Link> or{' '}
        <Link to="/app/register">register</Link> to try this portfolio out!
      </P>
    </React.Fragment>
  );
};

export default SharePage;
