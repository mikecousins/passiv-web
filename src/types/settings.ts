export type Settings = {
  email: string;
  name: string;
  receive_cash_notifications: boolean;
  receive_drift_notifications: boolean;
  user_trial_activated: boolean;
  activated_trial_date: number | null;
  drift_threshold: string;
  trade_with_limit_orders: boolean;
  price_limit_threshold: string;
  preferred_currency: string;
  demo: boolean;
  api_enabled: boolean;
  referral_code: string;
  sms_2fa_enabled: boolean;
  phone_number: string | null;
};
