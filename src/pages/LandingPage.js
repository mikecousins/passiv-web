import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import RetirementComparer from '../components/RetirementComparer';
import { selectLoggedIn } from '../selectors';

const LandingPage = (props) => {
  if (props.loggedIn) {
    return (<Redirect to="/app/dashboard" />)
  }
  else {
    return (
      <React.Fragment>
        <h1>Investing Made Easy</h1>
        <div>
          <section>
            <div>
              <p className="tagline">A tool for managing your questrade portfolio</p>
              <p className="blurb">Canadians are managing over $40M of their own money using Passiv </p>
              <p className="blurb">Link your account. Set your target. Stay on course.</p>
              <Link to="/app/register" className="btn-1">Try For Free</Link>
            </div>
          </section>
          <section className="mission">
            <div className="wrapper">
              <div className="img-container">
                <img alt="Passiv Interface" src="https://getpassiv.com/assets/images/interface.png" srcSet="https://getpassiv.com/assets/images/interface@2x.png 2x" />
              </div>
              <div className="copy-container">
                <h2>The Mission</h2>
                <p>At Passiv we believe that you should not have to work hard at making your investments work for you. We make it easy for you to manage your portfolio so that you can save more for retirement and spend more of your time enjoying life.</p>
                <Link to="/about/" className="btn-3"><span>About Passiv</span></Link>
              </div>
            </div>
          </section>
        </div>
        <RetirementComparer />
        <section className="features">
          <div className="wrapper">
            <div className="col-3">
              <div className="inner-col tile">
                <div className="tile-container">
                  <img src="https://getpassiv.com/assets/images/allocation.jpg" srcSet="https://getpassiv.com/assets/images/allocation@2x.jpg 2x" alt="Target Allocation" />
                  <h3>Maintain Your Portfolio’s Target Allocation</h3>
                  <p>Build your portfolio and maintain your target allocation. Use Passiv's "buy-only" setting to identify the underweight assets in your portfolio.
                  </p>
                </div>
              </div>
              <div className="inner-col tile">
                <div className="tile-container">
                  <img src="https://getpassiv.com/assets/images/automate.jpg" srcSet="https://getpassiv.com/assets/images/automate@2x.jpg 2x" alt="Target Allocation" />
                  <h3>Automate Your Investments</h3>
                  <p>Save time by letting Passiv calculate & execute the trades needed to keep your portfolio balanced.
                  </p>
                </div>
              </div>
              <div className="inner-col tile">
                <div className="tile-container">
                  <img src="https://getpassiv.com/assets/images/smart-alerts.jpg" srcSet="https://getpassiv.com/assets/images/smart-alerts@2x.jpg 2x" alt="Smart Alerts" />
                  <h3>Smart Alerts</h3>
                  <p>Get notified whenever new cash & dividend payments come in or whenever your portfolio drifts out of alignment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="testimonials">
          <div className="wrapper">
            <h2>What Passiv Users Have to Say</h2>
            <div className="col-2">
              <div className="inner-col testimonial">
                <p><span>"</span>This is a great tool! Sign up is simple, connecting to my stock portfolio was a breeze, and the interface is really clean and straightforward. Highly recommend to anyone who manages a portfolio.<span>"</span></p>
                <span className="name">Tyler F.</span>
              </div>
              <div className="inner-col testimonial">
                <p><span>"</span> I’ve saved a ton of time and money using Passiv. Its simplicity has given me the confidence to manage my retirement investments.<span>"</span></p>
                <span className="name">Santi C.</span>
              </div>
            </div>
          </div>
        </section>
        <section className="stay-informed">
          <div className="wrapper">
            <h2>Stay Informed</h2>
            <p>We are are constantly working on new features for the app, sign up for the opportunity to gain first access. <strong>We will also let you know as more brokerages become available.</strong></p>
            <div id="subscribe" className="form-container">
              <form method="post" noValidate action="https://getpassiv.com/ajax/subscribe">
                <label htmlFor="id_email">
                  Enter your email
                </label>
                <input
                  type="email"
                  placeholder="example@client.com"
                  name="email"
                  required
                  max_length="512"
                  id="id_email"
                />
                <input
                  type="submit"
                  id="email-capture"
                  value="submit"
                />
              </form>
            </div>
          </div>
        </section>
        <section className="security">
          <div className="wrapper">
            <h2>We make sure everything is <span>secure</span></h2>
            <p>We work with brokerages directly and use their APIs in order to keep your information safe and secure. This ensures that you are not breaching their terms & conditions. We do not store your login credentials to your brokerage account nor do we share your information with any third parties. <Link to="/security">Lean more about our security policies.</Link></p>
          </div>
        </section>
      </React.Fragment>
    )
  }

};

const select = state => ({
  loggedIn: selectLoggedIn(state),
});

export default connect(select)(LandingPage);
