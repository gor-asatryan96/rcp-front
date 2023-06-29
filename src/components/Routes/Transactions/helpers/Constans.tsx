import { Approved, IStatusOptions } from './Transactions.types';

export const transactionFilterOptions = {
  STATUS: [
    { name: 'PENDING', type: 'status' },
    { name: 'APPROVED', type: 'status' },
    { name: 'DENIED', type: 'status' },
    { name: 'CANCELED', type: 'status' },
    { name: 'SUCCESS', type: 'status' },
    { name: 'WAITGW', type: 'status' },
  ],
  AUTO: [
    { name: 'APPROVED', type: 'aa_status' },
    { name: 'REJECTED', type: 'aa_status' },
    { name: 'PENDING', type: 'aa_status' },
  ],
};

export const transactionStatusChangeDict: Readonly<{
  [key: string]: { [key: string]: string[] };
}> = Object.freeze({
  IN: {
    WAITGW: ['SUCCESS', 'CANCELED'],
  },
  OUT: {
    PENDING: ['APPROVED', 'DENIED', 'CANCELED'],
    APPROVED: ['PENDING', 'DENIED', 'CANCELED'],
    DENIED: ['PENDING', 'APPROVED', 'CANCELED'],
  },
});

export const autoPushOptions = [
  {
    name: 'AutoPush',
    options: ['ALL', 'Tigo', 'Halopesa', 'Airtel', 'Mpesa'],
  },
];

export const autoApproveOptions = [
  {
    name: 'AutoApprove',
    options: ['ALL', 'Tigo', 'Halopesa', 'Airtel', 'Mpesa'],
  },
];

export const colors = {
  [Approved.APPROVED]: 'rgb(51, 194, 32)',
  [Approved.REJECTED]: 'rgb(255,77,79)',
  [Approved.PENDING]: 'rgb(245,245,245)',
};

export const validOptionsList: IStatusOptions = {
  WAITGW: [
    { title: 'SUCCESS', value: 'SUCCESS' },
    { title: 'CANCELED', value: 'CANCELED' },
    { title: 'DENIED', value: 'DENIED' },
  ],
  PENDING: [
    { title: 'APPROVED', value: 'APPROVED' },
    { title: 'DENIED', value: 'DENIED' },
    { title: 'CANCELED', value: 'CANCELED' },
  ],
  APPROVED: [
    { title: 'PENDING', value: 'PENDING' },
    { title: 'DENIED', value: 'DENIED' },
    { title: 'CANCELED', value: 'CANCELED' },
  ],
  DENIED: [
    { title: 'PENDING', value: 'PENDING' },
    { title: 'APPROVED', value: 'APPROVED' },
    { title: 'CANCELED', value: 'CANCELED' },
  ],
};
