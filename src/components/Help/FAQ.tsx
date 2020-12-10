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
    <Grid>
      <CollapseBox
        title="What is considered an active account?"
        content={
          <P>
            Most brokerages consider an account to be active when it’s open and
            fully funded. For example, Questrade considers your account fully
            funded when there is a minimum of $1,000 CAD in your account. Note
            that as with any bank transfer, there may be a delay between your
            deposit and the time the funds are in your account
          </P>
        }
      />

      <CollapseBox
        title="Why do I see different account total values in Passiv and in my brokerage? "
        content={
          <P>
            Passiv uses real-time data passed through your broker's API and
            should be correct as long as your brokerage connection is active.
            Some brokerage dashboards show a daily account summary rather than
            real-time data. This is often the case for reports and account
            statements. If you make a change in your brokerage account directly
            instead of through Passiv, such as manually placing an order or
            depositing more funds, it may take a few minutes for Passiv to sync
            the latest data from your account.
          </P>
        }
      />

      <CollapseBox
        title="Why can’t I access my data at night or on weekends?"
        content={
          <P>
            Brokerages usually do maintenance on their site outside of market
            hours. If your brokerage is in maintenance mode, Passiv may not be
            able to access your data.
          </P>
        }
      />

      <CollapseBox
        title="I can’t add another brokerage connection"
        content={
          <P>
            If you have issues connecting a new brokerage connection, it may be
            because you’re logged in with another account in your brokerage.
            Please try going to your brokerage site and log out of your account.
            Then you should be able to go back to Passiv and add the new
            connection.
          </P>
        }
      />

      <CollapseBox
        title="What is an Authenticator App?"
        content={
          <P>
            An authenticator app is a third party application that generates
            randomized codes to be used as a verification code upon logging in.
            If you don’t have an authenticator app, you can use SMS two-factor
            authentication instead. Two-factor authentication settings are
            optional and can be found in the <strong>Settings</strong> page.
          </P>
        }
      />

      <CollapseBox
        title="Why isn’t my brokerage supported by Passiv?"
        content={
          <P>
            We’re constantly working on adding more brokerage partners. If you
            don’t see your brokerage, keep an eye on our monthly newsletter for
            updates.
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
            your account information. To read more about this process,{' '}
            <a href="https://passiv.com/security/">click here</a>.
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
        title="Will Passiv place trades automatically?"
        content={
          <P>
            No, for regulatory reasons, Passiv will not place trades
            automatically. Once you review the calculated trades, you can place
            them at the click of a button.{' '}
            <a href="https://passiv.com/help/tutorials/how-to-use-one-click-trades/">
              Read More
            </a>
            .
          </P>
        }
      />
      <CollapseBox
        title="What assets are supported by Passiv?"
        content={
          <P>
            Passiv only supports ETFs and stocks. Other types of assets, such as
            mutual funds, options, warrants, and commodities are not supported
            by Passiv. If you hold these assets, they may not show in your
            portfolio allocation.
          </P>
        }
      />
      <CollapseBox
        title="Can I edit my cash allocation?"
        content={
          <P>
            If your target percentages don’t add up to 100%, Passiv assumes the
            remainder is intended to be held as cash. For example, if you want
            10% of your portfolio as cash, then the sum of your assets’
            allocation should be 90%. You can also add account-specific rules
            for{' '}
            <a href="https://passiv.com/help/tutorials/how-to-use-cash-management/">
              cash management
            </a>
            , which allows you to set a limit on how much new cash to invest in
            a given set of trades, or to tell Passiv that you want to keep a
            certain amount of cash uninvested.
          </P>
        }
      />
      <CollapseBox
        title="How do I add more accounts?"
        content={
          <P>
            If you’re an Elite subscriber, you can have more than one brokerage
            connection simultaneously in Passiv. For example, you can add and
            manage your family’s brokerage accounts. Go to{' '}
            <strong>Settings</strong> and click <strong>Add Connection</strong>{' '}
            in the <strong>Connection box</strong>.{' '}
            <a href="https://passiv.com/help/tutorials/how-to-manage-your-brokerage-connections/">
              Read More
            </a>
            .
          </P>
        }
      />
      <CollapseBox
        title="Why do you need trade access?"
        content={
          <P>
            Trade access is needed if you’d like to use the{' '}
            <a href="https://passiv.com/help/tutorials/how-to-use-one-click-trades/">
              One-Click Trades{' '}
            </a>
            feature, where Passiv places orders on your behalf with the click of
            one button. If you do not want to use this feature, you can disable
            trade access from your <strong>Settings</strong> page under
            <strong> Connections</strong>.{' '}
            <a href="https://passiv.com/help/tutorials/how-to-manage-your-brokerage-connections/">
              Read More
            </a>
            .
          </P>
        }
      />
      <CollapseBox
        title="Why can’t I place trades in pre/post market hours?"
        content={
          <P>
            Passiv can only place trades during normal market hours where market
            orders are allowed. This is to make sure that orders are executed
            quickly and to minimize problems with liquidity.
          </P>
        }
      />
      <CollapseBox
        title="How do I delete my account?"
        content={
          <P>
            If you want to delete your account, please send a request to our
            support team through the form above or at{' '}
            <A href="mailto:support@passiv.com">support@passiv.com</A>. If you
            don’t mind taking an extra minute to explain why you’re leaving,
            we’d really appreciate your feedback.
          </P>
        }
      />
    </Grid>
  </FAQContainer>
);

export default FAQ;
