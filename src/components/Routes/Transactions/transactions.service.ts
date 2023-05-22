import axios from 'axios';

import { ITRXFilters, ITransaction } from './helpers/Transactions.types';

export const transactionsData = {
  async getTransactions() {
    const { data } = await axios.post<{
      list: ITransaction[];
      count: number;
      amount: number;
    }>('/transaction/list', {
      limit: 20,
      page: 1,
      orderBy: 'updated_at',
      orderDir: 'DESC',
      dateFrom: '2022-01-01 17:00:00',
      dateTo: '2024-01-05 17:00:00',
      status: 'CANCELED',
      opType: ['IN-EWPUSH-MPESA'],
    });
    return data;
  },
};

export const transactionsFilters = {
  async getTRXFilters() {
    const { data } = await axios.post<{ op_types: ITRXFilters }>(
      '/transaction/filters',
    );
    return data.op_types;
  },
};
