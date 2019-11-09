export type Brokerage = {
  id: string;
  name: 'Questrade' | 'Alpaca';
  url: 'https://questrade.com';
  enabled: boolean;
  authorization_types: [
    {
      type: 'read' | 'trade';
    },
  ];
};
