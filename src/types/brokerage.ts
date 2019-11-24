export type Brokerage = {
  id: string;
  name: 'Questrade' | 'Alpaca' | 'Interactive Brokers';
  url: 'https://questrade.com';
  enabled: boolean;
  authorization_types: [
    {
      type: 'read' | 'trade';
    },
  ];
};
