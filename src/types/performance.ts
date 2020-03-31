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
};
