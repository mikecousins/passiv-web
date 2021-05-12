export type Brokerage = {
  id: string;
  name:
    | 'Questrade'
    | 'Alpaca'
    | 'Interactive Brokers'
    | 'Plaid'
    | 'TD Ameritrade'
    | 'Zerodha'
    | 'Unocoin'
    | 'Kraken'
    | 'Coinbase'
    | 'Bitbuy'
    | 'Wealthica';
  url: 'https://questrade.com';
  slug: string;
  enabled: boolean;
  maintenance_mode: boolean;
  allows_fractional_units: boolean;
  allows_trading: boolean;
  authorization_types: [
    {
      type: 'read' | 'trade';
      auth_type: 'OATH' | 'TOKEN';
    },
  ];
};
