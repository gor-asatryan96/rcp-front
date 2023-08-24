import axios from 'axios';

import { IIndividualLimits } from './Individual.types';

export const individualLimitsData = {
  async getIndividualLimits(page: number, pageSize: number) {
    const { data } = await axios.post<{
      list: IIndividualLimits[];
      count: number;
    }>('/setting/individual-limit/list', {
      limit: pageSize,
      page,
      orderBy: 'user_id',
      orderDir: 'DESC',
    });
    return data;
  },
  async getIndividualLimitsWithPhone(
    page: number,
    pageSize: number,
    phone: string,
  ) {
    const { data } = await axios.post<{
      list: IIndividualLimits[];
      count: number;
    }>('/setting/individual-limit/existing-list', {
      limit: pageSize,
      page,
      orderBy: 'user_id',
      orderDir: 'DESC',
      phone,
    });
    return data;
  },
  async getIndividualLimitsWithUserId(
    page: number,
    pageSize: number,
    id: string,
  ) {
    const { data } = await axios.post<{
      list: IIndividualLimits[];
      count: number;
    }>('/setting/individual-limit/existing-list', {
      limit: pageSize,
      page,
      orderBy: 'user_id',
      orderDir: 'DESC',
      id,
    });
    return data;
  },
};
