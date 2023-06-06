import { Approved } from './Transactions.types';

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
    { name: 'APPROVED', type: 'auto' },
    { name: 'REJECTED', type: 'auto' },
    { name: 'PENDING', type: 'auto' },
  ],
};

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

export const statusList = [
  { title: 'PENDING', value: 'PENDING' },
  { title: 'APPROVED', value: 'APPROVED' },
  { title: 'SUCCESS', value: 'SUCCESS' },
  { title: 'CANCELED', value: 'CANCELED' },
  { title: 'DENIED', value: 'DENIED' },
  { title: 'WAITGW', value: 'WAITGW' },
];
