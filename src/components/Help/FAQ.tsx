import React from 'react';
import { H2, P, A } from '../../styled/GlobalElements';
// import { Questions } from '../../styled/Help';
import CollapseBox from './CollapseBox';
import Grid from '../../styled/Grid';
import styled from '@emotion/styled';

const FAQContainer = styled.div`
  width: 70%;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const FAQ = () => (
  <FAQContainer>
    <H2 margin="40px 0 25px">Frequently Asked Questions</H2>
    <Grid columns="1fr">
      <CollapseBox
        title="What is Passiv?"
        content={
          <P>
            Passiv is a web app that helps you manage your portfolio and
            maintain a desired target allocation. It calculates the trades
            needed based on the target allocation you’ve set and your available
            cash.{' '}
            <A
              href="https://passiv.com/pricing/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Elite users
            </A>{' '}
            can save even more time by having Passiv execute trades for you at
            the click of a button with the One-Click Trades feature.
          </P>
        }
      />

      <CollapseBox
        title="Who is Passiv for?"
        content={
          <P>
            Passiv is for individuals who prefer to manage their own retirement
            portfolio and are tired of losing money to high management fees.
            It’s for anyone who wants to automate the tedious parts of portfolio
            management, like allocating new cash and rebalancing.
          </P>
        }
      />

      <CollapseBox
        title="Does Passiv store my brokerage login credentials?"
        content={
          <P>
            No, Passiv does not ask for or store users’ login credentials. To
            link your account to Passiv, Passiv sends you over to your broker's
            website with a secure request for account access. When you approve
            Passiv's access request, Passiv receives an access token to read
            your account information. To read more about this process, click{' '}
            <A
              href="https://passiv.com/security/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </A>
            .
          </P>
        }
      />

      <CollapseBox
        title="Will using Passiv void my broker's terms of service?"
        content={
          <P>
            Using Passiv will not void your terms of service. Passiv works with
            brokers as an official API partner, which means we are compliant
            with their rules for third party account access.
          </P>
        }
      />

      <CollapseBox
        title="Does Passiv use screen scraping technology?"
        content={
          <P>
            No, Passiv works using{' '}
            <A
              href="https://www.questrade.com/api/"
              target="_blank"
              rel="noopener noreferrer"
            >
              your broker's official Application Programming Interface
            </A>{' '}
            (API).
          </P>
        }
      />

      <CollapseBox
        title="What is an API?"
        content={
          <P>
            An API is a set of definitions, protocols and tools for building
            software. In short, an API makes it possible for Passiv to connect
            with your brokerage.
          </P>
        }
      />

      <CollapseBox
        title="Why do you need trade access?"
        content={
          <P>
            Trade access is needed if you’d like to use the One-Click Trades
            feature, where Passiv executes trades on your behalf with the click
            of one button. If you do not want to use this feature, you can
            disable trade access from your Settings page under Connections.
          </P>
        }
      />

      <CollapseBox
        title="Is it possible to use the other Elite features without giving Passiv
        trade access?"
        content={
          <P>
            Yes, simply go to the Settings page and reconnect Passiv with
            read-only access. This removes trading access.
          </P>
        }
      />

      <CollapseBox
        title="Is Passiv a robo-advisor?"
        content={
          <P>
            No, Passiv is a software tool that helps DIY investors determine
            what trades are needed to allocate new cash and rebalance their
            portfolios. If you’ve given Passiv trading access, it can also
            execute the trades on your behalf with just one click.
          </P>
        }
      />

      <CollapseBox
        title="Will Passiv recommend a portfolio for me to follow?"
        content={
          <P>
            No, you must know which equities you’d like to hold and your target
            allocation for each. Passiv is not qualified to give investment
            advice.
          </P>
        }
      />
      <CollapseBox
        title="Can I manage more than one account?"
        content={
          <P>
            You can manage as many accounts as you want for one low price. The
            more accounts you link,{' '}
            <A
              href="https://passiv.com/blog/3-ways-get-most-out-passiv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              the more value
            </A>{' '}
            you get out of Passiv.
          </P>
        }
      />
      <CollapseBox
        title="Can I manage someone else’s account(s)?"
        content={
          <P>
            Yes. You can manage your spouse’s or children’s accounts by
            following the steps{' '}
            <A
              href="https://passiv.com/blog/seamlessly-manage-your-spouses-account/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </A>
            .
          </P>
        }
      />
    </Grid>
  </FAQContainer>
);

export default FAQ;
