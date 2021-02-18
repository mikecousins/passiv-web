import { Account } from './account';

export interface GroupData {
  id: string;
  name: string;
  loading: boolean;
  setupComplete: boolean;
  rebalance: boolean;
  hasAccounts: boolean;
  accounts: Account[];
  model_portfolio: string;
}
