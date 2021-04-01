import React, { FunctionComponent } from 'react';
import SettingsChart from './SettingsChart';

type Props = {
  selected: boolean | undefined;
};
export const DetailedChart: FunctionComponent<Props> = ({ selected }) => {
  const data = React.useMemo(
    () => [
      {
        label: 'Total Value',
        data: detailedExample?.map((a) => {
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

  const series = React.useMemo(() => ({ type: 'line', showPoints: false }), []);

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

export default DetailedChart;

const detailedExample = [
  {
    date: '2021-03-31T07:52:45.092867Z',
    value: 124255.33914355,
    currency: 'CAD',
  },
  {
    date: '2021-03-28T07:52:45.092867Z',
    value: 124915.02183915,
    currency: 'CAD',
  },
  {
    date: '2021-03-25T07:52:45.092867Z',
    value: 124570.92349005,
    currency: 'CAD',
  },
  {
    date: '2021-03-22T07:52:45.092867Z',
    value: 124570.89349005,
    currency: 'CAD',
  },
  {
    date: '2021-03-19T07:52:45.092867Z',
    value: 124264.70047305,
    currency: 'CAD',
  },
  {
    date: '2021-03-16T07:52:45.092867Z',
    value: 122504.40017925,
    currency: 'CAD',
  },
  {
    date: '2021-03-13T07:52:45.092867Z',
    value: 122504.40017925,
    currency: 'CAD',
  },
  {
    date: '2021-03-10T07:52:45.092867Z',
    value: 121714.01579615,
    currency: 'CAD',
  },
  {
    date: '2021-03-07T07:52:45.092867Z',
    value: 121660.78579615,
    currency: 'CAD',
  },
  {
    date: '2021-03-04T07:52:45.092867Z',
    value: 119660.78579615,
    currency: 'CAD',
  },
  {
    date: '2021-03-01T07:52:45.092867Z',
    value: 119659.75383435,
    currency: 'CAD',
  },
  {
    date: '2021-02-26T07:52:45.092867Z',
    value: 120094.16574135,
    currency: 'CAD',
  },
  {
    date: '2021-02-23T07:52:45.092867Z',
    value: 120094.16574135,
    currency: 'CAD',
  },
  {
    date: '2021-02-20T07:52:45.092867Z',
    value: 120096.33574135,
    currency: 'CAD',
  },
  {
    date: '2021-02-17T07:52:45.092867Z',
    value: 120025.19154795,
    currency: 'CAD',
  },
  {
    date: '2021-02-14T07:52:45.092867Z',
    value: 120280.39144945,
    currency: 'CAD',
  },
  {
    date: '2021-02-11T07:52:45.092867Z',
    value: 119665.83427845,
    currency: 'CAD',
  },
  {
    date: '2021-02-08T07:52:45.092867Z',
    value: 119239.77075655,
    currency: 'CAD',
  },
  {
    date: '2021-02-05T07:52:45.092867Z',
    value: 118291.56864015,
    currency: 'CAD',
  },
  {
    date: '2021-02-02T07:52:45.092867Z',
    value: 114524.62174495,
    currency: 'CAD',
  },
  {
    date: '2021-01-30T07:52:45.092867Z',
    value: 111456.46334575,
    currency: 'CAD',
  },
  {
    date: '2021-01-27T07:52:45.092867Z',
    value: 112414.55715415,
    currency: 'CAD',
  },
  {
    date: '2021-01-24T07:52:45.092867Z',
    value: 115024.36421765,
    currency: 'CAD',
  },
  {
    date: '2021-01-21T07:52:45.092867Z',
    value: 113769.08368405,
    currency: 'CAD',
  },
  {
    date: '2021-01-18T07:52:45.092867Z',
    value: 112612.18076555,
    currency: 'CAD',
  },
  {
    date: '2021-01-15T07:52:45.092867Z',
    value: 111740.09076555,
    currency: 'CAD',
  },
  {
    date: '2021-01-12T07:52:45.092867Z',
    value: 111724.76843245,
    currency: 'CAD',
  },
  {
    date: '2021-01-09T07:52:45.092867Z',
    value: 111837.69877975,
    currency: 'CAD',
  },
  {
    date: '2021-01-06T07:52:45.092867Z',
    value: 107296.57419965,
    currency: 'CAD',
  },
  {
    date: '2021-01-03T07:52:45.092867Z',
    value: 103649.82232135,
    currency: 'CAD',
  },
  {
    date: '2020-12-31T07:52:45.092867Z',
    value: 103649.82232135,
    currency: 'CAD',
  },
  {
    date: '2020-12-28T07:52:45.092867Z',
    value: 104329.59195435,
    currency: 'CAD',
  },
  {
    date: '2020-12-25T07:52:45.092867Z',
    value: 104314.75435725,
    currency: 'CAD',
  },
  {
    date: '2020-12-22T07:52:45.092867Z',
    value: 104205.31651305,
    currency: 'CAD',
  },
  {
    date: '2020-12-19T07:52:45.092867Z',
    value: 104328.23833395,
    currency: 'CAD',
  },
  {
    date: '2020-12-16T07:52:45.092867Z',
    value: 103924.42090515,
    currency: 'CAD',
  },
  {
    date: '2020-12-13T07:52:45.092867Z',
    value: 103142.75670105,
    currency: 'CAD',
  },
  {
    date: '2020-12-10T07:52:45.092867Z',
    value: 103292.01909495,
    currency: 'CAD',
  },
  {
    date: '2020-12-07T07:52:45.092867Z',
    value: 103615.38746375,
    currency: 'CAD',
  },
  {
    date: '2020-12-04T07:52:45.092867Z',
    value: 103683.99072785,
    currency: 'CAD',
  },
  {
    date: '2020-12-01T07:52:45.092867Z',
    value: 103000.39107045,
    currency: 'CAD',
  },
  {
    date: '2020-11-28T07:52:45.092867Z',
    value: 103626.39597645,
    currency: 'CAD',
  },
  {
    date: '2020-11-25T07:52:45.092867Z',
    value: 102693.29067475,
    currency: 'CAD',
  },
  {
    date: '2020-11-22T07:52:45.092867Z',
    value: 101081.65463005,
    currency: 'CAD',
  },
  {
    date: '2020-11-19T07:52:45.092867Z',
    value: 100898.52611435,
    currency: 'CAD',
  },
  {
    date: '2020-11-16T07:52:45.092867Z',
    value: 101339.64427545,
    currency: 'CAD',
  },
  {
    date: '2020-11-13T07:52:45.092867Z',
    value: 99323.22273205,
    currency: 'CAD',
  },
  {
    date: '2020-11-10T07:52:45.092867Z',
    value: 97977.44731215,
    currency: 'CAD',
  },
  {
    date: '2020-11-07T07:52:45.092867Z',
    value: 96074.99933735,
    currency: 'CAD',
  },
  {
    date: '2020-11-04T07:52:45.092867Z',
    value: 94369.81972235,
    currency: 'CAD',
  },
  {
    date: '2020-11-01T07:52:45.092867Z',
    value: 89331.44246015,
    currency: 'CAD',
  },
  {
    date: '2020-10-29T07:52:45.092867Z',
    value: 90141.97294535,
    currency: 'CAD',
  },
  {
    date: '2020-10-26T07:52:45.092867Z',
    value: 91960.82179935,
    currency: 'CAD',
  },
  {
    date: '2020-10-23T07:52:45.092867Z',
    value: 93188.60262115,
    currency: 'CAD',
  },
  {
    date: '2020-10-20T07:52:45.092867Z',
    value: 92756.77222545,
    currency: 'CAD',
  },
  {
    date: '2020-10-17T07:52:45.092867Z',
    value: 93729.35742865,
    currency: 'CAD',
  },
  {
    date: '2020-10-14T07:52:45.092867Z',
    value: 94008.30184045,
    currency: 'CAD',
  },
  {
    date: '2020-10-11T07:52:45.092867Z',
    value: 93147.98492725,
    currency: 'CAD',
  },
  {
    date: '2020-10-08T07:52:45.092867Z',
    value: 92756.04670705,
    currency: 'CAD',
  },
  {
    date: '2020-10-05T07:52:45.092867Z',
    value: 91885.51097025,
    currency: 'CAD',
  },
  {
    date: '2020-10-02T07:52:45.092867Z',
    value: 90625.50799265,
    currency: 'CAD',
  },
  {
    date: '2020-09-29T07:52:45.092867Z',
    value: 88827.01154325,
    currency: 'CAD',
  },
  {
    date: '2020-09-26T07:52:45.092867Z',
    value: 87710.01326395,
    currency: 'CAD',
  },
  {
    date: '2020-09-23T07:52:45.092867Z',
    value: 86771.21538035,
    currency: 'CAD',
  },
  {
    date: '2020-09-20T07:52:45.092867Z',
    value: 88416.06978315,
    currency: 'CAD',
  },
  {
    date: '2020-09-17T07:52:45.092867Z',
    value: 87885.50253335,
    currency: 'CAD',
  },
  {
    date: '2020-09-14T07:52:45.092867Z',
    value: 86220.68764705,
    currency: 'CAD',
  },
  {
    date: '2020-09-11T07:52:45.092867Z',
    value: 85307.08312605,
    currency: 'CAD',
  },
  {
    date: '2020-09-08T07:52:45.092867Z',
    value: 84788.44886285,
    currency: 'CAD',
  },
  {
    date: '2020-09-05T07:52:45.092867Z',
    value: 85533.77949665,
    currency: 'CAD',
  },
  {
    date: '2020-09-02T07:52:45.092867Z',
    value: 88389.59555205,
    currency: 'CAD',
  },
  {
    date: '2020-08-30T07:52:45.092867Z',
    value: 87756.80940285,
    currency: 'CAD',
  },
  {
    date: '2020-08-27T07:52:45.092867Z',
    value: 87454.48020325,
    currency: 'CAD',
  },
  {
    date: '2020-08-24T07:52:45.092867Z',
    value: 87193.66753185,
    currency: 'CAD',
  },
  {
    date: '2020-08-21T07:52:45.092867Z',
    value: 86198.26946025,
    currency: 'CAD',
  },
  {
    date: '2020-08-18T07:52:45.092867Z',
    value: 86575.39905385,
    currency: 'CAD',
  },
  {
    date: '2020-08-15T07:52:45.092867Z',
    value: 86384.40118995,
    currency: 'CAD',
  },
  {
    date: '2020-08-12T07:52:45.092867Z',
    value: 84834.53967695,
    currency: 'CAD',
  },
  {
    date: '2020-08-09T07:52:45.092867Z',
    value: 84390.85405835,
    currency: 'CAD',
  },
  {
    date: '2020-08-06T07:52:45.092867Z',
    value: 84291.58294105,
    currency: 'CAD',
  },
  {
    date: '2020-08-03T07:52:45.092867Z',
    value: 82390.40714345,
    currency: 'CAD',
  },
  {
    date: '2020-07-31T07:52:45.092867Z',
    value: 82389.31225715,
    currency: 'CAD',
  },
  {
    date: '2020-07-28T07:52:45.092867Z',
    value: 82622.57873695,
    currency: 'CAD',
  },
  {
    date: '2020-07-25T07:52:45.092867Z',
    value: 82163.61573965,
    currency: 'CAD',
  },
  {
    date: '2020-07-22T07:52:45.092867Z',
    value: 80266.27273335,
    currency: 'CAD',
  },
  {
    date: '2020-07-19T07:52:45.092867Z',
    value: 80072.99921145,
    currency: 'CAD',
  },
  {
    date: '2020-07-16T07:52:45.092867Z',
    value: 79637.47621415,
    currency: 'CAD',
  },
  {
    date: '2020-07-13T07:52:45.092867Z',
    value: 78117.37210855,
    currency: 'CAD',
  },
  {
    date: '2020-07-10T07:52:45.092867Z',
    value: 78524.62951765,
    currency: 'CAD',
  },
  {
    date: '2020-07-07T07:52:45.092867Z',
    value: 77860.36904315,
    currency: 'CAD',
  },
  {
    date: '2020-07-04T07:52:45.092867Z',
    value: 77467.91898405,
    currency: 'CAD',
  },
  {
    date: '2020-07-01T07:52:45.092867Z',
    value: 76584.23334575,
    currency: 'CAD',
  },
  {
    date: '2020-06-28T07:52:45.092867Z',
    value: 73802.73597605,
    currency: 'CAD',
  },
  {
    date: '2020-06-25T07:52:45.092867Z',
    value: 75066.75843975,
    currency: 'CAD',
  },
  {
    date: '2020-06-22T07:52:45.092867Z',
    value: 74657.76840035,
    currency: 'CAD',
  },
  {
    date: '2020-06-19T07:52:45.092867Z',
    value: 74724.08810315,
    currency: 'CAD',
  },
  {
    date: '2020-06-16T07:52:45.092867Z',
    value: 74791.28542275,
    currency: 'CAD',
  },
  {
    date: '2020-06-13T07:52:45.092867Z',
    value: 73579.71463135,
    currency: 'CAD',
  },
  {
    date: '2020-06-10T07:52:45.092867Z',
    value: 74785.15899475,
    currency: 'CAD',
  },
  {
    date: '2020-06-07T07:52:45.092867Z',
    value: 75083.00433585,
    currency: 'CAD',
  },
  {
    date: '2020-06-04T07:52:45.092867Z',
    value: 73720.38477995,
    currency: 'CAD',
  },
  {
    date: '2020-06-01T07:52:45.092867Z',
    value: 72422.77632635,
    currency: 'CAD',
  },
  {
    date: '2020-05-29T07:52:45.092867Z',
    value: 72415.98649465,
    currency: 'CAD',
  },
  {
    date: '2020-05-26T07:52:45.092867Z',
    value: 71604.92004525,
    currency: 'CAD',
  },
  {
    date: '2020-05-23T07:52:45.092867Z',
    value: 70999.14993605,
    currency: 'CAD',
  },
  {
    date: '2020-05-20T07:52:45.092867Z',
    value: 71112.07634605,
    currency: 'CAD',
  },
  {
    date: '2020-05-17T07:52:45.092867Z',
    value: 69302.34472215,
    currency: 'CAD',
  },
  {
    date: '2020-05-14T07:52:45.092867Z',
    value: 66734.20625485,
    currency: 'CAD',
  },
  {
    date: '2020-05-11T07:52:45.092867Z',
    value: 66761.62900505,
    currency: 'CAD',
  },
  {
    date: '2020-05-08T07:52:45.092867Z',
    value: 66365.68547415,
    currency: 'CAD',
  },
  {
    date: '2020-05-05T07:52:45.092867Z',
    value: 65563.42859865,
    currency: 'CAD',
  },
  {
    date: '2020-05-02T07:52:45.092867Z',
    value: 64858.15299975,
    currency: 'CAD',
  },
  {
    date: '2020-04-29T07:52:45.092867Z',
    value: 66893.19642315,
    currency: 'CAD',
  },
  {
    date: '2020-04-26T07:52:45.092867Z',
    value: 64675.42537225,
    currency: 'CAD',
  },
  {
    date: '2020-04-23T07:52:45.092867Z',
    value: 59890.56643045,
    currency: 'CAD',
  },
  {
    date: '2020-04-20T07:52:45.092867Z',
    value: 60487.94141525,
    currency: 'CAD',
  },
  {
    date: '2020-04-17T07:52:45.092867Z',
    value: 60791.72691565,
    currency: 'CAD',
  },
  {
    date: '2020-04-14T07:52:45.092867Z',
    value: 60247.52630325,
    currency: 'CAD',
  },
  {
    date: '2020-04-11T07:52:45.092867Z',
    value: 59662.47511615,
    currency: 'CAD',
  },
  {
    date: '2020-04-08T07:52:45.092867Z',
    value: 58782.47445365,
    currency: 'CAD',
  },
  {
    date: '2020-04-05T07:52:45.092867Z',
    value: 54480.18885135,
    currency: 'CAD',
  },
  {
    date: '2020-04-02T07:52:45.092867Z',
    value: 55433.62495515,
    currency: 'CAD',
  },
];
