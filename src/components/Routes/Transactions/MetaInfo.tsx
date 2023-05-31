import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { FC } from 'react';

type Proptypes = {
  data: string;
};

interface DataType {
  key: string;
  name: string;
  metaInfo: string;
}

const metaInfoColumns: ColumnsType<DataType> = [
  {
    title: 'Accessible Withdraw Amount',
    dataIndex: 'available_withdraw_amount',
    key: 'available_withdraw_amount',
  },
  {
    title: 'Withdraw Limit',
    dataIndex: 'withdraw_limit',
    key: 'withdraw_limit',
  },
  {
    title: 'Sport Winning Limit',
    dataIndex: 'sport_winning_limit',
    key: 'sport_winning_limit',
  },
  {
    title: 'Casino Winning Limit',
    dataIndex: 'casino_winning_limit',
    key: 'casino_winning_limit',
  },
  {
    title: 'Games Winning Limit',
    dataIndex: 'games_winning_limit',
    key: 'games_winning_limit',
  },
  {
    title: 'Sport GGR Limit',
    dataIndex: 'sport_ggr_limit',
    key: 'sport_ggr_limit',
  },
  {
    title: 'Casino GGR Limit',
    dataIndex: 'casino_ggr_limit',
    key: 'casino_ggr_limit',
  },
  {
    title: 'Games GGR Limit',
    dataIndex: 'games_ggr_limit',
    key: 'games_ggr_limit',
  },
];

const MetaInfo: FC<Proptypes> = ({ data }) => {
  const parsedData = JSON.parse(data);
  console.log('parsedData', parsedData);
  return (
    <Table
      size='small'
      pagination={false}
      dataSource={[parsedData]}
      columns={metaInfoColumns}
    />
  );
};

export default MetaInfo;
