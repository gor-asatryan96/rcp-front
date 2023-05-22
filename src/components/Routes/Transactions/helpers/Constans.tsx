import { ColumnsType } from 'antd/es/table';
import { DownCircleOutlined, PushpinOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import dayjs from 'dayjs';

import { ITransaction } from './Transactions.types';

export const transactionFilter = [
  {
    name: 'Status Filters',
    options: ['PENDING', 'APPROVED', 'DENIED', 'CANCELED', 'SUCCESS', 'WAITGW'],
  },

  {
    name: 'OTHER',
    options: ['AUTOAPPROVED', 'MANUAL'],
  },
  {
    name: 'Type In',
    options: [
      'IN-EW-MPESA',
      'IN-EW-HALOPESA',
      'IN-EW-TIGO',
      'IN-EW-AIRTEL',
      'IN-EWPUSH-MPESA',
      'IN-BO',
    ],
  },

  {
    name: 'Type Out',
    options: [
      'IN-EW-MPESA',
      'IN-EW-HALOPESA',
      'IN-EW-TIGO',
      'IN-EW-AIRTEL',
      'IN-EWPUSH-MPESA',
      'OUT-BO',
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
  { title: 'Kind', dataIndex: 'op_type', key: 'op_type' },
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
    dataIndex: 'gateway_trx_id',
    key: 'gateway_trx_id',
  },
  { title: 'Username', dataIndex: 'username', key: 'username' },
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
