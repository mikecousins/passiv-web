import React, { FunctionComponent } from 'react';
import SettingsChart from './SettingsChart';

type Props = {
  selected: boolean | undefined;
};
const DetailedChart: FunctionComponent<Props> = ({ selected }) => {
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
    date: '2021-03-26T07:16:10.346015Z',
    value: 41637.17344895,
    currency: 'CAD',
  },
  {
    date: '2021-03-23T07:16:10.346015Z',
    value: 41522.50375065,
    currency: 'CAD',
  },
  {
    date: '2021-03-20T07:16:10.346015Z',
    value: 41420.43532965,
    currency: 'CAD',
  },
  {
    date: '2021-03-17T07:16:10.346015Z',
    value: 40833.57463025,
    currency: 'CAD',
  },
  {
    date: '2021-03-14T07:16:10.346015Z',
    value: 40833.57463025,
    currency: 'CAD',
  },
  {
    date: '2021-03-11T07:16:10.346015Z',
    value: 40570.15475661667,
    currency: 'CAD',
  },
  {
    date: '2021-03-08T07:16:10.346015Z',
    value: 40552.41142328333,
    currency: 'CAD',
  },
  {
    date: '2021-03-05T07:16:10.346015Z',
    value: 40552.41142328333,
    currency: 'CAD',
  },
  {
    date: '2021-03-02T07:16:10.346015Z',
    value: 39885.74475661667,
    currency: 'CAD',
  },
  {
    date: '2021-02-27T07:16:10.346015Z',
    value: 40030.27023088333,
    currency: 'CAD',
  },
  {
    date: '2021-02-24T07:16:10.346015Z',
    value: 40030.27023088333,
    currency: 'CAD',
  },
  {
    date: '2021-02-21T07:16:10.346015Z',
    value: 40030.99356421667,
    currency: 'CAD',
  },
  {
    date: '2021-02-18T07:16:10.346015Z',
    value: 39697.83959908333,
    currency: 'CAD',
  },
  {
    date: '2021-02-15T07:16:10.346015Z',
    value: 40092.31732951666,
    currency: 'CAD',
  },
  {
    date: '2021-02-12T07:16:10.346015Z',
    value: 40092.31732951666,
    currency: 'CAD',
  },
  {
    date: '2021-02-09T07:16:10.346015Z',
    value: 39829.06329778333,
    currency: 'CAD',
  },
  {
    date: '2021-02-06T07:16:10.346015Z',
    value: 39429.38279528333,
    currency: 'CAD',
  },
  {
    date: '2021-02-03T07:16:10.346015Z',
    value: 38298.59725018333,
    currency: 'CAD',
  },
  {
    date: '2021-01-31T07:16:10.346015Z',
    value: 37151.09786141667,
    currency: 'CAD',
  },
  {
    date: '2021-01-28T07:16:10.346015Z',
    value: 37854.40581811667,
    currency: 'CAD',
  },
  {
    date: '2021-01-25T07:16:10.346015Z',
    value: 38359.81440171666,
    currency: 'CAD',
  },
  {
    date: '2021-01-22T07:16:10.346015Z',
    value: 38340.35096945,
    currency: 'CAD',
  },
  {
    date: '2021-01-19T07:16:10.346015Z',
    value: 37932.76651651667,
    currency: 'CAD',
  },
  {
    date: '2021-01-16T07:16:10.346015Z',
    value: 37245.59546548333,
    currency: 'CAD',
  },
  {
    date: '2021-01-13T07:16:10.346015Z',
    value: 37232.232932416664,
    currency: 'CAD',
  },
  {
    date: '2021-01-10T07:16:10.346015Z',
    value: 37278.05690341667,
    currency: 'CAD',
  },
  {
    date: '2021-01-07T07:16:10.346015Z',
    value: 36313.951803016666,
    currency: 'CAD',
  },
  {
    date: '2021-01-04T07:16:10.346015Z',
    value: 34573.88158751667,
    currency: 'CAD',
  },
  {
    date: '2021-01-01T07:16:10.346015Z',
    value: 34548.747104216665,
    currency: 'CAD',
  },
  {
    date: '2020-12-29T07:16:10.346015Z',
    value: 34889.32021128333,
    currency: 'CAD',
  },
  {
    date: '2020-12-26T07:16:10.346015Z',
    value: 34770.44507758333,
    currency: 'CAD',
  },
  {
    date: '2020-12-23T07:16:10.346015Z',
    value: 34808.95783691667,
    currency: 'CAD',
  },
  {
    date: '2020-12-20T07:16:10.346015Z',
    value: 34774.925694683334,
    currency: 'CAD',
  },
  {
    date: '2020-12-17T07:16:10.346015Z',
    value: 34784.97612371667,
    currency: 'CAD',
  },
  {
    date: '2020-12-14T07:16:10.346015Z',
    value: 34180.16806808333,
    currency: 'CAD',
  },
  {
    date: '2020-12-11T07:16:10.346015Z',
    value: 34379.79242698333,
    currency: 'CAD',
  },
  {
    date: '2020-12-08T07:16:10.346015Z',
    value: 34696.77856861667,
    currency: 'CAD',
  },
  {
    date: '2020-12-05T07:16:10.346015Z',
    value: 34560.16912205,
    currency: 'CAD',
  },
  {
    date: '2020-12-02T07:16:10.346015Z',
    value: 34432.69634705,
    currency: 'CAD',
  },
  {
    date: '2020-11-29T07:16:10.346015Z',
    value: 34540.98138051666,
    currency: 'CAD',
  },
  {
    date: '2020-11-26T07:16:10.346015Z',
    value: 34314.860205083336,
    currency: 'CAD',
  },
  {
    date: '2020-11-23T07:16:10.346015Z',
    value: 33873.94254811667,
    currency: 'CAD',
  },
  {
    date: '2020-11-20T07:16:10.346015Z',
    value: 33692.77257065,
    currency: 'CAD',
  },
  {
    date: '2020-11-17T07:16:10.346015Z',
    value: 33780.324645283334,
    currency: 'CAD',
  },
  {
    date: '2020-11-14T07:16:10.346015Z',
    value: 33439.92642998333,
    currency: 'CAD',
  },
  {
    date: '2020-11-11T07:16:10.346015Z',
    value: 32962.86166751666,
    currency: 'CAD',
  },
  {
    date: '2020-11-08T07:16:10.346015Z',
    value: 32023.916578883334,
    currency: 'CAD',
  },
  {
    date: '2020-11-05T07:16:10.346015Z',
    value: 32013.29316425,
    currency: 'CAD',
  },
  {
    date: '2020-11-02T07:16:10.346015Z',
    value: 29986.504711916667,
    currency: 'CAD',
  },
  {
    date: '2020-10-30T07:16:10.346015Z',
    value: 29776.154455283333,
    currency: 'CAD',
  },
  {
    date: '2020-10-27T07:16:10.346015Z',
    value: 30513.901257116668,
    currency: 'CAD',
  },
  {
    date: '2020-10-24T07:16:10.346015Z',
    value: 31061.78681495,
    currency: 'CAD',
  },
  {
    date: '2020-10-21T07:16:10.346015Z',
    value: 30866.409787816665,
    currency: 'CAD',
  },
  {
    date: '2020-10-18T07:16:10.346015Z',
    value: 31242.02631245,
    currency: 'CAD',
  },
  {
    date: '2020-10-15T07:16:10.346015Z',
    value: 31298.443271016666,
    currency: 'CAD',
  },
  {
    date: '2020-10-12T07:16:10.346015Z',
    value: 31047.90040785,
    currency: 'CAD',
  },
  {
    date: '2020-10-09T07:16:10.346015Z',
    value: 31048.20115425,
    currency: 'CAD',
  },
  {
    date: '2020-10-06T07:16:10.346015Z',
    value: 30376.15440335,
    currency: 'CAD',
  },
  {
    date: '2020-10-03T07:16:10.346015Z',
    value: 30207.403377783332,
    currency: 'CAD',
  },
  {
    date: '2020-09-30T07:16:10.346015Z',
    value: 29436.19291055,
    currency: 'CAD',
  },
  {
    date: '2020-09-27T07:16:10.346015Z',
    value: 29235.59445135,
    currency: 'CAD',
  },
  {
    date: '2020-09-24T07:16:10.346015Z',
    value: 28894.32657105,
    currency: 'CAD',
  },
  {
    date: '2020-09-21T07:16:10.346015Z',
    value: 29173.378406683332,
    currency: 'CAD',
  },
  {
    date: '2020-09-18T07:16:10.346015Z',
    value: 29483.314454283332,
    currency: 'CAD',
  },
  {
    date: '2020-09-15T07:16:10.346015Z',
    value: 28909.24476675,
    currency: 'CAD',
  },
  {
    date: '2020-09-12T07:16:10.346015Z',
    value: 28434.599285316668,
    currency: 'CAD',
  },
  {
    date: '2020-09-09T07:16:10.346015Z',
    value: 28691.784797116667,
    currency: 'CAD',
  },
  {
    date: '2020-09-06T07:16:10.346015Z',
    value: 28510.143329783332,
    currency: 'CAD',
  },
  {
    date: '2020-09-03T07:16:10.346015Z',
    value: 28835.281702783333,
    currency: 'CAD',
  },
  {
    date: '2020-08-31T07:16:10.346015Z',
    value: 28954.453661183332,
    currency: 'CAD',
  },
  {
    date: '2020-08-28T07:16:10.346015Z',
    value: 29251.095230383333,
    currency: 'CAD',
  },
  {
    date: '2020-08-25T07:16:10.346015Z',
    value: 29067.88906328333,
    currency: 'CAD',
  },
  {
    date: '2020-08-22T07:16:10.346015Z',
    value: 28731.644216583332,
    currency: 'CAD',
  },
  {
    date: '2020-08-19T07:16:10.346015Z',
    value: 28801.169451183334,
    currency: 'CAD',
  },
  {
    date: '2020-08-16T07:16:10.346015Z',
    value: 28793.728422683333,
    currency: 'CAD',
  },
  {
    date: '2020-08-13T07:16:10.346015Z',
    value: 28153.839679416666,
    currency: 'CAD',
  },
  {
    date: '2020-08-10T07:16:10.346015Z',
    value: 28192.879722516667,
    currency: 'CAD',
  },
  {
    date: '2020-08-07T07:16:10.346015Z',
    value: 28129.21421855,
    currency: 'CAD',
  },
  {
    date: '2020-08-04T07:16:10.346015Z',
    value: 27807.157394183334,
    currency: 'CAD',
  },
  {
    date: '2020-08-01T07:16:10.346015Z',
    value: 27462.06568295,
    currency: 'CAD',
  },
  {
    date: '2020-07-29T07:16:10.346015Z',
    value: 27732.232789416666,
    currency: 'CAD',
  },
  {
    date: '2020-07-26T07:16:10.346015Z',
    value: 27386.80795545,
    currency: 'CAD',
  },
  {
    date: '2020-07-23T07:16:10.346015Z',
    value: 26498.131712916667,
    currency: 'CAD',
  },
  {
    date: '2020-07-20T07:16:10.346015Z',
    value: 26796.25828065,
    currency: 'CAD',
  },
  {
    date: '2020-07-17T07:16:10.346015Z',
    value: 26689.936102183332,
    currency: 'CAD',
  },
  {
    date: '2020-07-14T07:16:10.346015Z',
    value: 26422.470628583334,
    currency: 'CAD',
  },
  {
    date: '2020-07-11T07:16:10.346015Z',
    value: 26173.826536116667,
    currency: 'CAD',
  },
  {
    date: '2020-07-08T07:16:10.346015Z',
    value: 25988.701039983334,
    currency: 'CAD',
  },
  {
    date: '2020-07-05T07:16:10.346015Z',
    value: 25821.572905983332,
    currency: 'CAD',
  },
  {
    date: '2020-07-02T07:16:10.346015Z',
    value: 25780.55957265,
    currency: 'CAD',
  },
  {
    date: '2020-06-29T07:16:10.346015Z',
    value: 24937.87373075,
    currency: 'CAD',
  },
  {
    date: '2020-06-26T07:16:10.346015Z',
    value: 24606.39966865,
    currency: 'CAD',
  },
  {
    date: '2020-06-23T07:16:10.346015Z',
    value: 25018.44172565,
    currency: 'CAD',
  },
  {
    date: '2020-06-20T07:16:10.346015Z',
    value: 24906.98128095,
    currency: 'CAD',
  },
  {
    date: '2020-06-17T07:16:10.346015Z',
    value: 24905.242177216667,
    currency: 'CAD',
  },
  {
    date: '2020-06-14T07:16:10.346015Z',
    value: 24525.523134216666,
    currency: 'CAD',
  },
  {
    date: '2020-06-11T07:16:10.346015Z',
    value: 23882.627622416665,
    currency: 'CAD',
  },
  {
    date: '2020-06-08T07:16:10.346015Z',
    value: 25203.48429495,
    currency: 'CAD',
  },
  {
    date: '2020-06-05T07:16:10.346015Z',
    value: 25026.580159383335,
    currency: 'CAD',
  },
  {
    date: '2020-06-02T07:16:10.346015Z',
    value: 24315.625920316666,
    currency: 'CAD',
  },
  {
    date: '2020-05-30T07:16:10.346015Z',
    value: 24137.599103783334,
    currency: 'CAD',
  },
  {
    date: '2020-05-27T07:16:10.346015Z',
    value: 24079.909910916667,
    currency: 'CAD',
  },
  {
    date: '2020-05-24T07:16:10.346015Z',
    value: 23665.343815316668,
    currency: 'CAD',
  },
  {
    date: '2020-05-21T07:16:10.346015Z',
    value: 23614.26640225,
    currency: 'CAD',
  },
  {
    date: '2020-05-18T07:16:10.346015Z',
    value: 23109.66876585,
    currency: 'CAD',
  },
  {
    date: '2020-05-15T07:16:10.346015Z',
    value: 23096.905061283334,
    currency: 'CAD',
  },
  {
    date: '2020-05-12T07:16:10.346015Z',
    value: 21944.61422575,
    currency: 'CAD',
  },
  {
    date: '2020-05-09T07:16:10.346015Z',
    value: 22120.88670395,
    currency: 'CAD',
  },
  {
    date: '2020-05-06T07:16:10.346015Z',
    value: 21869.62291318333,
    currency: 'CAD',
  },
  {
    date: '2020-05-03T07:16:10.346015Z',
    value: 21618.42709675,
    currency: 'CAD',
  },
  {
    date: '2020-04-30T07:16:10.346015Z',
    value: 21938.20439325,
    currency: 'CAD',
  },
  {
    date: '2020-04-27T07:16:10.346015Z',
    value: 21823.929414316666,
    currency: 'CAD',
  },
  {
    date: '2020-04-24T07:16:10.346015Z',
    value: 21557.562272583335,
    currency: 'CAD',
  },
  {
    date: '2020-04-21T07:16:10.346015Z',
    value: 19678.556989016666,
    currency: 'CAD',
  },
  {
    date: '2020-04-18T07:16:10.346015Z',
    value: 20262.984176783335,
    currency: 'CAD',
  },
  {
    date: '2020-04-15T07:16:10.346015Z',
    value: 19801.031376316667,
    currency: 'CAD',
  },
  {
    date: '2020-04-12T07:16:10.346015Z',
    value: 19886.544583283332,
    currency: 'CAD',
  },
  {
    date: '2020-04-09T07:16:10.346015Z',
    value: 19886.544583283332,
    currency: 'CAD',
  },
  {
    date: '2020-04-06T07:16:10.346015Z',
    value: 19164.40553245,
    currency: 'CAD',
  },
  {
    date: '2020-04-03T07:16:10.346015Z',
    value: 18159.23332755,
    currency: 'CAD',
  },
];
