export interface IProjectGeneralLimits {
  daily_withdraw_limit: number;
  used_unused_percentage: number;
  sport_winning_limit: number;
  casino_winning_limit: number;
  games_winning_limit: number;
  sport_ggr_limit: number;
  casino_ggr_limit: number;
  games_ggr_limit: number;
}

export type TProjectId = number;

export interface ICountry {
  id: TProjectId;
  project: string;
  is_active: 0 | 1;
}

export interface IProjectsSlice {
  activeProjectId: TProjectId | null;
  countries: ICountry[];
  project: string;
  project_db: string;
  generalLimits: IProjectGeneralLimits;
  isLoading: boolean;
  isGeneralLimitsLoading: boolean;
}
