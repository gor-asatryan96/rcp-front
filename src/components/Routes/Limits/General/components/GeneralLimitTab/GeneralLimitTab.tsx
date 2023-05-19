import { FC, useEffect, useState } from 'react';
import { Col, Form, Popover, Row, Table } from 'antd';
import Input from 'antd/es/input/Input';
import axios from 'axios';

import { dailyColumns } from './GeneralLimit.configs';

const DailyLimitTab: FC = () => {
  const layout = {
    xs: { span: 12 },
    lg: { span: 12 },
    xl: { span: 4 },
    xxl: { span: 6 },
  };

  const [dailyData, setDailyData] = useState();

  useEffect(() => {
    axios.get('http://localhost:4567/limit').then(data => {
      setDailyData(data.data);
    });
  }, []);

  const columns = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Winning Limit',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'GGR Limit',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col {...layout}>
          <Form.Item label='Withdraw Limit'>
            <Input type='number' value={dailyData} readOnly />
          </Form.Item>
        </Col>
        <Col {...layout}>
          <Popover
            trigger='hover'
            placement='topLeft'
            content='Deposit Draw Condition'>
            <Form.Item label='DDC'>
              <Input readOnly prefix='%' type='number' />
            </Form.Item>
          </Popover>
        </Col>
      </Row>
      <Table pagination={false} columns={columns} dataSource={dailyColumns} />
    </>
  );
};

export default DailyLimitTab;
