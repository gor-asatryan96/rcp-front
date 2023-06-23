import axios from 'axios';

import { IOperatorListRequest } from './Autopush.type';

export const autopushAndApproveData = {
  async getOperatorsList() {
    const { data } = await axios.post<IOperatorListRequest[]>(
      '/setting/operators/list',
    );
    return data;
  },
  async getApproverTestMode() {
    const { data } = await axios.post('/setting/general/list');
    return data.approver_test_mode;
  },
};
