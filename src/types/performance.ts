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
  withdrawalTimeframe1Y: PastValue[];
  withdrawalTimeframeYTD: PastValue[];
  totalEquityTimeframe1Y: PastValue[];
  totalEquityTimeframeYTD: PastValue[];
  contributionStreak1Y: number;
  contributionMonthsContributed1Y: number;
  contributionTotalMonths1Y: number;
  contributionStreakYTD: number;
  contributionMonthsContributedYTD: number;
  contributionTotalMonthsYTD: number;
};
