import React from 'react';

const SecurityPage = () => (
  <React.Fragment>
    <h1>Security</h1>
    <p>Security is a fundamental part of our business. The functionality of our product relies on our users sharing very personal financial information with us so that we can perform trade calculations on their behalf. The purpose of this document is to describe our approach to protecting personal data and securing our systems.</p>

    <h2 id="how-we-access-your-personal-data">How we access your personal data</h2>
    
    <p>A functioning Passiv account relies on having a live access token to interact with your investment account. Users grant Passiv limited access to their brokerage account so that we can see your investment accounts, account holdings, and transaction history. By default, the access we request is limited to read-only account data, so we cannot place or modify trades on your behalf. If desired you may grant trade-enabled access instead, which will allow your account to use advanced features like One-Click Trades.</p>
    
    <p>This access is granted through a secure OAuth flow. The process works as follows:</p>
    
    <ul>
      <li>User creates a Passiv account and clicks the “Authorize” button for starting the OAuth flow.</li>
      <li>Passiv redirects the user to their brokerage website with a request for limited access.</li>
      <li>The user logs in to their brokerage website and grants the access request.</li>
      <li>The user is then redirected back to Passiv with a temporary access token.</li>
      <li>Passiv collects the access token and authenticates with the brokerage to confirm that the token is valid.</li>
      <li>Upon receipt of a valid token, Passiv syncs some basic account information so that your account can start being useful.</li>
      <li>Should the user wish to revoke Passiv’s access, they can do so from their application dashboard with their brokerage account.</li>
    </ul>
    
    <p>Passiv periodically accesses information from your investment account in order to:</p>
    
    <ul>
      <li>Refresh the access token to keep it valid</li>
      <li>Check your account for new cash transactions</li>
      <li>Check your account for portfolio accuracy</li>
    </ul>
    
    <p>Additionally, when you access your Passiv account, we make live requests for information from your investment account in order to let you see real-time information about your account and calculated trades.</p>
    
    <h2 id="how-we-store-your-personal-data">How we store your personal data</h2>
    
    <p>Passiv stores very limited personal data from your investment account. We store only basic account information and a few things which are necessary to provide our service. The basic account information is a list of all your investment accounts and identifiers associated with them. This is important for us to store so that we can associate a target portfolio with each investment account. We do not store more detailed account information, including your current holdings, open trades, or account equity. While Passiv does access detailed information from your investment account, the data is passed directly to the interface and not persistently cached or stored in any way.</p>
    
    <p>Besides basic account information, Passiv also stores:</p>
    
    <ul>
      <li>symbol and ticker information to allow us to efficiently fetch quotes for securities associated with your account</li>
      <li>hashed account transaction history</li>
      <li>order history for trades that were placed or attempted through Passiv’s One-Click Trades feature</li>
      <li>pageview and application usage history, including your IP address and session cookies</li>
      <li>anonymized aggregate statistics across all accounts, such as active accounts, total holdings, and other business metrics</li>
    </ul>
    
    <p>Account transaction history is stored in a secure form that allows us to detect new transactions without knowing the details of old ones. This works by hashing each transaction and storing only the hash, which serves as a record that we have previously seen any transaction which produces the same hash. As with other personal data, no part of the raw transaction data is persistently stored or cached.</p>
    
    <p>The data we store is not shared with any other party, except for application usage monitoring which is provided by third-party services including Google Analytics, Amplitude, and Sendgrid.</p>
    
    <h2 id="how-we-secure-your-personal-data">How we secure your personal data</h2>
    
    <p>Passiv runs its software on a private dedicated server in a major datacentre. Our server is hosted in Canada, so everything falls under the jurisdiction of the Canadian legal system. We limit server access to only key employees who need access to production resources. The server is frequently screened for vulnerabilities and patched where appropriate. Standard security practices such as a firewall and SSH keys are used to limit access and reduce attack surface. All networked services running on the server are locally bound and password protected where possible. Database backups are made frequently and strongly encrypted before uploading to a secure remote location.</p>
    
    <p>Moving forward, we are working on implementing at-rest encryption for database assets and a robust key management system.</p>
  </React.Fragment>
);

export default SecurityPage;