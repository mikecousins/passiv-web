import styled from '@emotion/styled';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@reach/dialog';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalGroupHoldings } from '../selectors/groups';
import { Button } from '../styled/Button';
import { A, H2, P } from '../styled/GlobalElements';
import CountDownTimer from './CountDownTimer';
import { StyledSelect } from './PortfolioGroupSettings/OrderTargetAllocations';

const Container = styled.div`
  margin: 10px 30px;
`;

const YoloBtn = styled.button`
  padding: 8px 58px;
  border: 2px solid var(--brand-green);
  border-radius: 8px;
  font-weight: 700;
  font-size: 22px;
  transition: all 0.3s ease-Out;
  :hover {
    color: white;
    background-color: rgb(255, 196, 0);
    border: 2px solid rgb(255, 196, 0);
  }
  @media (max-width: 900px) {
    padding: 2px 14px;
  }
`;
const Select = styled.div`
  width: 61%;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Toggle = styled.div`
  margin: 20px 0;
  .btn {
    border: 3px solid grey;
    border-radius: 4px;
    width: 30%;
    display: inline-block;
    padding: 10px;
    position: relative;
    text-align: center;
    transition: background 600ms ease, color 600ms ease;
    font-size: 40px;
    @media (max-width: 900px) {
      width: 50%;
    }
  }

  input[type='radio'].toggle {
    display: none;
    & + label {
      cursor: pointer;
      min-width: 60px;
      &:hover {
        background: none;
        color: #1a1a1a;
      }
      &:after {
        background: #1a1a1a;
        content: '';
        height: 100%;
        position: absolute;
        top: 0;
        transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
        width: 100%;
        z-index: -1;
      }
    }
    &.toggle-left + label {
      &:after {
        left: 100%;
      }
    }
    &.toggle-right + label {
      margin-left: -5px;
      &:after {
        left: -100%;
      }
    }
    &:checked + label {
      cursor: default;
      background-color: var(--brand-green);
      transition: color 200ms;
      &:after {
        left: 0;
      }
    }
  }
`;

const Disclaimer = styled.small`
  max-width: 860px;
  line-height: 1.3;
  font-size: 16px;
  display: inline-block;
  margin-top: 20px;
  color: #717171;
`;

const ConfirmBtn = styled(Button)`
  padding: 10px 30px;
  font-weight: 700;
`;

const WSB = () => {
  const totalEquity = useSelector(selectTotalGroupHoldings);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);

  const [showCountDown, setShowCountDown] = useState(false);
  const [cancel, setCancel] = useState(false);

  // const tickers = ['GME', 'AMC', 'NOK', 'NOW', 'BB', 'REAL', 'TELL'];
  const tickers = [
    {
      symbol: 'GME',
      price: 202,
    },
    {
      symbol: 'AMC',
      price: 14,
    },
    {
      symbol: 'NOK',
      price: 4,
    },
    {
      symbol: 'NOW',
      price: 467,
    },
    {
      symbol: 'BB',
      price: 11,
    },
    {
      symbol: 'REAL',
      price: 24,
    },
    {
      symbol: 'TELL',
      price: 2.5,
    },
  ];

  const calc = (ticker: string) => {
    let total = 0;
    tickers.forEach((t) => {
      if (t.symbol === ticker) {
        total = totalEquity / t.price;
      }
    });
    return total.toFixed(0);
  };

  return (
    <Container>
      <YoloBtn
        onClick={() => {
          setShowDialog(true);
          setLoading(true);
          setLoadingMsg(true);
          setTimeout(() => {
            setLoadingMsg(false);
          }, 3000);
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        }}
      >
        YOLO{' '}
        <span role="img" aria-label="emoji">
          💎👐
        </span>
      </YoloBtn>
      <Dialog
        isOpen={showDialog}
        onDismiss={() => {
          setShowDialog(false);
          setShowCountDown(false);
          setCancel(false);
        }}
        style={{ borderRadius: '4px' }}
        aria-labelledby="dialog1Title"
        aria-describedby="dialog1Desc"
      >
        {loading ? (
          <>
            <H2>
              {loadingMsg
                ? 'Loading meme stocks from WSB Hedge Fund '
                : 'Identified 7 meme stocks - Calculating'}{' '}
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                style={{ marginLeft: '10px' }}
              />
            </H2>
          </>
        ) : showCountDown ? (
          <CountDownTimer />
        ) : cancel ? (
          <>
            <div
              style={{
                width: '100%',
                height: '0',
                paddingBottom: '56%',
                position: 'relative',
              }}
            >
              <iframe
                src="https://giphy.com/embed/ifQpYUXKQNwZuns26g"
                title="giphy1"
                width="100%"
                height="100%"
                style={{ position: 'absolute' }}
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
              ></iframe>
            </div>
            <small>
              <a href="https://giphy.com/gifs/adultswim-whew-avoided-that-could-have-been-bad-ifQpYUXKQNwZuns26g">
                via GIPHY
              </a>
            </small>
          </>
        ) : (
          <Formik
            initialValues={{
              ticker: '',
              mode: '',
            }}
            onSubmit={() => {}}
          >
            {({ values }) => (
              <Form>
                <P>Choose a trending MEME stock:</P>
                <Select>
                  <StyledSelect as="select" name="ticker">
                    {<option value="" label="Select a stock" />}
                    {tickers.map((ticker) => {
                      return (
                        <option value={ticker.symbol} key={ticker.symbol}>
                          {ticker.symbol}
                        </option>
                      );
                    })}
                  </StyledSelect>
                </Select>
                {values.ticker !== '' && (
                  <Toggle role="group" aria-labelledby="my-radio-group">
                    <Field
                      id="toggle-on"
                      className="toggle toggle-left"
                      name="mode"
                      value="rocket"
                      type="radio"
                    />
                    <label htmlFor="toggle-on" className="btn">
                      <span
                        role="img"
                        aria-label="emoji"
                        style={{ width: '100px', height: '100px' }}
                      >
                        {' '}
                        🚀
                      </span>
                    </label>
                    <Field
                      id="toggle-off"
                      className="toggle toggle-right"
                      name="mode"
                      value="bear"
                      type="radio"
                    />
                    <label htmlFor="toggle-off" className="btn">
                      <span role="img" aria-label="emoji">
                        🐻
                      </span>
                    </label>
                  </Toggle>
                )}
                {values.mode !== '' && values.ticker !== '' && (
                  <>
                    <P>
                      This will liquidate all of your positions across all
                      accounts (Total:{' '}
                      <span style={{ fontWeight: 700 }}>
                        ${totalEquity.toFixed(2)}
                      </span>
                      ) and bets it all on OTM{' '}
                      {values.mode === 'rocket' ? 'Calls' : 'Puts'} of{' '}
                      {calc(values.ticker)} shares of{' '}
                      <span style={{ fontWeight: 700 }}>{values.ticker}</span>?{' '}
                    </P>
                    <div>
                      {' '}
                      <ConfirmBtn onClick={() => setShowCountDown(true)}>
                        Yolo
                      </ConfirmBtn>{' '}
                      <A
                        style={{ marginLeft: '20px' }}
                        onClick={() => setCancel(true)}
                      >
                        Cancel
                      </A>
                    </div>

                    <br />
                    <Disclaimer>
                      Disclaimer: This is not meant to be financial advice, you
                      just {values.mode === 'rocket' ? 'like' : 'hate'} the
                      stock.
                    </Disclaimer>
                  </>
                )}
              </Form>
            )}
          </Formik>
        )}
      </Dialog>
    </Container>
  );
};

export default WSB;
