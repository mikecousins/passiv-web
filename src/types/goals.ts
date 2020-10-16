export type Goal = {
  id: string;
  title: string;
  created_date: string;
  target_date: string;
  total_value_target: number;
  monthly_contribution_target: number;
  contribution_frequency: string;
  portfolio_group: PortfolioGroup | null;
  completed: boolean;
  contribution_streak: number;
};

export type PortfolioGroup = {
  id: string;
  name: string;
};
