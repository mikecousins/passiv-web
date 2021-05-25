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
    height: 75px;
  }
  a {
    display: block;
    margin-top: 10px;
    text-decoration: none;
    font-weight: 600;
    svg {
      position: relative;
      bottom: 2px;
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
        'Passiv has partnered with Compound Confidence to offer you a free passive investing course, and help you get started on your journey.',
      img: courseGraphic,
      url: isPaid
        ? 'https://go.compoundconfidence.com/passiv-elite-discount'
        : 'https://go.compoundconfidence.com/passiv-community-discount',
    },
    {
      title: 'Tutorials',
      content:
        'Read our tutorials to discover how you can get the most out of Passiv.',
      img: tutorialsGraphic,
      url: 'https://passiv.com/tutorials/',
    },
    {
      title: 'Blogs',
      content:
        'Discover our articles on passive investing and personal finance.',
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
              <P>
                {card.content}

                <A href={card.url} target="_blank" rel="noopener noreferrer">
                  Learn More{' '}
                  <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
                </A>
              </P>

              <div></div>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Learn;
