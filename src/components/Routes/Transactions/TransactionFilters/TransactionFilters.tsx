import { FC } from 'react';
import {
  DatePicker,
  TimePicker,
  Input,
  Form,
  Row,
  Col,
  Checkbox,
  Button,
} from 'antd';

import { transactionFilter } from '../helpers/Constans';
import { ITRXFilters } from '../helpers/Transactions.types';

// import CheckboxGroup from './CheckboxGroup';

// import Classes from './TransactionFiltersModal.module.scss';

type PropTypes = {
  TRXfilters: ITRXFilters | undefined;
};

const { RangePicker } = DatePicker;

const TransactionFilters: FC<PropTypes> = ({ TRXfilters }) => {
  const filters = [{ ...TRXfilters }];

  console.log('first', filters);

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
        {transactionFilter.map(filter => {
          return (
            <Row
              style={{ paddingBottom: 10, paddingLeft: 15 }}
              key={filter.name}>
              <Col span={2}>{filter.name.toUpperCase()}:</Col>
              <Checkbox>ALL</Checkbox>
              <Col span={20}>
                <Checkbox.Group options={filter.options} />
              </Col>
            </Row>
          );
        })}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Button type='primary'>Search</Button>
        </div>
      </Form>
    </>
  );
};

export default TransactionFilters;
