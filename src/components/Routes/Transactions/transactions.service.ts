import axios from 'axios';

import { transactionFilterOptions } from './helpers/Constans';
import {
  ITRXFilters,
  ITransaction,
  TRXfiltersForm,
} from './helpers/Transactions.types';

export const transactionsData = {
  async getTransactions(filters: TRXfiltersForm) {
    const body: Partial<TRXfiltersForm> = {
      ...filters,
    };
    if (filters.paymentTransactionId === '') {
      delete body.paymentTransactionId;
    }
    const { data } = await axios.post<{
      list: ITransaction[];
      count: number;
      amount: number;
    }>('/transaction/list', body);
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
