import React from 'react';
import AccountGroup from '../components/AccountGroup';
import Account from '../components/Account';

const DashboardPage = () => (
  <div>
    <div className="mb-4 text-xl font-bold">
      Dashboard
    </div>
    <AccountGroup
      name="Retirement"
      slices={[
        {
          color: '#A2F5BF',
          value: 10,
        },
        {
          color: '#A0F0ED',
          value: 20,
        },
        {
          color: '#BCDEFA',
          value: 15,
        },
        {
          color: '#B2B7FF',
          value: 20,
        },
        {
          color: '#D6BBFC',
          value: 15,
        }
      ]}
    >
      <Account name="Mike RRSP" />
      <Account name="Stacy RRSP" />
      <Account name="Mike TFSA" />
      <Account name="Stacy TFSA" />
      <Account name="Non-Registered" />
    </AccountGroup>
    <AccountGroup
      name="RESP"
      slices={[
        {
          color: '#A2F5BF',
          value: 10,
        }
      ]}
    >
      <Account name="Megan RESP" />
    </AccountGroup>
  </div>
);

export default DashboardPage;
