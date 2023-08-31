import axios from 'axios';

import { IProjectInfo, IProjectResponse } from './projects.service.types';

import type {
  ICountry,
  IGeneralListSetResponse,
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
  async getProjectInfo() {
    const { data } = await axios.post<IProjectInfo>('/home/project/info');
    return data;
  },
  async getGeneralLimits() {
    const { data } = await axios.post<IProjectGeneralLimits>(
      '/setting/daily-limit/list',
    );
    return data;
  },
  async setGeneralLimits(body: IProjectGeneralLimits) {
    const { tft, ...rest } = body;
    const { data } = await axios.post<IGeneralListSetResponse>(
      '/setting/daily-limit/set',
      rest,
      {
        headers: {
          'x-tf-token': tft,
        },
      },
    );
    return data;
  },
};
