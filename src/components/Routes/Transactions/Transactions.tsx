import { FilterTwoTone, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Table, Tooltip } from 'antd';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';

import InBoModal from './InBoModal/InBoModal';
import OutBoModal from './OutBoModal/OutBoModal';
import TransactionFilters from './TransactionFiltersModal/TransactionFilters';
import { TransactionsColumns } from './helpers/Constans';
import { transactionsData } from './transactions.service';

const Transactions: FC = () => {
  const [isInBoModalOpen, setIsInBoModalOpen] = useState(false);
  const [isOutBoModalOpen, setIsOutBoModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const queryData = useQuery(
    ['transactions'],
    transactionsData.getTransactions,
  );

  const allTotal = queryData.data?.length;

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
        isInBoModalOpen={isInBoModalOpen}
        setIsInBoModalOpen={setIsInBoModalOpen}
      />
      <OutBoModal
        isOutBoModalOpen={isOutBoModalOpen}
        setIsOutBoModalOPen={setIsOutBoModalOpen}
      />
      {isFiltersOpen && <TransactionFilters />}
      <Table
        size='middle'
        columns={TransactionsColumns}
        dataSource={queryData.data}
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
