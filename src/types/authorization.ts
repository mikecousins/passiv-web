import { Brokerage } from './brokerage';

export type Authorization = {
  id: string;
  created_date: string;
  brokerage: Brokerage;
  name: string;
  type: 'read' | 'trade';
  disabled: boolean;
  disabled_date: string;
  meta: any;
};
