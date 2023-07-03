import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

import classes from './MetaInfo.module.scss';
import {
  Diff,
  IMetaInfoTypes,
  MetaInfoData,
  MetaInfoType,
} from './MetaInfoTypes';

const metaInfoColumns: ColumnsType<IMetaInfoTypes> = [
  {
    title: 'First Withdraw',
    dataIndex: 'first_withdraw',
    key: 'first_withdraw',
    render(value: Diff) {
      return value?.is_first_withdraw === true ? (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      ) : (
        <div className={classes.messageColumns}>
          <Card className={classes.messageColumnsError}>
            <CloseOutlined />
          </Card>
        </div>
      );
    },
  },
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
          <h3 className={classes.difference}>diff-{value.difference}</h3>
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
          <h3 className={classes.difference}>diff-{value.difference}</h3>
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
          <h3 className={classes.difference}>diff-{value.difference}</h3>
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
          <h3 className={classes.difference}>diff-{value.difference}</h3>
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
          <h3 className={classes.difference}>diff-{value.difference}</h3>
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
          <h3 className={classes.difference}>diff-{value.difference}</h3>
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
          <h3 className={classes.difference}>diff-{value.difference}</h3>
        </div>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Casino GGR',
    dataIndex: 'casino_ggr_limit',
    key: 'casino_ggr_limit',
    render(value: Diff) {
      return value?.difference ? (
        <div className={classes.messageColumns}>
          <Card className={classes.messageColumnsError}>
            <CloseOutlined />
          </Card>
          <h3 className={classes.difference}>diff-{value.difference}</h3>
        </div>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
  {
    title: 'Games GGR',
    dataIndex: 'games_ggr_limit',
    key: 'games_ggr_limit',
    render(value: Diff) {
      return value?.difference ? (
        <div className={classes.messageColumns}>
          <Card className={classes.messageColumnsError}>
            <CloseOutlined />
          </Card>
          <h3 className={classes.difference}>diff-{value.difference}</h3>
        </div>
      ) : (
        <Card className={classes.messageColumnsSuccess}>
          <CheckOutlined />
        </Card>
      );
    },
  },
];

const MetaInfo: FC<MetaInfoData> = ({ data }) => {
  const parsedData: MetaInfoType = JSON.parse(data);

  return (
    <Table
      style={{ marginRight: 45 }}
      bordered
      size='small'
      pagination={false}
      dataSource={[parsedData.aa_messages]}
      columns={metaInfoColumns}
    />
  );
};

export default MetaInfo;
