import styled from '@emotion/styled';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@reach/dialog';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalGroupHoldings } from '../selectors/groups';
import { Button } from '../styled/Button';
import { A, H2, P, BulletUL } from '../styled/GlobalElements';
import { StyledSelect } from './PortfolioGroupSettings/OrderTargetAllocations';
import { SymbolDetail } from './SymbolDetail';
import { selectGlobalPreferredCurrency } from '../selectors/groups';
import Number from './Number';

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
    padding: 2px 10px;
    span {
      display: none;
    }
  }
`;
const SelectContainer = styled.div`
  width: 100%;
`;

const ButtonContainer = styled.div`
  padding-top: 20px;
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

const LoadingContainer = styled.div`
  width: 100%;
`;

const FormContainer = styled.div`
  padding-top: 40px;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const IconBox = styled.div`
  width: 100%;
  font-size: 3em;
`;

const SpacedH2 = styled(H2)`
  line-height: 1.3;
  padding-bottom: 20px;
`;

const ExtraSpacedH2 = styled(SpacedH2)`
  padding-top: 20px;
`;

const BottomSpacedH2 = styled(ExtraSpacedH2)`
  padding-bottom: 0;
`;

const CloseButtonBox = styled.div`
  font-size: 1.5em;
`;

const LargeStyledSelect = styled(StyledSelect)`
  padding: 11px 82px 10px 14px;
  font-size: 1.5em;
  background-position: calc(100% - 27px) calc(1em - 1px),
    calc(100% - 22px) calc(1em - 1px), 100% 0;
  max-width: 80%;
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

const SmallBulletUL = styled(BulletUL)`
  li {
    line-height: 1.5;
    margin: 0;
  }
`;

const WSB = () => {
  const totalEquity = useSelector(selectTotalGroupHoldings);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);

  const [showCountDown, setShowCountDown] = useState(false);
  const [cancel, setCancel] = useState(false);

  const preferredCurrency = useSelector(selectGlobalPreferredCurrency);

  const tickers = [
    {
      symbol: 'GME',
      name: 'GameStop Corp.',
      description:
        "An impeccible investment in the future of America's strip malls.",
      price: 194.42,
    },
    {
      symbol: 'AMC',
      name: 'AMC Entertainment Holdings, Inc.',
      description: 'A longterm bet against comfortable livingrooms.',
      price: 10.25,
    },
    {
      symbol: 'NOK',
      name: 'Nokia Corporation',
      description: 'A conservative pick for the return of simpler times.',
      price: 3.99,
    },
    {
      symbol: 'NOW',
      name: 'ServiceNow, Inc.',
      description: 'A boring business is the best business.',
      price: 505.8,
    },
    {
      symbol: 'BB',
      name: 'BlackBerry Limited',
      description: 'A bold wager for the return of the king of the north.',
      price: 8.55,
    },
    {
      symbol: 'REAL',
      name: 'The RealReal, Inc.',
      description:
        'A confident statement that diamond hands need fancy handbags.',
      price: 22.63,
    },
    {
      symbol: 'TELL',
      name: 'Tellurian Inc.',
      description:
        'A courageous stake to bring tropical weather to the entire world.',
      price: 2.39,
    },
  ];

  const getStockByTicker = (ticker: string) => {
    return tickers.find((t) => t.symbol === ticker);
  };

  const calc = (ticker: string) => {
    let total = 0;
    const stock = getStockByTicker(ticker);
    if (stock !== undefined) {
      total = totalEquity / stock.price;
    }
    return Math.round(total);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setShowCountDown(false);
    setCancel(false);
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
          }, 6000);
        }}
      >
        YOLO{' '}
        <span role="img" aria-label="emoji">
          💎👐
        </span>
      </YoloBtn>
      <Dialog
        isOpen={showDialog}
        onDismiss={closeDialog}
        style={{ borderRadius: '4px', marginTop: '150px' }}
        aria-labelledby="dialog1Title"
        aria-describedby="dialog1Desc"
      >
        <CloseButtonBox>
          <FontAwesomeIcon
            icon={faTimes}
            style={{ float: 'right', cursor: 'pointer' }}
            onClick={closeDialog}
          />
        </CloseButtonBox>
        {loading ? (
          <>
            <LoadingContainer>
              {loadingMsg ? (
                <SpacedH2>
                  Crawling WallStreetBets for trending stocks ...
                </SpacedH2>
              ) : (
                <>
                  <SpacedH2>Identified {tickers.length} meme stocks.</SpacedH2>
                  <P>Ranking by probability of tendies ...</P>
                </>
              )}
            </LoadingContainer>
            <SpinnerContainer>
              <IconBox>
                <FontAwesomeIcon icon={faSpinner} spin />
              </IconBox>
            </SpinnerContainer>
          </>
        ) : showCountDown ? (
          <>
            <SpacedH2>GUH, you actually did it!</SpacedH2>
            <P>That was a risky click if there ever was one.</P>
            <P>
              Your portfolio has NOT been liquidated, but you clearly need to
              take a break from the markets.
            </P>
            <div
              style={{
                width: '100%',
                height: '0',
                paddingBottom: '56%',
                position: 'relative',
              }}
            >
              <iframe
                src="https://giphy.com/embed/ygzdQq98HgcLBCacep"
                title="giphy2"
                width="100%"
                height="100%"
                style={{ position: 'absolute' }}
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
              ></iframe>
            </div>
            <ButtonContainer>
              <Button onClick={closeDialog}>Close</Button>
            </ButtonContainer>
          </>
        ) : cancel ? (
          <>
            <SpacedH2>Whew, that was close!</SpacedH2>
            <P>
              Nice job on doing the responsible thing and sticking to your plan.
            </P>
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
            <ButtonContainer>
              <Button onClick={closeDialog}>Close</Button>
            </ButtonContainer>
          </>
        ) : (
          <Formik
            initialValues={{
              ticker: '',
              mode: '',
            }}
            onSubmit={() => {}}
          >
            {({ values }) => {
              const stock = getStockByTicker(values.ticker);
              return (
                <Form>
                  <SpacedH2>Select your YOLO stock:</SpacedH2>
                  <SelectContainer>
                    <LargeStyledSelect as="select" name="ticker">
                      {<option value="" label="Choose ..." />}
                      {tickers.map((ticker) => {
                        return (
                          <option value={ticker.symbol} key={ticker.symbol}>
                            {ticker.symbol}
                          </option>
                        );
                      })}
                    </LargeStyledSelect>
                  </SelectContainer>
                  {stock !== undefined && (
                    <FormContainer>
                      <P>
                        <SymbolDetail symbol={stock} hideName={true} />{' '}
                        {stock.name}
                      </P>
                      <P>DD: {stock.description}</P>
                      <BottomSpacedH2>Are you a bull or a bear?</BottomSpacedH2>
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
                    </FormContainer>
                  )}
                  {values.mode !== '' && values.ticker !== '' && (
                    <>
                      <ExtraSpacedH2>
                        Liquidate all positions and YOLO?
                      </ExtraSpacedH2>
                      <P>
                        You have{' '}
                        <Number
                          value={totalEquity}
                          currency={
                            preferredCurrency
                              ? preferredCurrency.code
                              : undefined
                          }
                        />{' '}
                        of investible assets at your disposal.
                      </P>

                      {values.mode === 'rocket' ? (
                        <P>
                          Confirm to close all positions and buy{' '}
                          <Number
                            value={calc(values.ticker)}
                            decimalPlaces={0}
                          />{' '}
                          shares of{' '}
                          <SymbolDetail symbol={stock} hideName={true} />
                        </P>
                      ) : (
                        <P>
                          Confirm to close all positions and short{' '}
                          <Number
                            value={calc(values.ticker)}
                            decimalPlaces={0}
                          />{' '}
                          shares of{' '}
                          <SymbolDetail symbol={stock} hideName={true} />
                        </P>
                      )}
                      <div>
                        <ConfirmBtn onClick={() => setShowCountDown(true)}>
                          Execute YOLO
                        </ConfirmBtn>{' '}
                        <A
                          style={{ marginLeft: '20px' }}
                          onClick={() => setCancel(true)}
                        >
                          Cancel
                        </A>
                      </div>
                      <Disclaimer>
                        Disclaimers:
                        <SmallBulletUL>
                          <li>This is not financial advice.</li>
                          <li>
                            This will not actually liquidate your holdings
                            because that's insane.
                          </li>
                          <li>
                            You just{' '}
                            {values.mode === 'rocket' ? 'like' : 'hate'} the
                            stock, right?
                          </li>
                        </SmallBulletUL>
                      </Disclaimer>
                    </>
                  )}
                </Form>
              );
            }}
          </Formik>
        )}
      </Dialog>
    </Container>
  );
};

export default WSB;
