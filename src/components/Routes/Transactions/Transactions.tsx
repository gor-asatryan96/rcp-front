import { FilterTwoTone, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Table, Tooltip } from 'antd';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';

import InBoModal from './InBoModal/InBoModal';
import OutBoModal from './OutBoModal/OutBoModal';
import { TransactionsColumns } from './helpers/Constans';
import { transactionsData, transactionsFilters } from './transactions.service';
import TransactionFilters from './TransactionFilters/TransactionFilters';

const Transactions: FC = () => {
  const [isInBoModalOpen, setIsInBoModalOpen] = useState(false);
  const [isOutBoModalOpen, setIsOutBoModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const queryData = useQuery(['transactions'], () =>
    transactionsData.getTransactions(),
  );

  const TRXfilters = useQuery(['filters'], () =>
    transactionsFilters.getTRXFilters(),
  );

  const allTotal = queryData.data?.list?.length;
  const totalCount = queryData.data?.count;
  const totalAmount = queryData.data?.amount;

  console.log('data', queryData.data);

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
      {isFiltersOpen && <TransactionFilters TRXfilters={TRXfilters?.data} />}
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
        dataSource={queryData.data?.list}
        scroll={{ x: true }}
        loading={queryData.isLoading}
        pagination={{
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
