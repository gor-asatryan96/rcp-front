import {
  DownCircleOutlined,
  FilterTwoTone,
  InfoOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Divider, Select, Table, Tooltip } from 'antd';
import { FC, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import axios, { AxiosError } from 'axios';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

import { IErrorMessage } from 'redux/store.types';
import { selecTimezone } from 'redux/reducers/serverConfigs/serverConfigs.slice';

import NotificationSpinner from '../../Common/NotificationSidebar/NotificationCards/components/NotificationSpinner/NotificationSpinner';

import InBoModal from './InBoModal/InBoModal';
import OutBoModal from './OutBoModal/OutBoModal';
import { transactionsData, transactionsInsert } from './transactions.service';
import TransactionFilters from './TransactionFilters/TransactionFilters';
import {
  Approved,
  ITransaction,
  TRXfiltersForm,
} from './helpers/Transactions.types';
import { colors, statusList } from './helpers/Constans';
import MetaInfo from './MetaInfo';

const Transactions: FC = () => {
  const timezone = useSelector(selecTimezone);

  const [isInBoModalOpen, setIsInBoModalOpen] = useState(false);
  const [isOutBoModalOpen, setIsOutBoModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [TRXId, setTRXId] = useState<number>();
  const [filters, setFilters] = useState<TRXfiltersForm>({
    dateFrom: dayjs().tz(timezone).startOf('day'),
    dateTo: dayjs().tz(timezone),
    amountFrom: 0,
    amountTo: 0,
    playerId: 0,
    paymentTransactionId: '',
    opType: [],
    status: ['PENDING'],
    limit: 10,
    page: 1,
    orderBy: 'updated_at',
    orderDir: 'DESC',
  });

  console.log('time', timezone);

  const statusOptions = statusList?.map(item => ({ value: item.title }));

  const queryData = useInfiniteQuery(
    ['transactions', filters],
    ({ pageParam = 1 }) => transactionsData.getTransactions(filters, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.count > filters.limit * allPages.length
          ? allPages.length + 1
          : undefined;
      },
    },
  );
  const mutationManualPush = useMutation({
    mutationFn: ({ transactionId }: { transactionId: number }) => {
      return axios.post('/transaction/manual-push', {
        transactionId,
      });
    },
    onSuccess: () => {
      queryData.refetch();
      queryData.remove();
      toast.success('Manual push has successfully pushed');
    },
    onError: err => {
      const error = err as unknown as AxiosError<IErrorMessage>;
      toast.error(error.response?.data.message || t('Something went wrong'));
    },
  });

  const onPushClick = (data: ITransaction) => {
    const transactionId = data.id;
    setTRXId(transactionId);
    mutationManualPush.mutate({ transactionId });
  };

  const mutation = useMutation({
    mutationFn: ({
      transactionId,
      status,
    }: {
      transactionId: number;
      status: string;
    }) => {
      return axios.post('/transaction/update-status', {
        status,
        transactionId,
      });
    },
    onSuccess: () => {
      toast.success(t('Status has successfully changed'));
    },
    onError: err => {
      queryData.remove();
      queryData.refetch();

      const error = err as unknown as AxiosError<IErrorMessage>;
      toast.error(error.response?.data.message || t('Something went wrong'));
    },
  });

  const onStatusChange = (transactionId: number, status: string) => {
    mutation.mutate({ transactionId, status });
  };

  const TransactionsColumns: ColumnsType<ITransaction> = [
    { title: 'TRX ID', dataIndex: 'id', key: 'id' },
    {
      title: 'UID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: (_, data) => (
        <a
          target='_blank'
          href={`http://fbo.betunit.com/internet/ccuser/${data.user_id}/`}
          rel='noreferrer'>
          {data.user_id}
        </a>
      ),
    },
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
      title: 'PTRX ID',
      dataIndex: 'paymentTransactionId',
      key: 'paymentTransactionId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, data) => (
        <Select
          onChange={value => onStatusChange(data.id, value)}
          style={{ width: '7rem' }}
          defaultValue={data.status}
          options={statusOptions}
        />
      ),
    },
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
            {data.aa_status === Approved.REJECTED ? (
              <InfoOutlined />
            ) : (
              <DownCircleOutlined />
            )}
          </div>
        </Card>
      ),
    },
    Table.EXPAND_COLUMN,
    {
      title: 'PUSH',
      key: 'autoPush',
      render: (_, data: ITransaction) => (
        <Button
          loading={
            data.status === 'APPROVED' &&
            data.id === TRXId &&
            mutationManualPush.isLoading
          }
          onClick={() => onPushClick(data)}
          disabled={data.status !== 'APPROVED'}
          type='primary'
          danger>
          PUSH
        </Button>
      ),
    },
  ];

  const TRXInsert = useQuery(['filters-insert'], () =>
    transactionsInsert.getTRXInsert(),
  );
  const totalCount = queryData.data?.pages?.length
    ? queryData.data.pages[queryData.data.pages.length - 1].count
    : 0;
  const totalAmount = queryData.data?.pages?.length
    ? queryData.data.pages[queryData.data.pages.length - 1].amount
    : 0;

  const onInBoModalOpenClick = () => {
    setIsInBoModalOpen(!isInBoModalOpen);
  };

  const onOutBoModalOpenClick = () => {
    setIsOutBoModalOpen(!isOutBoModalOpen);
  };

  const onFiltersClick = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const transactionList = queryData.data?.pages?.reduce<ITransaction[]>(
    (acc, b) => [...acc, ...b.list],
    [],
  );

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
        <div style={{ paddingBottom: 10 }}>
          <Button onClick={onOutBoModalOpenClick} type='primary' danger>
            <MinusOutlined />
          </Button>
          <Button onClick={onInBoModalOpenClick} type='primary'>
            <PlusOutlined />
          </Button>
        </div>
      </div>

      <InBoModal
        TRXfilters={TRXInsert.data?.op_types.IN}
        isInBoModalOpen={isInBoModalOpen}
        setIsInBoModalOpen={setIsInBoModalOpen}
      />
      <OutBoModal
        TRXfilters={TRXInsert.data?.op_types.OUT}
        isOutBoModalOpen={isOutBoModalOpen}
        setIsOutBoModalOPen={setIsOutBoModalOpen}
      />
      {isFiltersOpen && (
        <TransactionFilters setFilters={setFilters} initialFilters={filters} />
      )}
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
      <div>
        <InfiniteScroll
          next={queryData.fetchNextPage}
          loader={<NotificationSpinner />}
          hasMore={!!queryData.hasNextPage}
          dataLength={transactionList?.length || 0}>
          <Table
            size='small'
            columns={TransactionsColumns}
            expandable={{
              // eslint-disable-next-line react/no-unstable-nested-components
              expandedRowRender: data => (
                <MetaInfo key={data.id} data={data?.meta_info} />
              ),
              rowExpandable: data => data.aa_status === 'REJECTED',
            }}
            dataSource={transactionList}
            loading={queryData.isLoading}
            footer={() => null}
            pagination={false}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Transactions;
