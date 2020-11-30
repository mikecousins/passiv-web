import { Currency } from './currency';

type ContextualMessage = {
  name: string;
};

export type Settings = {
  email: string;
  name: string;
  receive_cash_notifications: boolean;
  receive_drift_notifications: boolean;
  receive_new_symbol_notifications: boolean;
  user_trial_activated: boolean;
  activated_trial_date: number | null;
  drift_threshold: string;
  trade_with_limit_orders: boolean;
  price_limit_threshold: string;
  preferred_currency: string;
  demo: boolean;
  api_enabled: boolean;
  referral_code: string;
  referral_value: number;
  referral_currency: Currency;
  sms_2fa_enabled: boolean;
  phone_number: string | null;
  otp_2fa_enabled: boolean;
  show_contribution_chart: boolean;
  show_total_value_chart: boolean;
  show_total_holdings: boolean;
  show_contributions1Y: boolean;
  show_2columns_dashboard: boolean;
  contextual_messages: ContextualMessage[];
  affiliate_bonus_amount: number;
};
