import {
  IProjectGeneralLimits,
  TProjectId,
} from 'redux/reducers/projects/projects.types';

export interface IProjectResponse extends IProjectGeneralLimits {
  id: TProjectId;
  project: string;
  project_db: string;
}
