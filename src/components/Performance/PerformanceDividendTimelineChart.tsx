import React from 'react';
import { useSelector } from 'react-redux';
import PerformanceChart from './PerformanceChart';
import {
  dtfMonth,
  parseDate,
  formatDate,
} from './PerformanceContributionChart';
import { DividendsAtDate } from '../../types/performance';
import {
  selectDividendTimeline,
  selectSelectedTimeframe,
} from '../../selectors/performance';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toDollarString } from './Performance';
import Tooltip from '../Tooltip';
import { H3 } from '../../styled/GlobalElements';

export const PerformanceContributionChart = () => {
  const dividendTimeline = useSelector(selectDividendTimeline);
  const timeframe = useSelector(selectSelectedTimeframe);
  const dividendTimelineData = getData(dividendTimeline, timeframe);

  let data = React.useMemo(
    () =>
      dividendTimeline !== undefined
        ? getData(dividendTimeline, timeframe)
        : [{ data: [] }],
    [dividendTimeline, timeframe],
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
          Dividends{' '}
          <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 13 }} />
        </H3>
      </Tooltip>
      {}
      <PerformanceChart
        className="dividends"
        data={data}
        axes={axes}
        series={series}
      />
    </React.Fragment>
  );
};

class DividendAtDate {
  symbol: string;
  amount: number;
  date: string;
  constructor(symbol: string, amount: number, date: string) {
    this.symbol = symbol;
    this.amount = amount;
    this.date = date;
  }
}

const getData = (
  dividendTimeline: DividendsAtDate[] | undefined,
  timeframe: string,
) => {
  if (dividendTimeline === undefined) {
    return [];
  }
  let data: any = [];

  // Add 0s for all tickers at all times
  const tickers: string[] = [];
  dividendTimeline.forEach(divsAtDate => {
    divsAtDate.dividends.forEach(divAtDate => {
      if (!tickers.includes(divAtDate.symbol)) {
        tickers.push(divAtDate.symbol);
      }
    });
  });
  const formattedTimes: string[] = [];
  const timeStrings: string[] = [];
  dividendTimeline.forEach(divsAtDate => {
    const formatted = formatDate(divsAtDate.date, timeframe);
    if (!formattedTimes.includes(formatted)) {
      formattedTimes.push(formatted);
      timeStrings.push(divsAtDate.date);
    }
  });
  tickers.forEach(ticker => {
    const timeToAdd: any = [];
    timeStrings.forEach(time => {
      timeToAdd.push([time, 0]);
    });
    data.push({ label: ticker, data: timeToAdd, color: getRandomColour() });
  });

  // Add actual data to lists
  dividendTimeline.forEach(divsAtDate => {
    if (divsAtDate.dividends.length === 0) {
      data.push({ label: '', data: [[divsAtDate.date, 0]] });
    }
    divsAtDate.dividends.forEach(divAtDate => {
      const filteredData = data.filter(
        (x: any) => x.label === divAtDate.symbol,
      );
      if (filteredData.length > 0) {
        filteredData[0].data.push([divsAtDate.date, divAtDate.amount]);
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
        let dateFormatted = formatDate(a[0], timeframe);
        return [dateFormatted, a[1]];
      });
  });
  return data;
};

const getRandomColour = () => {
  const r = parseInt((Math.random() * 70 + 20).toString()).toString(16);
  const g = parseInt((Math.random() * 60 + 120).toString()).toString(16); //"a2";
  const b = parseInt((Math.random() * 100 + 40).toString()).toString(16);

  const hexColour = '#' + r + g + b;
  console.log(hexColour);

  return hexColour;
};

export default PerformanceContributionChart;
