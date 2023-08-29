import {
  IProjectGeneralLimits,
  TProjectId,
} from 'redux/reducers/projects/projects.types';

export interface IProjectResponse extends IProjectGeneralLimits {
  id: TProjectId;
  project: string;
  project_db: string;
}

export interface IProjectInfo {
  approver_test_mode: 0 | 1;
  casino_ggr_limit: string;
  casino_winning_limit: string;
  daily_withdraw_limit: string;
  games_ggr_limit: string;
  games_winning_limit: string;
  id: number;
  is_active: 0 | 1;
  manual_push_route: string;
  mi_limit: string;
  project: string;
  project_api_key: string;
  project_db: string;
  project_tz: string;
  rollback_limit_percentage: string;
  sport_ggr_limit: string;
  sport_winning_limit: string;
  used_unused_percentage: string;
}
