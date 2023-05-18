import axios from 'axios';

import { ITransaction } from './helpers/Transactions.types';

export const transactionsData = {
  async getTransactions() {
    const { data } = await axios.get<ITransaction[]>(
      'http://localhost:4567/transactions',
    );
    return data;
  },
};
