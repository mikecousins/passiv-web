import React from 'react';
import styled from '@emotion/styled';
import PerformanceChart from './PerformanceChart';
import { useSelector, useDispatch } from 'react-redux';
import { loadTotalEquityTimeframe } from '../../actions';
import { loadContributionTimeframe } from '../../actions';
//import { selectTotalEquityTimeframe } from '../../selectors/performance';
import { selectContributionTimeframe } from '../../selectors/performance';

type Props = {
  selectedTimeframe: string;
};

export const PerformanceTotalValueChart = (props: Props) => {
  const totalEquityData = [
    {
      date: '2020-01-20T22:17:43.493523Z',
      value: 62718.309488299994,
      currency: 'CAD',
    },
    {
      date: '2019-12-21T22:17:43.493523Z',
      value: 55068.551934300005,
      currency: 'CAD',
    },
    {
      date: '2019-11-21T22:17:43.493523Z',
      value: 53846.918146100004,
      currency: 'CAD',
    },
    {
      date: '2019-10-22T22:17:43.493523Z',
      value: 51773.1310675,
      currency: 'CAD',
    },
    {
      date: '2019-09-22T22:17:43.493523Z',
      value: 48576.1133785,
      currency: 'CAD',
    },
    {
      date: '2019-08-23T22:17:43.493523Z',
      value: 44485.5166969,
      currency: 'CAD',
    },
    {
      date: '2019-07-24T22:17:43.493523Z',
      value: 42318.3813189,
      currency: 'CAD',
    },
    {
      date: '2019-06-24T22:17:43.493523Z',
      value: 41872.611761299995,
      currency: 'CAD',
    },
    {
      date: '2019-05-25T22:17:43.493523Z',
      value: 38471.2064511,
      currency: 'CAD',
    },
    {
      date: '2019-04-25T22:17:43.493523Z',
      value: 32659.781526699997,
      currency: 'CAD',
    },
    {
      date: '2019-03-26T22:17:43.493523Z',
      value: 29145.148460299995,
      currency: 'CAD',
    },
    {
      date: '2019-02-24T22:17:43.493523Z',
      value: 21995.148891499997,
      currency: 'CAD',
    },
    {
      date: '2019-01-25T22:17:43.493523Z',
      value: 17793.2412321333,
      currency: 'CAD',
    },
  ];

  const data = React.useMemo(
    () => [
      {
        label: 'Total Equity',
        data: totalEquityData.map(a => {
          let date = new Date(Date.parse(a.date));
          return [
            new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            a.value,
          ];
        }),
      },
    ],
    [],
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    [],
  );

  //const totalEquityTimeframe = useSelector(selectContributionTimeframe);

  return <PerformanceChart data={data} axes={axes} />;
};

export default PerformanceTotalValueChart;
