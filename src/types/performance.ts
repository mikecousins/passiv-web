import { Currency } from './currency';

export type PastValue = {
  value: number;
  date: string;
  currency: string;
};

export type Contributions = {
  contributions: number;
  date: string;
  currency: string;
};

export type PerformanceData = {
  contributions1Y: Contributions;
  contributionsYTD: Contributions;
  contributionsALL: Contributions;
  contributionTimeframe1Y: PastValue[];
  contributionTimeframeYTD: PastValue[];
  contributionTimeframeALL: PastValue[];
  contributionTimeframeCumulative1Y: PastValue[];
  contributionTimeframeCumulativeYTD: PastValue[];
  contributionTimeframeCumulativeALL: PastValue[];
  withdrawalTimeframe1Y: PastValue[];
  withdrawalTimeframeYTD: PastValue[];
  withdrawalTimeframeALL: PastValue[];
  totalEquityTimeframe1Y: PastValue[];
  totalEquityTimeframeYTD: PastValue[];
  totalEquityTimeframeALL: PastValue[];
  contributionStreak1Y: number;
  contributionMonthsContributed1Y: number;
  contributionTotalMonths1Y: number;
  contributionStreakYTD: number;
  contributionMonthsContributedYTD: number;
  contributionTotalMonthsYTD: number;
  contributionStreakALL: number;
  contributionMonthsContributedALL: number;
  contributionTotalMonthsALL: number;
  dividends1Y: Dividends[];
  dividendsALL: Dividends[];
  dividendsYTD: Dividends[];
  dividendIncome1Y: number;
  dividendIncomeALL: number;
  dividendIncomeYTD: number;
  dividendTimeline1Y: DividendsAtDate[];
  dividendTimelineYTD: DividendsAtDate[];
  dividendTimelineALL: DividendsAtDate[];
  monthlyDividends1Y: number;
  monthlyDividendsYTD: number;
  monthlyDividendsALL: number;
  fees1Y: number;
  feesYTD: number;
  feesALL: number;
  feeSavings1Y: number;
  feeSavingsYTD: number;
  feeSavingsALL: number;
  rateOfReturn1Y: number;
  rateOfReturnALL: number;
  rateOfReturnYTD: number;
  badTickers: string[];
  detailedMode: boolean;
};

export type PerformanceCustomData = {
  contributions: Contributions;
  contributionTimeframe: PastValue[];
  contributionTimeframeCumulative: PastValue[];
  withdrawalTimeframe: PastValue[];
  totalEquityTimeframe: PastValue[];
  contributionStreak: number;
  contributionMonthsContributed: number;
  contributionTotalMonths: number;
  dividends: Dividends[];
  dividendIncome: number;
  dividendTimeline: DividendsAtDate[];
  monthlyDividends: number;
  feeSavings: number;
  fees: number;
  badTickers: string[];
  rateOfReturn: number;
  detailedMode: boolean;
};

export type DividendsAtDate = {
  date: string;
  dividends: TickerOnlyDividend[];
};

export type TickerOnlyDividend = {
  symbol: string;
  amount: number;
  currency: string;
};

export type Dividends = {
  symbol: ReportingSymbol;
  amount: number;
  currency: string;
};

export type AdjustedCostBasis = {
  symbol: ReportingSymbol;
  units_owned: number;
  adjusted_cost: number;
};

export type ReportingSymbol = {
  id: string;
  symbol: string;
  description: string;
  currency: Currency;
};

export type ReportingSettings = {
  detailed_view: boolean;
  show_dividend_data: boolean;
  show_return_rate: boolean;
};
