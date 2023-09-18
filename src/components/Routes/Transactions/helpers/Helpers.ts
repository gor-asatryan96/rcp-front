import { ITransaction } from './Transactions.types';

export const getTransactionStatus = (transaction: ITransaction): any => {
  if (!transaction.is_bulk) return transaction.status;

  return transaction.children.every(
    tr => tr.status === transaction.children[0].status,
  )
    ? transaction.children[0].status
    : null;
};
