export type Goal = {
  id: string;
  title: string;
  created_date: string;
  target_date: string;
  total_value_target: number;
  contribution_target: number;
  average_monthly_contributions: number;
  projected_gain_by_end_date: number;
  contribution_frequency: string;
  portfolio_group: PortfolioGroup | null;
  return_rate: number;
  display_on_dashboard: boolean;
  completed: boolean;
  contribution_streak: number;
};

export type PortfolioGroup = {
  id: string;
  name: string;
};
