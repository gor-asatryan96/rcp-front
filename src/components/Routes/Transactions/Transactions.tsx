import {
  DownCircleOutlined,
  FilterTwoTone,
  InfoOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Divider, Table, Tooltip } from 'antd';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';

import InBoModal from './InBoModal/InBoModal';
import OutBoModal from './OutBoModal/OutBoModal';
import { transactionsData, transactionsFilters } from './transactions.service';
import TransactionFilters from './TransactionFilters/TransactionFilters';
import { Approved, ITransaction } from './helpers/Transactions.types';

const colors = {
  [Approved.APPROVED]: 'rgb(51, 194, 32)',
  [Approved.REJECTED]: 'rgb(254,77,79)',
  [Approved.PENDING]: 'rgb(255, 238, 22)',
};

const Transactions: FC = () => {
  const [isInBoModalOpen, setIsInBoModalOpen] = useState(false);
  const [isOutBoModalOpen, setIsOutBoModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const queryData = useQuery(['transactions', page], () =>
    transactionsData.getTransactions(page),
  );
  // const metaInfo = queryData.data?.list[0]?.meta_info;
  // const meta = metaInfo !== undefined ? JSON.parse(metaInfo) : undefined;
  // console.log('meta', meta);

  const TransactionsColumns: ColumnsType<ITransaction> = [
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
    { title: 'Operator', dataIndex: 'op_name', key: 'op_name' },
    {
      title: 'RTX ID',
      dataIndex: 'gateway_trx_id',
      key: 'gateway_trx_id',
    },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    {
      title: 'CHECK',
      dataIndex: 'autochecked',
      key: 'autochecked',
      render: (_, data) => (
        <Card
          style={{
            backgroundColor: colors[data.aa_status],
            width: '2.2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <div>
            {data.aa_status === Approved.PENDING ? (
              <InfoOutlined />
            ) : (
              <DownCircleOutlined />
            )}
          </div>
        </Card>
      ),
    },
    {
      title: 'PUSH',
      key: 'autoPush',
      render: (_, data) => (
        <Button
          style={{
            width: '3.5rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          disabled={data.status === 'PENDING'}
          type='primary'
          danger>
          PUSH
        </Button>
      ),
    },
  ];

  const TRXfilters = useQuery(['filters'], () =>
    transactionsFilters.getTRXFilters(),
  );

  const allTotal = queryData.data?.count;
  const totalCount = queryData.data?.count;
  const totalAmount = queryData.data?.amount;

  const onInBoModalOpenClick = () => {
    setIsInBoModalOpen(!isInBoModalOpen);
  };

  const onOutBoModalOpenClick = () => {
    setIsOutBoModalOpen(!isOutBoModalOpen);
  };

  const onFiltersClick = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <>
      <Divider orientation='left'>Transactions</Divider>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 5,
        }}>
        <Tooltip title='Filter'>
          <FilterTwoTone
            onClick={onFiltersClick}
            style={{ fontSize: 24, cursor: 'pointer' }}
          />
        </Tooltip>
        <div style={{ paddingTop: 30, paddingBottom: 30 }}>
          <Button onClick={onOutBoModalOpenClick} type='primary' danger>
            <MinusOutlined />
          </Button>
          <Button onClick={onInBoModalOpenClick} type='primary'>
            <PlusOutlined />
          </Button>
        </div>
      </div>

      <InBoModal
        TRXfilters={TRXfilters.data?.IN}
        isInBoModalOpen={isInBoModalOpen}
        setIsInBoModalOpen={setIsInBoModalOpen}
      />
      <OutBoModal
        TRXfilters={TRXfilters.data?.OUT}
        isOutBoModalOpen={isOutBoModalOpen}
        setIsOutBoModalOPen={setIsOutBoModalOpen}
      />
      {isFiltersOpen && <TransactionFilters />}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 10,
          marginTop: 10,
        }}>
        <Card
          bodyStyle={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            minWidth: 150,
            height: 30,
            backgroundColor: 'rgb(120, 177, 235)',
            borderRadius: 5,
          }}
          headStyle={{ padding: 10 }}
          size='small'>
          Total Count: {totalCount}
        </Card>
        <Card
          bodyStyle={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            minWidth: 150,
            height: 30,
            backgroundColor: 'rgb(120, 177, 235)',
            borderRadius: 5,
          }}
          size='small'
          headStyle={{ padding: 10 }}>
          Total Amount: {totalAmount}
        </Card>
      </div>
      <Table
        size='middle'
        columns={TransactionsColumns}
        // expandable={{
        //   expandedRowRender: data =>
        //     data.meta_info ? (
        //       <p style={{ margin: 0 }}>{JSON.parse(data.meta_info)}</p>
        //     ) : (
        //       <p>No Data</p>
        //     ),
        // }}
        dataSource={queryData.data?.list}
        scroll={{ x: true }}
        loading={queryData.isLoading}
        pagination={{
          onChange(pages) {
            setPage(pages);
          },
          position: ['bottomCenter'],
          total: allTotal,
          showSizeChanger: true,
          responsive: true,
        }}
      />
    </>
  );
};

export default Transactions;
