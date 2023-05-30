export const transactionFilterOptions = {
  STATUS: [
    { name: 'PENDING', type: 'status' },
    { name: 'APPROVED', type: 'status' },
    { name: 'DENIED', type: 'status' },
    { name: 'CANCELED', type: 'status' },
    { name: 'SUCCESS', type: 'status' },
    { name: 'WAITGW', type: 'status' },
  ],
  OTHER: [
    { name: 'AUTOAPPROVED', type: 'other' },
    { name: 'MANUAL', type: 'other' },
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
