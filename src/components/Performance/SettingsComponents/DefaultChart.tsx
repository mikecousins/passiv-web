import React, { FunctionComponent } from 'react';
import SettingsChart from './SettingsChart';

type Props = {
  selected: boolean | undefined;
};
export const DefaultChart: FunctionComponent<Props> = ({ selected }) => {
  const data = React.useMemo(
    () => [
      {
        label: 'Total Value',
        data: simpleExample?.map((a) => {
          let date = new Date(Date.parse(a.date));
          return [
            new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            a.value,
          ];
        }),
        color: '#04a286',
      },
    ],
    [],
  );

  const series = React.useMemo(() => ({ type: 'line', showPoints: true }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom', show: false },
      { type: 'linear', position: 'left', show: false },
    ],
    [],
  );

  return (
    <React.Fragment>
      <SettingsChart
        data={data}
        axes={axes}
        series={series}
        className={selected ? 'selected' : 'unselected'}
      />
    </React.Fragment>
  );
};

export default DefaultChart;

const simpleExample = [
  {
    date: '2021-04-01T07:17:10.246461Z',
    value: 41890.28891575,
    currency: 'CAD',
  },
  {
    date: '2021-03-01T07:17:10.246461Z',
    value: 39885.40223988333,
    currency: 'CAD',
  },
  {
    date: '2021-02-01T07:17:10.246461Z',
    value: 37864.43125351667,
    currency: 'CAD',
  },
  {
    date: '2021-01-01T07:17:10.246461Z',
    value: 34548.747104216665,
    currency: 'CAD',
  },
  {
    date: '2020-12-01T07:17:10.246461Z',
    value: 34332.312002516665,
    currency: 'CAD',
  },
  {
    date: '2020-11-01T07:17:10.246461Z',
    value: 29776.154455283333,
    currency: 'CAD',
  },
  {
    date: '2020-10-01T07:17:10.246461Z',
    value: 29608.53842235,
    currency: 'CAD',
  },
  {
    date: '2020-09-01T07:17:10.246461Z',
    value: 29184.00455745,
    currency: 'CAD',
  },
  {
    date: '2020-08-01T07:17:10.246461Z',
    value: 27462.06568295,
    currency: 'CAD',
  },
  {
    date: '2020-07-01T07:17:10.246461Z',
    value: 25527.02119475,
    currency: 'CAD',
  },
  {
    date: '2020-06-01T07:17:10.246461Z',
    value: 24139.867169216668,
    currency: 'CAD',
  },
  {
    date: '2020-05-01T07:17:10.246461Z',
    value: 21618.42709675,
    currency: 'CAD',
  },
];
