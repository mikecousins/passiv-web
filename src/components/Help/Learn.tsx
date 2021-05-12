import styled from '@emotion/styled';
import React from 'react';
import { H3, P, A } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import ShadowBox from '../../styled/ShadowBox';
import { Header } from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { selectIsPaid } from '../../selectors/subscription';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import courseGraphic from '../../assets/images/course-graphic2.png';
import blogGraphic from '../../assets/images/blog-graphic.png';
import tutorialsGraphic from '../../assets/images/tutorials-graphic.png';

const Container = styled.div`
  margin-bottom: 50px;
`;

type CardProps = {
  image: any;
};
const Card = styled(ShadowBox)<CardProps>`
  height: 300px;
  h3 {
    line-height: 32px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #716f75;
    margin-bottom: 15px;
  }
  p {
    line-height: 26px;
  }
  a {
    text-decoration: none;
    font-weight: 600;
    svg {
      position: relative;
      bottom: 3px;
      margin-right: 2px;
    }
  }
  div {
    background: url(${(props) => props.image}) no-repeat;
    background-size: contain;
    width: ${(props) => (props.image === blogGraphic ? '150px' : '180px')};
    height: 200px;
    position: relative;
    float: right;
  }
  @media (max-width: 1348px) {
    height: 400px;
  }
  @media (max-width: 900px) {
    height: 300px;
  }
`;

const Learn = () => {
  const isPaid = useSelector(selectIsPaid);

  const cards = [
    {
      title: 'Take a course',
      content:
        'Passiv assumes that you want to stay 100% invested but what if you wanted to do dollar-cost averaging? ',
      img: courseGraphic,
      url: isPaid
        ? 'https://go.compoundconfidence.com/passiv-elite-discount'
        : 'https://go.compoundconfidence.com/passiv-community-discount',
    },
    {
      title: 'Tutorials',
      content:
        'Want to know when your portfolio is out of alignment? This is where drift notifications come in.',
      img: tutorialsGraphic,
      url: 'https://passiv.com/tutorials/',
    },
    {
      title: 'Blogs',
      content:
        'Do you have Canadian and US dollars in your portfolio? You can choose how Passiv deals with multiple currencies.',
      img: blogGraphic,
      url: 'https://passiv.com/blog/',
    },
  ];
  return (
    <Container>
      <Header>Learn</Header>
      <Grid columns="2fr 2fr 2fr">
        {cards.map((card) => {
          return (
            <Card image={card.img}>
              <H3>{card.title}</H3>
              <P>{card.content}</P>
              <A href={card.url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" /> Learn
                More
              </A>
              <div></div>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Learn;
