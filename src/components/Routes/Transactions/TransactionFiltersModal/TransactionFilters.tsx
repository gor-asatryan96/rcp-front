import { FC } from 'react';
import { DatePicker, TimePicker, Input, Form, Row, Col, Checkbox } from 'antd';

import { transactionFilters } from '../helpers/Constans';

// import Classes from './TransactionFiltersModal.module.scss';

const { RangePicker } = DatePicker;

const TransactionFilters: FC = () => {
  return (
    <>
      <Form>
        <Row style={{ paddingBottom: 30 }} gutter={24}>
          <Col span={4}>
            <RangePicker />
          </Col>
          <Col span={4}>
            <TimePicker.RangePicker />
          </Col>
          <Col span={4}>
            <Input placeholder='Player ID' />
          </Col>
          <Col span={4}>
            <Input placeholder='Payment Transaction ID' />
          </Col>
          <Col span={4}>
            <Input placeholder='Amount to' />
          </Col>
          <Col span={4}>
            <Input placeholder='Amount From' />
          </Col>
        </Row>
        {transactionFilters.map(filter => {
          return (
            <Row
              style={{ paddingBottom: 10, paddingLeft: 15 }}
              key={filter.name}>
              <Col span={2}>{filter.name}:</Col>
              <Col span={20}>
                <Checkbox.Group
                  style={{ flexWrap: 'wrap' }}
                  options={filter.options}
                />
              </Col>
            </Row>
          );
        })}
      </Form>
    </>
  );
};

export default TransactionFilters;
