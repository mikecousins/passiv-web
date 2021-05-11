export interface ReferralData {
  referralCode: string | null;
}

export type Invoice = {
  pdf_url: string;
  end_date: string;
};

export type Charity = {
  id: string;
  charity_name: string;
};
