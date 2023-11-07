import { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  DownCircleOutlined,
  FilterTwoTone,
  InfoOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Divider, Select, Table, Tooltip } from 'antd';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import axios, { AxiosError } from 'axios';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

import { IErrorMessage } from 'redux/store.types';
import { selectActiveProjectID } from 'redux/reducers/projects/projects.slice';

import NotificationSpinner from '../../Common/NotificationSidebar/NotificationCards/components/NotificationSpinner/NotificationSpinner';

import classes from './Transactions.module.scss';
import InBoModal from './InBoModal/InBoModal';
import OutBoModal from './OutBoModal/OutBoModal';
import { transactionsData, transactionsInsert } from './transactions.service';
import TransactionFilters from './TransactionFilters/TransactionFilters';
import {
  Approved,
  ITransaction,
  TRXfiltersForm,
} from './helpers/Transactions.types';
import { colors, statusColors, validOptionsList } from './helpers/Constans';
import MetaInfo from './MetaInfo/MetaInfo';
import { getTransactionStatus } from './helpers/Helpers';

const Transactions: FC = () => {
  const activeCountryId = useSelector(selectActiveProjectID);

  const [isInBoModalOpen, setIsInBoModalOpen] = useState(false);
  const [isOutBoModalOpen, setIsOutBoModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [TRXId, setTRXId] = useState<number>();
  const [transactionStatus, setTransactionStatus] = useState<{
    [key: number]: string;
  }>({});
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [filters, setFilters] = useState<TRXfiltersForm>({
    dateFrom: dayjs().startOf('day'),
    dateTo: dayjs().endOf('day').set('hour', 23).set('minute', 59),
    amountFrom: 0,
    amountTo: 0,
    phone: '',
    playerId: 0,
    remoteId: '',
    token: '',
    paymentTransactionId: '',
    transactionId: +'',
    opType: [],
    status: ['PENDING'],
    aa_status: [],
    limit: 50,
    page: 1,
    orderBy: 'created_at',
    orderDir: 'DESC',
  });

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
      transactionsIds,
      status,
    }: {
      transactionsIds: number[];
      status: string;
    }) => {
      return axios.post('/transaction/update-status', {
        status,
        transactionsIds,
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

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const savedScrollPositionRef = useRef<number>(0);

  const rememberScrollPosition = () => {
    if (scrollRef.current) {
      savedScrollPositionRef.current = scrollRef.current.scrollTop;
    }
  };

  const restoreScrollPosition = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = savedScrollPositionRef.current;
    }
  };
  const onStatusChange = (transactionsIds: number[], status: string) => {
    rememberScrollPosition();
    mutation.mutate({ transactionsIds, status });
  };

  const TransactionsColumns: ColumnsType<ITransaction> = [
    {
      title: 'TRX ID',
      dataIndex: 'id',
      key: 'id',
      render: (_, data) => {
        return data.is_bulk ? `Bulk (${data.count})` : data.id;
      },
    },
    {
      title: 'UID',
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: (a, b) => {
        if (a.user_id === null && b.user_id === null) return 0;
        if (a.user_id === null) return -1;
        if (b.user_id === null) return 1;
        return a.user_id - b.user_id;
      },
      render: (_, data) => (
        <a
          target='_blank'
          href={`http://fbo.betunit.com/internet/ccuser/${data.user_id}/`}
          rel='noreferrer'>
          {data.user_id}
        </a>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => {
        const amountA = parseFloat(a.amount);
        const amountB = parseFloat(b.amount);
        return amountA - amountB;
      },
      render: (_, data) => {
        return (
          <div>
            {(data.is_bulk ? 'Total Amount: ' : '') + data.amount.split('.')[0]}
          </div>
        );
      },
    },
    { title: 'Currency', dataIndex: 'currency', key: 'currency' },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA.getTime() - dateB.getTime();
      },
      render: (_, data) => (
        <div>{dayjs.utc(data.created_at).format('DD/MM/YYYY HH:mm')}</div>
      ),
    },
    {
      title: 'Updated',
      dataIndex: 'updated_at',
      key: 'updated_at',
      sorter: (a, b) => {
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);
        return dateA.getTime() - dateB.getTime();
      },
      render: (_, data) =>
        !data.is_bulk && (
          <div>
            <div>{dayjs.utc(data.updated_at).format('DD/MM/YYYY HH:mm')}</div>
          </div>
        ),
    },
    { title: 'Kind', dataIndex: 'op_type', key: 'op_type' },
    {
      title: 'PTRX ID',
      dataIndex: 'gateway_response',
      key: 'gateway_response',
      render: (_, data) => (data.is_bulk ? '' : data.gateway_trx_id),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (_, data) =>
        data.status === 'SUCCESS' || data.status === 'CANCELED' ? (
          <Card
            style={{
              border: 'solid 3px',
              borderRadius: '10px 10px 10px 10px',
              borderColor: statusColors[data.status],
            }}
            className={classes.tableStatus}>
            {data.status}
          </Card>
        ) : (
          <Select
            onChange={value => {
              setTransactionStatus({
                ...transactionStatus,
                [data.id]: value,
              });
              onStatusChange(
                data.is_bulk ? data.children.map(tr => tr.id) : [data.id],
                value,
              );
            }}
            style={{
              width: '7rem',
              border: 'solid 3px',
              borderRadius: '10px',
              borderColor:
                statusColors[transactionStatus[data.id] || data.status],
            }}
            defaultValue={
              transactionStatus[data.id] || getTransactionStatus(data)
            }
            value={transactionStatus[data.id] || getTransactionStatus(data)}
            disabled={!getTransactionStatus(data)}
            options={validOptionsList[data.status]}
          />
        ),
    },
    { title: 'Code', dataIndex: 'code', key: 'code' },
    { title: 'Token', dataIndex: 'token', key: 'token' },
    { title: 'MSISDN', dataIndex: 'msisdn', key: 'msisdn' },
    { title: 'Operator', dataIndex: 'op_name', key: 'op_name' },
    {
      title: 'RTX ID',
      dataIndex: 'gateway_trx_id',
      key: 'gateway_trx_id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (_, data) => {
        if (data.meta_info) {
          try {
            return <div>{JSON.parse(data.meta_info).sa_username}</div>;
          } catch {
            /* empty */
          }
        }
        return '';
      },
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: (_, data) => {
        if (data.meta_info && !data.is_bulk) {
          try {
            return <div>{JSON.parse(data.meta_info).reason}</div>;
          } catch {
            /* empty */
          }
        }
        return '';
      },
    },
    {
      title: 'CHECK',
      dataIndex: 'autochecked',
      key: 'autochecked',
      render: (_, data) => (
        <Card
          className={classes.check}
          style={{ backgroundColor: colors[data.aa_status] }}>
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
  const usersCount = queryData.data?.pages?.length
    ? queryData.data.pages[queryData.data.pages.length - 1].users_count
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

  useEffect(() => {
    queryData.refetch();
    TRXInsert.refetch();
  }, [activeCountryId]);

  useEffect(() => {
    if (mutation.isSuccess) {
      queryData.refetch().then(() => {
        restoreScrollPosition();
      });
    }
  }, [mutation.isSuccess, queryData.data, InfiniteScroll]);

  const MetaInfoExtandable = useCallback(
    (transaction: ITransaction) => (
      <>
        {transaction.aa_status === 'REJECTED' && (
          <MetaInfo key={transaction.id} data={transaction?.meta_info} />
        )}

        {transaction.is_bulk && (
          <div className={classes.trxTabBody}>
            <Table
              rowClassName={classes.childRowColor}
              rowKey={data => data.id}
              size='small'
              columns={TransactionsColumns as any}
              dataSource={transaction.children}
              footer={() => null}
              pagination={false}
            />
          </div>
        )}
      </>
    ),
    [],
  );

  const onExpanded = (status: boolean, tr: any) => {
    if (status) setExpandedRows([...expandedRows, tr.id]);
    else setExpandedRows(expandedRows.filter(id => id !== tr.id));
  };
  const transactionList = queryData.data?.pages?.reduce<ITransaction[]>(
    (acc, b) => [...acc, ...b.list],
    [],
  );
  const handleToggleAllRows = () => {
    if (expandedRows.length === 0 && Array.isArray(transactionList)) {
      setExpandedRows(transactionList.map(tr => tr.id));
    } else {
      setExpandedRows([]);
    }
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
        <div style={{ display: 'flex', paddingBottom: 10 }}>
          <div style={{ marginRight: '0.5rem' }}>
            <Button onClick={onOutBoModalOpenClick} type='primary' danger>
              <MinusOutlined />
            </Button>
          </div>
          <div>
            <Button onClick={onInBoModalOpenClick} type='primary'>
              <PlusOutlined />
            </Button>
          </div>
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
      <div
        style={{
          display: !isFiltersOpen ? 'none' : '',
        }}>
        <TransactionFilters
          refetch={queryData.refetch}
          remove={queryData.remove}
          filter={filters}
          setFilters={setFilters}
          initialFilters={filters}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
        }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
            Users Count: {usersCount}
          </Card>
        </div>
        <div className={classes.expandAllButton}>
          <Button
            size='small'
            style={{ borderRadius: '40% 40% 40% 40%' }}
            onClick={handleToggleAllRows}>
            {expandedRows.length === 0 ? <PlusOutlined /> : <MinusOutlined />}
          </Button>
        </div>
      </div>

      <div>
        <InfiniteScroll
          next={queryData.fetchNextPage}
          loader={<NotificationSpinner />}
          hasMore={!!queryData.hasNextPage}
          dataLength={transactionList?.length || 0}>
          <div className={classes.trxTabBody}>
            <Table
              rowKey={data => data.id}
              rowClassName={data =>
                data.is_manual === 1 ? classes.manual : ''
              }
              size='small'
              columns={TransactionsColumns}
              expandable={{
                expandedRowRender: MetaInfoExtandable,
                rowExpandable: data =>
                  data.aa_status === 'REJECTED' || data.is_bulk,
                expandedRowKeys: expandedRows,
                onExpand: (status, tr) => onExpanded(status, tr),
                childrenColumnName: 'children_old',
              }}
              dataSource={transactionList}
              loading={queryData.isLoading}
              footer={() => null}
              pagination={false}
            />
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};
export default Transactions;
