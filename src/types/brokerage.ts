export type Brokerage = {
  id: string;
  name: 'Questrade';
  url: 'https://questrade.com';
  authorization_types: [
    {
      type: 'read' | 'trade';
    },
  ];
};
