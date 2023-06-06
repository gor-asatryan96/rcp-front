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
};
