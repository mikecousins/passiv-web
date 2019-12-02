export type SubscriptionData = {
  type: 'paid' | 'free';
  details: {
    period: string;
    price: number;
    tax: number;
    period_end: string;
    canceled: boolean;
  };
  cardState: 'VALID';
  coupon: {
    amount_off: number | null; // maybe
    currency: string;
    duration: number; // maybe
    duration_in_months: number; // maybe
    percent_off: number | null; // maybe
    redeem_by: string | null; // maybe
    code: string;
  };
  cardDetails: {
    brand: 'Visa';
    expiryYear: number;
    expiryMonth: number;
    lastFourDigits: string;
  };
  permissions: string[];
};
