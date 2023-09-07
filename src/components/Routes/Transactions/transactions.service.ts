import axios from 'axios';
import dayjs from 'dayjs';

import { transactionFilterOptions } from './helpers/Constans';
import {
  ITRXFilters,
  ITransaction,
  TRXfiltersForm,
} from './helpers/Transactions.types';

export const transactionsData = {
  async getTransactions(filters: TRXfiltersForm, page: number) {
    const body: Partial<TRXfiltersForm> = {
      ...filters,
      page,
      dateTo: filters.dateTo
        ? dayjs(filters.dateTo).format('YYYY/MM/DD HH:mm:ss')
        : undefined,
      dateFrom: filters.dateFrom
        ? dayjs(filters.dateFrom).format('YYYY/MM/DD HH:mm:ss')
        : undefined,
    };
    if (filters.paymentTransactionId === '') delete body.paymentTransactionId;
    if (filters.transactionId === '') delete body.transactionId;
    if (filters.playerId === '') delete body.playerId;
    if (filters.amountTo === '') delete body.amountTo;
    if (filters.amountFrom === '') delete body.amountFrom;
    if (filters.phone === '') delete body.phone;
    if (filters.remoteId === '') delete body.remoteId;
    if (filters.token === '') delete body.token;
    const { data } = await axios.post<{
      list: ITransaction[];
      count: number;
      amount: number;
      users_count: number;
    }>('/transaction/list', body);
    data.list = data.list.map(item => ({ ...item, key: item.id }));
    return data;
  },
};

export const transactionsFilters = {
  async getTRXFilters() {
    const { data } = await axios.post<{ op_types: ITRXFilters }>(
      '/transaction/filters',
      { type: 'filter' },
    );
    return { ...transactionFilterOptions, ...data.op_types } as ITRXFilters;
  },
};

export const transactionsInsert = {
  async getTRXInsert() {
    const { data } = await axios.post('/transaction/filters', {
      type: 'manual-insert',
    });
    return data;
  },
};
