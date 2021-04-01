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
    date: '2021-03-31T07:51:09.315141Z',
    value: 124255.33914355,
    currency: 'CAD',
  },
  {
    date: '2021-03-01T07:51:09.315141Z',
    value: 119659.75383435,
    currency: 'CAD',
  },
  {
    date: '2021-02-01T07:51:09.315141Z',
    value: 113596.54599745,
    currency: 'CAD',
  },
  {
    date: '2021-01-01T07:51:09.315141Z',
    value: 103649.82232135,
    currency: 'CAD',
  },
  {
    date: '2020-12-01T07:51:09.315141Z',
    value: 103000.39107045,
    currency: 'CAD',
  },
  {
    date: '2020-11-01T07:51:09.315141Z',
    value: 89331.44246015,
    currency: 'CAD',
  },
  {
    date: '2020-10-01T07:51:09.315141Z',
    value: 88828.94363095,
    currency: 'CAD',
  },
  {
    date: '2020-09-01T07:51:09.315141Z',
    value: 87555.49929365,
    currency: 'CAD',
  },
  {
    date: '2020-08-01T07:51:09.315141Z',
    value: 82389.31225715,
    currency: 'CAD',
  },
  {
    date: '2020-07-01T07:51:09.315141Z',
    value: 76584.23334575,
    currency: 'CAD',
  },
  {
    date: '2020-06-01T07:51:09.315141Z',
    value: 72422.77632635,
    currency: 'CAD',
  },
  {
    date: '2020-05-01T07:51:09.315141Z',
    value: 64858.15299975,
    currency: 'CAD',
  },
  {
    date: '2020-04-01T07:51:09.315141Z',
    value: 54565.69594355,
    currency: 'CAD',
  },
];
