import React from 'react';
import ShadowBox from '../../styled/ShadowBox';
import { H2, H3, P, A } from '../../styled/GlobalElements';
import { Questions } from '../../styled/Help';

const FAQ = () => (
  <div>
    <H2 margin="40px 0 25px">Frequently Asked Questions</H2>
    <Questions>
      <ShadowBox>
        <H3>What is Passiv?</H3>
        <P>
          Passiv is a web app that helps you manage your portfolio and maintain
          a desired target allocation. It calculates the trades needed based on
          the target allocation you’ve set and your available cash.{' '}
          <A
            href="https://passiv.com/pricing/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Elite users
          </A>{' '}
          can save even more time by having Passiv execute trades for you at the
          click of a button with the One-Click Trades feature.
        </P>
      </ShadowBox>
      <ShadowBox>
        <H3>Who is Passiv for?</H3>
        <P>
          Passiv is for individuals who prefer to manage their own retirement
          portfolio and are tired of losing money to high management fees. It’s
          for anyone who wants to automate the tedious parts of portfolio
          management, like allocating new cash and rebalancing.
        </P>
      </ShadowBox>
      <ShadowBox>
        <H3>I’m American. Can I use Passiv?</H3>
        <P>
          Right now we only support Canadian Questrade accounts, but we’re
          aiming to partner with brokerages south of the border in 2019 - stay
          tuned (and tell your brokerage about us!).
        </P>
      </ShadowBox>
      <ShadowBox>
        <H3>Does Passiv store my Questrade login credentials?</H3>
        <P>
          No, Passiv does not ask for or store users’ login credentials. To link
          your account to Passiv, Passiv sends you over to Questrade’s website,
          where you log in. That tells Questrade to give Passiv something called
          a token. Passiv gets the information it needs through this token. To
          read more about this process, click{' '}
          <A
            href="https://passiv.com/security/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </A>
          .
        </P>
      </ShadowBox>
      <ShadowBox>
        <H3>Will using Passiv void Questrade’s terms of service?</H3>
        <P>
          Using Passiv will not void Questrade’s terms of service. We are an
          official partner and we use Questrade’s official API for third-party
          product integration.
        </P>
      </ShadowBox>
      <ShadowBox>
        <H3>Does Passiv use screen scraping technology?</H3>
        <P>
          No, Passiv works using{' '}
          <A
            href="https://www.questrade.com/api/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Questrade’s official Application Programming Interface
          </A>{' '}
          (API).
        </P>
      </ShadowBox>
      <ShadowBox>
        <H3>What is an API?</H3>
        <P>
          An API is a set of definitions, protocols and tools for building
          software. In short, an API makes it possible for Passiv to connect
          with your brokerage.
        </P>
      </ShadowBox>
      <ShadowBox>
        <H3>Why do you need trade access?</H3>
        <P>
          Trade access is needed if you’d like to use the One-Click Trades
          feature, where Passiv executes trades on your behalf with the click of
          one button. If you do not want to use this feature, simply go to
          Settings and click the Re-authorize button next to Read-Only Access.
          This removes trading access.
        </P>
      </ShadowBox>
      <ShadowBox>
        <H3>
          Is it possible to use the other Elite features without giving Passiv
          trade access?
        </H3>
        <P>
          Yes, simply go to the Settings page and re-authorize Passiv with
          Read-only access. This removes trading access.
        </P>
      </ShadowBox>
      <ShadowBox>
        <H3>Is Passiv a robo-advisor?</H3>
        <P>
          No, Passiv is a software tool that helps DIY investors determine what
          trades are needed to allocate new cash and rebalance their portfolios.
          If you’ve given Passiv trading access, it can also execute the trades
          on your behalf with just one click.
        </P>
      </ShadowBox>
      <ShadowBox>
        <H3>Will Passiv recommend a portfolio for me to follow?</H3>
        <P>
          No, you must know which equities you’d like to hold and your target
          allocation for each. Passiv is not qualified to give investment
          advice.
        </P>
      </ShadowBox>
      <ShadowBox>
        <H3>Can I manage more than one account?</H3>
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
      </ShadowBox>
      <ShadowBox>
        <H3>Can I manage someone else’s account(s)?</H3>
        <P>
          Yes. You can manage your spouse’s or children’s accounts by following
          the steps{' '}
          <A
            href="https://passiv.com/blog/seamlessly-manage-your-spouses-account/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </A>
          .
        </P>
      </ShadowBox>
    </Questions>
  </div>
);

export default FAQ;
