import { Brokerage } from './groupInfo';

export type Authorization = {
  id: string;
  created_date: string;
  brokerage: Brokerage;
  name: string;
  type: 'read' | 'trade';
  disabled: boolean;
  disabled_date: string;
};
