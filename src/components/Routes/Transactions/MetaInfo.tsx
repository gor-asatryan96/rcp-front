import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

import classes from './Transactions.module.scss';

interface IMetaInfoTypes {
  rollback_limit: Diff;
  withdraw_limit: Diff;
  sport_winning_limit: Diff;
  casino_winning_limit: Diff;
  games_winning_limit: Diff;
  sport_ggr_limit: Diff;
  casino_ggr_limit: Diff;
  games_ggr_limit: Diff;
}

type Diff = { difference?: number };

interface MetaInfoType {
  aa_messages: IMetaInfoTypes;
}

type Proptypes = {
  data: string;
};

const metaInfoColumns: ColumnsType<IMetaInfoTypes> = [
  {
    title: 'Rollback Limit',
    dataIndex: 'rollback_limit',
    key: 'rollback_limit',
    render(value: Diff) {
      return value?.difference ? (
        <Card className={classes.messageColumnsError}>
          <CloseOutlined />
        </Card>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Withdraw Limit',
    dataIndex: 'withdraw_limit',
    key: 'withdraw_limit',
    render(value: Diff) {
      return value?.difference ? (
        <Card className={classes.messageColumnsError}>
          <CloseOutlined />
        </Card>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Sport Winning Limit',
    dataIndex: 'sport_winning_limit',
    key: 'sport_winning_limit',
    render(value: Diff) {
      return value?.difference ? (
        <Card className={classes.messageColumnsError}>
          <CloseOutlined />
        </Card>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Casino Winning Limit',
    dataIndex: 'casino_winning_limit',
    key: 'casino_winning_limit',
    render(value: Diff) {
      return value?.difference ? (
        <Card className={classes.messageColumnsError}>
          <CloseOutlined />
        </Card>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Games Winning Limit',
    dataIndex: 'games_winning_limit',
    key: 'games_winning_limit',
    render(value: Diff) {
      return value?.difference ? (
        <Card className={classes.messageColumnsError}>
          <CloseOutlined />
        </Card>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Sport GGR Limit',
    dataIndex: 'sport_ggr_limit',
    key: 'sport_ggr_limit',
    render(value: Diff) {
      return value?.difference ? (
        <Card className={classes.messageColumnsError}>
          <CloseOutlined />
        </Card>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Casino GGR Limit',
    dataIndex: 'casino_ggr_limit',
    key: 'casino_ggr_limit',
    render(value: Diff) {
      return value?.difference ? (
        <Card className={classes.messageColumnsError}>
          <CloseOutlined />
        </Card>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Games GGR Limit',
    dataIndex: 'games_ggr_limit',
    key: 'games_ggr_limit',
    render(value: Diff) {
      return value?.difference ? (
        <Card className={classes.messageColumnsError}>
          <CloseOutlined />
        </Card>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
];

const MetaInfo: FC<Proptypes> = ({ data }) => {
  const parsedData: MetaInfoType = JSON.parse(data);

  return (
    <Table
      bordered
      size='small'
      pagination={false}
      dataSource={[parsedData.aa_messages]}
      columns={metaInfoColumns}
    />
  );
};

export default MetaInfo;
