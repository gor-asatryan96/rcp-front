import { ColumnsType } from 'antd/es/table';
import { DownCircleOutlined, PushpinOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import dayjs from 'dayjs';

import { ITransaction } from './Transactions.types';

export const transactionFilters = [
  {
    name: 'Status Filters',
    options: [
      'ALL',
      'Pending',
      'Approved',
      'Denied',
      'Canceled',
      'Success',
      'WaitGW',
    ],
  },

  {
    name: 'OTHER',
    options: ['Autoapproved', 'Manual'],
  },

  {
    name: 'TRX Type Out',
    options: [
      'ALL',
      'Out-EW-AIRTEL',
      'OUT-EW-MPESA',
      'OUT-EW-HALOPESA',
      'OUT-TIGO',
      'OUT-CASH',
      'OUT-KIOSK',
    ],
  },

  {
    name: 'TRX Type In',
    options: [
      'ALL',
      'IN-EW-AIRTEL',
      'IN-EW-TIGO',
      'IN-EW-HALOPESA',
      'IN-EW-MPESA',
      'IN-EWPUSH-HALOPESA',
      'IN-EWPUSH-MPESA',
      'IN-EWPUSH-AIRTEL',
      'IN-EWPUSH-TIGO',
      'IN-KIOSK',
      'IN-CASH',
    ],
  },
];

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

export const TransactionsColumns: ColumnsType<ITransaction> = [
  { title: 'TRX ID', dataIndex: 'id', key: 'id' },
  { title: 'Username', dataIndex: 'username', key: 'username' },
  { title: 'UID', dataIndex: 'user_id', key: 'user_id' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Currency', dataIndex: 'currency', key: 'currency' },
  {
    title: 'Created',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (_, data) => (
      <div>
        {data.created_at
          ? dayjs(data.created_at).format('DD/MM/YYYY HH:MM')
          : ''}
      </div>
    ),
  },
  {
    title: 'Updated',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (_, data) => (
      <div>
        {data.updated_at
          ? dayjs(data.updated_at).format('DD/MM/YYYY HH:MM')
          : ''}
      </div>
    ),
  },
  { title: 'Kind', dataIndex: 'kind', key: 'kind' },
  {
    title: 'Payment TRX ID',
    dataIndex: 'paymentTransactionId',
    key: 'paymentTransactionId',
  },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Code', dataIndex: 'code', key: 'code' },
  { title: 'MSISDN', dataIndex: 'msisdn', key: 'msisdn' },
  { title: 'Operator', dataIndex: 'operator', key: 'operator' },
  {
    title: 'RTX ID',
    dataIndex: 'remoteId',
    key: 'remoteId',
  },
  {
    title: 'AUTO',
    dataIndex: 'autochecked',
    key: 'autochecked',
    render: () => (
      <Button type='primary'>
        <DownCircleOutlined />
      </Button>
    ),
  },
  {
    // title: 'Autochecked',
    // dataIndex: 'autochecked',
    key: 'autochecked',
    render: () => (
      <Button type='primary' danger>
        <PushpinOutlined />
      </Button>
    ),
  },
];
