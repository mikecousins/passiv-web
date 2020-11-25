import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PerformanceChart, { ExpandChart } from './PerformanceChart';
import { parseDate, formatDate } from './PerformanceContributionChart';
import { DividendsAtDate } from '../../types/performance';
import {
  selectDividendTimeline,
  selectSelectedTimeframe,
} from '../../selectors/performance';
import {
  faQuestionCircle,
  faLongArrowAltDown,
  faLongArrowAltUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '../Tooltip';
import { H3 } from '../../styled/GlobalElements';

var emptyData: any[] = [];

export const PerformanceContributionChart = () => {
  const dividendTimeline = useSelector(selectDividendTimeline);
  let dividendHasData = false;
  dividendTimeline?.forEach((dividendObject) => {
    if (dividendObject?.dividends.length > 0) {
      dividendHasData = true;
      return;
    }
  });
  const timeframe = useSelector(selectSelectedTimeframe);
  const [className, setClassName] = useState('dividendsTimeline');
  const [lotsOfDifferentTickers, setlotsOfDifferentTickers] = useState(false);
  const [needToSetDefaults, setNeedToSetDefaults] = useState(true);

  if (needToSetDefaults && dividendTimeline !== undefined) {
    setNeedToSetDefaults(false);
    let dividendEvents = 0;
    dividendTimeline.forEach((divsAtDate) => {
      dividendEvents += divsAtDate.dividends.length;
    });
    if (dividendEvents > 50) {
      setClassName('dividendsTimelineExtended');
    }
    if (dividendEvents > 35) {
      setlotsOfDifferentTickers(true);
    }

    if (emptyData.length === 0) {
      // Populate empty data
      emptyData = getEmptyData(dividendTimeline, timeframe);
    }
  }

  let data = React.useMemo(
    () =>
      dividendTimeline !== undefined && dividendHasData
        ? getData(dividendTimeline, timeframe, lotsOfDifferentTickers)
        : emptyData,
    [dividendTimeline, timeframe, lotsOfDifferentTickers, dividendHasData],
  );

  const series = React.useMemo(() => ({ type: 'bar' }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left', stacked: true },
    ],
    [],
  );

  return (
    <React.Fragment>
      <Tooltip label="The dividends you have received during the selected timeframe">
        <H3>
          Dividend History{' '}
          <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 13 }} />
          <ExpandChart>
            {className === 'dividendsTimeline' && (
              <FontAwesomeIcon
                icon={faLongArrowAltDown}
                style={{ fontSize: 16, cursor: 'pointer' }}
                onClick={() => setClassName('dividendsTimelineExtended')}
              />
            )}
            {className === 'dividendsTimelineExtended' && (
              <FontAwesomeIcon
                icon={faLongArrowAltUp}
                style={{ fontSize: 16, cursor: 'pointer' }}
                onClick={() => setClassName('dividendsTimeline')}
              />
            )}
          </ExpandChart>
        </H3>
      </Tooltip>
      <PerformanceChart
        className={className}
        data={data}
        axes={axes}
        series={series}
        displayTotal={true}
      />
    </React.Fragment>
  );
};

const getData = (
  dividendTimeline: DividendsAtDate[] | undefined,
  timeframe: string,
  lotsOfDifferentTickers: boolean,
) => {
  if (dividendTimeline === undefined) {
    return [];
  }
  let data: any = [];

  // Add 0s for all tickers at all times
  const tickers: string[] = [];
  dividendTimeline.forEach((divsAtDate) => {
    divsAtDate.dividends.forEach((divAtDate) => {
      if (!tickers.includes(divAtDate.symbol)) {
        tickers.push(divAtDate.symbol);
      }
    });
  });
  const formattedTimes: string[] = [];
  const timeStrings: string[] = [];
  dividendTimeline.forEach((divsAtDate) => {
    const formatted = formatDate(divsAtDate.date, timeframe);
    if (!formattedTimes.includes(formatted)) {
      formattedTimes.push(formatted);
      timeStrings.push(divsAtDate.date);
    } else {
      formattedTimes.push(formatted + ' ');
      timeStrings.push(divsAtDate.date);
    }
  });
  tickers.forEach((ticker) => {
    const timeToAdd: any = [];
    timeStrings.forEach((time) => {
      timeToAdd.push([time, 0]);
    });
    if (lotsOfDifferentTickers) {
      data.push({
        label: ticker,
        data: timeToAdd,
      });
    } else {
      data.push({
        label: ticker,
        data: timeToAdd,
        color: getRandomColour(lotsOfDifferentTickers),
      });
    }
  });

  // Add actual data to lists
  dividendTimeline.forEach((divsAtDate) => {
    if (divsAtDate.dividends.length === 0) {
      data.push({ label: ' ', data: [[divsAtDate.date, 0]] });
    }
    divsAtDate.dividends.forEach((divAtDate) => {
      const filteredData = data.filter(
        (x: any) => x.label === divAtDate.symbol,
      );
      if (filteredData.length > 0) {
        filteredData[0].data.find((x: any) => {
          return x[0] === divsAtDate.date;
        })[1] += divAtDate.amount;
      } else {
        data.push({
          label: divAtDate.symbol,
          data: [[divsAtDate.date, divAtDate.amount]],
        });
      }
    });
  });

  // Sort all data
  data.forEach((d: any) => {
    d.data = d.data
      .sort((a: any, b: any) => parseDate(a[0]) - parseDate(b[0]))
      .map((a: any) => {
        let wrongYear =
          new Date(a[0]).getFullYear() !== new Date().getFullYear();
        let dateFormatted = formatDate(a[0], timeframe);
        // Dividend chart has 13 months, to ensure first and last month get
        // treated as seperate in stack chart, add a space to the earlier month's string
        return timeframe === '1Y' && wrongYear
          ? [dateFormatted + ' ', a[1]]
          : [dateFormatted, a[1]];
      });
  });
  return data;
};

const getEmptyData = (dividendTimeline: any[], timeframe: string) => {
  let emptyData = [];
  const formattedTimes: string[] = [];
  const timeStrings: string[] = [];
  const timeToAdd: any = [];
  dividendTimeline.forEach((divsAtDate) => {
    const formatted = formatDate(divsAtDate.date, timeframe);
    if (!formattedTimes.includes(formatted)) {
      formattedTimes.push(formatted);
      timeStrings.push(divsAtDate.date);
    } else {
      formattedTimes.push(formatted + ' ');
      timeStrings.push(divsAtDate.date);
    }
  });
  timeStrings.forEach((time) => {
    timeToAdd.push([time, 0]);
  });
  emptyData.push({
    label: 'Dividends',
    data: timeToAdd,
  });
  // Sort all data
  emptyData.forEach((d: any) => {
    d.data = d.data
      .sort((a: any, b: any) => parseDate(a[0]) - parseDate(b[0]))
      .map((a: any) => {
        let wrongYear =
          new Date(a[0]).getFullYear() !== new Date().getFullYear();
        let dateFormatted = formatDate(a[0], timeframe);
        // Dividend chart has 13 months, to ensure first and last month get
        // treated as seperate in stack chart, add a space to the earlier month's string
        return timeframe === '1Y' && wrongYear
          ? [dateFormatted + ' ', a[1]]
          : [dateFormatted, a[1]];
      });
  });
  return emptyData;
};

const getRandomColour = (lotsOfDifferentTickers: boolean) => {
  let r, g, b;
  if (lotsOfDifferentTickers) {
    r = parseInt((Math.random() * 255).toString()).toString(16);
    g = parseInt((Math.random() * 255).toString()).toString(16);
    b = parseInt((Math.random() * 255).toString()).toString(16);
  } else {
    r = parseInt((Math.random() * 70 + 20).toString()).toString(16);
    g = parseInt((Math.random() * 100 + 100).toString()).toString(16); //"a2";
    b = parseInt((Math.random() * 100 + 40).toString()).toString(16);
  }

  const hexColour = '#' + r + g + b;

  return hexColour;
};

export default PerformanceContributionChart;
