import axios from 'axios';

import { IProjectResponse } from './projects.service.types';

import type {
  ICountry,
  IProjectGeneralLimits,
  TProjectId,
} from 'redux/reducers/projects/projects.types';

export const ProjectService = {
  async getProjectList() {
    const { data } = await axios.post<ICountry[]>('/home/project/list');
    return data;
  },
  async chooseProject(id: TProjectId) {
    const { data } = await axios.post<IProjectResponse>(
      '/home/project/choose',
      {
        projectId: id,
      },
    );
    return data;
  },
  async getGeneralLimits() {
    const { data } = await axios.post<IProjectGeneralLimits>(
      '/setting/daily-limit/list',
    );
    return data;
  },
};
