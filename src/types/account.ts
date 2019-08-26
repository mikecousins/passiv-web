type Meta = {
  type: string;
  status: string;
  is_billing: boolean;
  is_primary: boolean;
  client_account_type: string;
};

export type Account = {
  loading: JSX.Element;
  id: string;
  brokerage_authorization: string;
  portfolio_group: string;
  name: string;
  number: string;
  meta: Meta;
};
