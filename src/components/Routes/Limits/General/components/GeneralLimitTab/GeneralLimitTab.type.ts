export interface IGeneraList {
  daily_withdraw_limit: number;
  used_unused_percentage: number;
  sport_winning_limit: number;
  casino_winning_limit: number;
  games_winning_limit: number;
  sport_ggr_limit: number;
  casino_ggr_limit: number;
  games_ggr_limit: number;
  rollback_limit_percentage: number;
  tft: string;
}

export interface InputNumberProps {
  value: number;
  onChange: (value: number) => void;
}
