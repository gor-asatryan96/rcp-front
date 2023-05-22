import axios from 'axios';

import { IIndividualLimits } from './Individual.types';

export const individualLimitsData = {
  async getIndividualLimits() {
    const { data } = await axios.post<{ list: IIndividualLimits[] }>(
      '/setting/individual-limit/list',
      {
        limit: 20,
        page: 1,
        orderBy: 'user_id',
        orderDir: 'DESC',
      },
    );
    return data.list;
  },
};
