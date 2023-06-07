import axios from 'axios';

import { IOperatorListRequest } from './Autopush.type';

export const autopushAndApproveData = {
  async getOperatorsList() {
    const { data } = await axios.post<IOperatorListRequest[]>(
      '/setting/operators/list',
    );
    return data;
  },
};
