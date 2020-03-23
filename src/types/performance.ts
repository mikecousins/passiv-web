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
  contributionTimeframe1Y: PastValue[];
  contributionTimeframeYTD: PastValue[];
  totalEquityTimeframe1Y: PastValue[];
  totalEquityTimeframeYTD: PastValue[];
  contribution_streak1Y: number;
  contribution_months_contributed1Y: number;
  contribution_total_months1Y: number;
  contribution_streakYTD: number;
  contribution_months_contributedYTD: number;
  contribution_total_monthsYTD: number;
};
