import axios from 'axios';

import { transactionFilterOptions } from './helpers/Constans';
import { ITRXFilters, ITransaction } from './helpers/Transactions.types';

export const transactionsData = {
  async getTransactions(pages: number) {
    const { data } = await axios.post<{
      list: ITransaction[];
      count: number;
      amount: number;
    }>('/transaction/list', {
      limit: 10,
      page: pages,
      orderBy: 'updated_at',
      orderDir: 'DESC',
      dateFrom: '2022-01-01 17:00:00',
      dateTo: '2024-01-05 17:00:00',
      // status: 'PENDING',
      // opType: [],
    });
    return data;
  },
};

export const transactionsFilters = {
  async getTRXFilters() {
    const { data } = await axios.post<{ op_types: ITRXFilters }>(
      '/transaction/filters',
    );
    return { ...transactionFilterOptions, ...data.op_types } as ITRXFilters;
  },
};
