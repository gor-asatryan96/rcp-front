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

export interface MetaInfoType {
  aa_messages: IMetaInfoTypes;
  username: string;
}

type Proptypes = {
  data: string;
};

const metaInfoColumns: ColumnsType<IMetaInfoTypes> = [
  {
    title: 'Available Withdraw',
    dataIndex: 'available_withdraw_amount',
    key: 'available_withdraw_amount',
    render(value: Diff) {
      return value?.difference ? (
        <div className={classes.messageColumns}>
          <Card className={classes.messageColumnsError}>
            <CloseOutlined />
          </Card>
          <h3 className={classes.difference}>difference-{value.difference}</h3>
        </div>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Rollback',
    dataIndex: 'rollback_limit',
    key: 'rollback_limit',
    render(value: Diff) {
      return value?.difference ? (
        <div className={classes.messageColumns}>
          <Card className={classes.messageColumnsError}>
            <CloseOutlined />
          </Card>
          <h3 className={classes.difference}>difference-{value.difference}</h3>
        </div>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Withdraw',
    dataIndex: 'withdraw_limit',
    key: 'withdraw_limit',
    render(value: Diff) {
      return value?.difference ? (
        <div className={classes.messageColumns}>
          <Card className={classes.messageColumnsError}>
            <CloseOutlined />
          </Card>
          <h3 className={classes.difference}>difference-{value.difference}</h3>
        </div>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Sport Winning',
    dataIndex: 'sport_winning_limit',
    key: 'sport_winning_limit',
    render(value: Diff) {
      return value?.difference ? (
        <div className={classes.messageColumns}>
          <Card className={classes.messageColumnsError}>
            <CloseOutlined />
          </Card>
          <h3 className={classes.difference}>difference-{value.difference}</h3>
        </div>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Casino Winning',
    dataIndex: 'casino_winning_limit',
    key: 'casino_winning_limit',
    render(value: Diff) {
      return value?.difference ? (
        <div className={classes.messageColumns}>
          <Card className={classes.messageColumnsError}>
            <CloseOutlined />
          </Card>
          <h3 className={classes.difference}>difference-{value.difference}</h3>
        </div>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Games Winning',
    dataIndex: 'games_winning_limit',
    key: 'games_winning_limit',
    render(value: Diff) {
      return value?.difference ? (
        <div className={classes.messageColumns}>
          <Card className={classes.messageColumnsError}>
            <CloseOutlined />
          </Card>
          <h3 className={classes.difference}>difference-{value.difference}</h3>
        </div>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Sport GGR',
    dataIndex: 'sport_ggr_limit',
    key: 'sport_ggr_limit',
    render(value: Diff) {
      return value?.difference ? (
        <div className={classes.messageColumns}>
          <Card className={classes.messageColumnsError}>
            <CloseOutlined />
          </Card>
          <h3 className={classes.difference}>difference-{value.difference}</h3>
        </div>
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
        <div className={classes.messageColumns}>
          <Card className={classes.messageColumnsError}>
            <CloseOutlined />
          </Card>
          <h3 className={classes.difference}>difference-{value.difference}</h3>
        </div>
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
        <div className={classes.messageColumns}>
          <Card className={classes.messageColumnsError}>
            <CloseOutlined />
          </Card>
          <h3 className={classes.difference}>difference-{value.difference}</h3>
        </div>
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
