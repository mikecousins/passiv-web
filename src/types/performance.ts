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
  badTickers: string[];
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
