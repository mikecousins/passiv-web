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
import { StyledSelect } from './PortfolioGroupSettings/OrderTargetAllocations';

const Container = styled.div`
  margin: 10px 30px;
`;

const YoloBtn = styled.button`
  padding: 8px 58px;
  border: 2px solid var(--brand-green);
  border-radius: 8px;
  font-weight: 700;
  font-size: 20px;
  transition: all 0.5s ease-Out;
  :hover {
    color: white;
    background-color: orange;
    border: 2px solid orange;
  }
`;
const Toggle = styled.div`
  margin: 20px;
  .btn {
    border: 3px solid grey;
    border-radius: 4px;
    display: inline-block;
    padding: 10px;
    position: relative;
    text-align: center;
    transition: background 600ms ease, color 600ms ease;
    font-size: 50px;
    width: 30%;
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
      /* border-right: 0; */
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

const ConfirmBtn = styled(Button)`
  padding: 10px 30px;
  font-weight: 700;
`;

const WSB = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const totalEquity = useSelector(selectTotalGroupHoldings);

  // const tickers = ['GME', 'AMC', 'NOK', 'NOW', 'BB', 'REAL', 'TELL'];
  const tickers = [
    {
      symbol: 'GMC',
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
          }, 1);
          setTimeout(() => {
            setLoading(false);
          }, 1);
        }}
      >
        YOLO{' '}
        <span role="img" aria-label="emoji">
          😎{' '}
        </span>
      </YoloBtn>
      <Dialog
        isOpen={showDialog}
        onDismiss={() => setShowDialog(false)}
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
        ) : (
          <Formik
            initialValues={{
              ticker: '',
              mode: '',
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, errors, dirty, isValid, handleSubmit, resetForm }) => (
              <Form>
                <P>Choose your YOLO stock :</P>
                <div style={{ width: '50%' }}>
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
                </div>
                {values.ticker !== '' && (
                  <Toggle role="group" aria-labelledby="my-radio-group">
                    <Field
                      id="toggle-on"
                      className="toggle toggle-left"
                      name="mode"
                      value="bear"
                      type="radio"
                    />
                    <label htmlFor="toggle-on" className="btn">
                      <span role="img" aria-label="emoji">
                        {' '}
                        🐻
                      </span>
                    </label>
                    <Field
                      id="toggle-off"
                      className="toggle toggle-right"
                      name="mode"
                      value="bull"
                      type="radio"
                    />
                    <label htmlFor="toggle-off" className="btn">
                      <span role="img" aria-label="emoji">
                        🐂
                      </span>
                    </label>
                  </Toggle>
                )}
                {values.mode !== '' && values.ticker !== '' && (
                  <>
                    <P>
                      Close all positions (total:{' '}
                      <span style={{ fontWeight: 700 }}>
                        ${totalEquity.toFixed(2)}
                      </span>
                      ) and buy {calc(values.ticker)} shares of{' '}
                      <span style={{ fontWeight: 700 }}>{values.ticker}</span>?{' '}
                    </P>
                    <ConfirmBtn>Yolo</ConfirmBtn>{' '}
                    <A style={{ marginLeft: '20px' }}>Cancel</A>
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
