import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';
import {
  selectReferralCode,
  selectReferralValue,
  selectReferralCurrency,
} from '../selectors/referrals';
import { getData } from '../api';
import { Chart } from 'react-charts';
import {
  faSpinner,
  faClipboard,
  faClipboardCheck,
  faFileInvoice,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Number from './Number';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  CashBalance,
  Cash,
  CashType,
  Center,
  Title,
} from '../styled/PortfolioGroupDetails';

import { A, P, BulletUL } from '../styled/GlobalElements';
import Grid from '../styled/Grid';

interface Referral {
  created_date: Date;
  validated: boolean;
  amount?: any;
  validation_timestamp?: Date;
  currency?: any;
}

const ReferralHeading = styled.div`
  padding-bottom: 0px;
  font-size: 40px;
  text-align: left;
  margin-bottom: 30px;
  position: relative;
  @media (max-width: 900px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const SubHeading = styled(ReferralHeading)`
  font-size: 32px;
  margin-top: 20px;
  @media (max-width: 900px) {
    font-size: 18px;
  }
`;

export const Container3Column = styled.div`
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
    > div {
      width: 32%;
      margin-right: 30px;
    }
    > div:last-of-type {
      margin-right: 0;
    }
  }
`;

export const Container2WideColumn = styled.div`
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
    > div:first-of-type {
      width: 66%;
      margin-right: 30px;
    }
    > div:last-of-type {
      width: 34%;
      margin-right: 0;
    }
  }
`;

type Props = {
  title: string;
  value: any;
  background: string;
  loading?: boolean;
  whiteText?: boolean;
};

const WhiteStyle = styled.div`
  color: #fff;
`;

const ReferralSubtext = styled.div`
  font-size: 16px;
  padding-top: 10px;
`;

const ReferralLinkBox = styled.div`
  width: 100%;
  display: flex;
`;

const InputBox = styled.div`
  flex-grow: 1;
`;

const IconBox = styled.div`
  margin-top: -6px;
`;

const IconButton = styled.button`
  font-size: 1.3em;
`;

const ReferralP = styled(P)`
  font-size: 20px;
  margin-bottom: 30px;
`;

const ReferralBulletUL = styled(BulletUL)`
  font-size: 20px;
  padding-top: 0;
`;

const ReferralA = styled(A)`
  font-size: inherit;
`;

const ReferralMetric = ({
  title,
  value,
  background,
  loading,
  whiteText,
}: Props) => {
  const content = (
    <React.Fragment>
      <Title>{title}</Title>
      <CashBalance>
        <CashType>
          <Center>
            {loading === undefined || loading === false ? (
              value
            ) : (
              <FontAwesomeIcon icon={faSpinner} spin />
            )}
          </Center>
        </CashType>
      </CashBalance>
    </React.Fragment>
  );

  return (
    <ShadowBox background={background}>
      <Cash>{whiteText ? <WhiteStyle>{content}</WhiteStyle> : content}</Cash>
    </ShadowBox>
  );
};

const ReferralManager = () => {
  const referralCode = useSelector(selectReferralCode);
  const referralValue = useSelector(selectReferralValue);
  const referralCurrency = useSelector(selectReferralCurrency);

  const referralURL = 'https://passiv.com?ref=' + referralCode;
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [signUpData, setSignUpData] = useState<(number | string)[][]>([]);
  const [validationData, setValidationData] = useState<(number | string)[][]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const [invoices, setInvoices] = useState([]);

  let earnings = 0;
  const validatedReferrals = referrals.filter((r) => r.validated === true);
  if (validatedReferrals.length > 0) {
    earnings = validatedReferrals
      .map((r) => r.amount)
      .reduce((acc, r) => acc + r);
  }

  if (loading === false && success === false) {
    setLoading(true);
    getData('/api/v1/referrals/')
      .then((response) => {
        setReferrals(response.data);
        setLoading(false);
        setSuccess(true);
        setSignUpData(getSignUpData(referrals));
        setValidationData(getValidationData(referrals));
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          setError(err.response.data);
        }
        console.log(error);
      });

    getData('/api/v1/invoices')
      .then((res) => {
        setInvoices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          setError(err.response.data);
        }
        console.log(err);
      });
  }

  const eliteUpgrades = referrals.filter((x, i) => x.validated).length;
  const numberOfSignups = referrals.length;

  let data = React.useMemo(
    () => [
      {
        label: 'Signups',
        data: signUpData,
        color: '#003ba2',
      },
      {
        label: 'Elite Upgrades',
        data: validationData,
        color: '#04a286',
      },
    ],
    [signUpData, validationData],
  );

  const series = React.useMemo(() => ({ type: 'bar' }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom', stacked: true },
      { type: 'linear', position: 'left' },
    ],
    [],
  );

  let rewardContent = null;
  if (referralValue !== undefined && referralCurrency !== undefined) {
    rewardContent = (
      <React.Fragment>
        <Number
          value={referralValue !== undefined ? referralValue : 0}
          currency
        />
        &nbsp;
        <span title={referralCurrency!.name}>{referralCurrency!.code}</span>
        <ReferralSubtext>per verified referral</ReferralSubtext>
      </React.Fragment>
    );
  }

  const referralLinkContent = (
    <React.Fragment>
      <ReferralLinkBox>
        <InputBox>
          <ReferralA
            href={referralURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {referralURL}
          </ReferralA>
        </InputBox>
        <IconBox>
          <CopyToClipboard
            text={referralURL}
            onCopy={() => {
              setCopied(true);
            }}
          >
            {copied ? (
              <IconButton>
                <FontAwesomeIcon icon={faClipboardCheck} />
              </IconButton>
            ) : (
              <IconButton>
                <FontAwesomeIcon icon={faClipboard} />
              </IconButton>
            )}
          </CopyToClipboard>
        </IconBox>
      </ReferralLinkBox>
      <ReferralSubtext>Share this with friends to earn cash!</ReferralSubtext>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ReferralHeading>Referral Program</ReferralHeading>
      <ReferralP>
        Get paid for telling your friends about Passiv! Share your personal
        referral link with friends and earn cash when they upgrade to Passiv
        Elite.
      </ReferralP>
      <Container2WideColumn>
        <ReferralMetric
          title={'Your Referral Link'}
          value={referralLinkContent}
          background={'#fff'}
        />
        <ReferralMetric
          title={'You Earn'}
          value={rewardContent}
          background={'#04A287'}
        />
      </Container2WideColumn>
      <SubHeading>Metrics</SubHeading>
      <Container3Column>
        <ReferralMetric
          title={'Signups'}
          value={<Number value={numberOfSignups} decimalPlaces={0} />}
          loading={!success}
          background={'#04A287'}
        />
        <ReferralMetric
          title={'Verified'}
          value={<Number value={eliteUpgrades} decimalPlaces={0} />}
          loading={!success}
          background={'#BEE0DB'}
        />
        <ReferralMetric
          title={'Total Earnings'}
          value={<Number value={earnings} currency />}
          loading={!success}
          background={'var(--brand-grey)'}
          whiteText={true}
        />
      </Container3Column>
      {signUpData?.length > 1 && (
        <div
          style={{
            height: '240px',
            margin: '5px',
          }}
        >
          <Chart data={data} axes={axes} series={series} tooltip />
        </div>
      )}

      {invoices.length > 0 ? (
        <>
          <SubHeading>Invoices</SubHeading>
          <ShadowBox>
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <Grid columns="1fr 1fr 1fr 1fr">
                {invoices.map((inv: any) => {
                  return (
                    <div style={{ marginBottom: '30px', padding: '5px' }}>
                      <FontAwesomeIcon
                        icon={faFileInvoice}
                        size="lg"
                        style={{ marginRight: '10px' }}
                      />
                      <a href={inv.pdf_url}>{inv.end_date}</a>
                    </div>
                  );
                })}
              </Grid>
            )}
          </ShadowBox>
        </>
      ) : null}

      <SubHeading>The Fine Print</SubHeading>
      <ReferralBulletUL>
        <li>
          By using your referral link, you agree to the{' '}
          <ReferralA
            href="https://passiv-files.s3.ca-central-1.amazonaws.com/Affiliates+-+Terms+and+Conditions.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms and Conditions
          </ReferralA>{' '}
          of Passiv's referral program.
        </li>
        <li>
          You only earn rewards for referrals that are verified as legitimate
          and satisfy the payout criteria.
        </li>
        <li>Passiv will deliver bulk payouts on a quarterly basis.</li>
        <li>
          Passiv reserves the right to terminate this program at any time.
        </li>
      </ReferralBulletUL>
    </React.Fragment>
  );
};

export default ReferralManager;

const getSignUpData = (referrals: Referral[]) => {
  if (referrals.length === 0) {
    return [];
  }
  let weekNumber = 1;
  referrals = referrals.sort((a, b) => +a.created_date - +b.created_date);
  let startOfCurrentWeek = new Date(referrals[0].created_date);
  const today = new Date();
  const data = [];

  while (startOfCurrentWeek < today) {
    const oneWeekLater = new Date(startOfCurrentWeek.getTime() + 604800000);
    let numSignUps = getNumSignUps(referrals, startOfCurrentWeek, oneWeekLater);
    data.push([
      'Week ' + weekNumber + ' (' + formatDate(startOfCurrentWeek) + ')',
      numSignUps,
    ]);
    startOfCurrentWeek = oneWeekLater;
    weekNumber += 1;
  }

  return data;
};

const getValidationData = (referrals: Referral[]) => {
  if (referrals.length === 0) {
    return [];
  }
  let weekNumber = 1;
  referrals = referrals.sort((a, b) => +a.created_date - +b.created_date);
  let startOfCurrentWeek = new Date(referrals[0].created_date);
  const today = new Date();
  const data = [];

  while (startOfCurrentWeek < today) {
    const oneWeekLater = new Date(startOfCurrentWeek.getTime() + 604800000);
    let numValidated = getNumValidated(
      referrals,
      startOfCurrentWeek,
      oneWeekLater,
    );
    data.push([
      'Week ' + weekNumber + ' (' + formatDate(startOfCurrentWeek) + ')',
      numValidated,
    ]);
    startOfCurrentWeek = oneWeekLater;
    weekNumber += 1;
  }

  return data;
};

const getNumSignUps = (
  referrals: Referral[],
  startOfCurrentWeek: Date,
  oneWeekLater: Date,
) => {
  return referrals.filter(
    (r) =>
      new Date(r.created_date) >= startOfCurrentWeek &&
      new Date(r.created_date) < oneWeekLater,
  ).length;
};

const getNumValidated = (
  referrals: Referral[],
  startOfCurrentWeek: Date,
  oneWeekLater: Date,
) => {
  return referrals.filter(
    (r) =>
      r.validated === true &&
      r.validation_timestamp !== undefined &&
      new Date(r.validation_timestamp) >= startOfCurrentWeek &&
      new Date(r.validation_timestamp) < oneWeekLater,
  ).length;
};

const dtfMonth = new Intl.DateTimeFormat('en', { month: 'short' });

const formatDate = (date: Date) => {
  if (typeof date !== 'object') {
    return date;
  } else {
    return dtfMonth.format(date) + ' ' + date.getDate();
  }
};
