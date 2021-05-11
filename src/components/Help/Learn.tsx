import styled from '@emotion/styled';
import React from 'react';
import { H3, P, A } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import ShadowBox from '../../styled/ShadowBox';
import { Header } from './SearchBar';

import shareModelImage from '../../assets/images/shareModelImage2.png';
import courseGraphic from '../../assets/images/courseGraphic.png';

const Container = styled.div`
  margin-bottom: 50px;
`;

type CardProps = {
  image: any;
};
const Card = styled(ShadowBox)<CardProps>`
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
  }
  div {
    background: url(${(props) => props.image}) no-repeat;
    background-size: contain;
    width: 180px;
    height: 180px;
    position: relative;
    float: right;
    @media (max-width: 900px) {
      float: none;
    }
  }
`;

const Learn = () => {
  const cards = [
    {
      title: 'Take a course',
      content:
        'Passiv assumes that you want to stay 100% invested but what if you wanted to do dollar-cost averaging? ',
      img: courseGraphic,
      url: '',
    },
    {
      title: 'Tutorials',
      content:
        'Want to know when your portfolio is out of alignment? This is where drift notifications come in.',
      img: '',
      url: '',
    },
    {
      title: 'Blogs',
      content:
        'Do you have Canadian and US dollars in your portfolio? You can choose how Passiv deals with multiple currencies.',
      img: shareModelImage,
      url: '',
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
              <A href={card.url}>Learn More</A>
              <div></div>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Learn;
