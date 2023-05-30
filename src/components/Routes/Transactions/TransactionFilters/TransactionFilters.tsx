import { FC, useMemo, useState } from 'react';
import { DatePicker, Input, Form, Row, Col, Button } from 'antd';
import { useQuery } from 'react-query';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

import { transactionsFilters } from '../transactions.service';
import { ITRXFilters, TRXfiltersForm } from '../helpers/Transactions.types';

import CheckboxGroup from './CheckboxGroup';

const TransactionFilters: FC = () => {
  const [filtersData, setFiltersData] = useState<{
    [key: string]: CheckboxValueType[];
  }>({});

  const [form] = Form.useForm();

  console.log('filtersData', filtersData);

  const onFilterChange = (name: string, values: CheckboxValueType[]) => {
    setFiltersData(prevState => ({ ...prevState, [name]: values }));
  };

  const onAllCheck = (name: string, values: CheckboxValueType[]) => {
    setFiltersData(prevState => ({ ...prevState, [name]: values }));
  };

  const TRXfilters = useQuery<ITRXFilters>(
    ['filters'],
    () => transactionsFilters.getTRXFilters(),
    { initialData: {} },
  );

  console.log('TRXfilters', TRXfilters.data);

  const onFinish = (data: TRXfiltersForm) => {
    console.log('dataaaaa', data);
  };

  const filters = useMemo(() => {
    if (!TRXfilters.data) return [];
    return Object.entries(TRXfilters.data);
  }, [TRXfilters]);

  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <Row style={{ paddingBottom: 30 }} gutter={24}>
          <Col span={4}>
            <Form.Item>
              <DatePicker showTime placeholder='date from' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <DatePicker showTime placeholder='date to' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Input placeholder='Player ID' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Input placeholder='Payment Transaction ID' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Input placeholder='Amount to' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Input placeholder='Amount From' />
            </Form.Item>
          </Col>
        </Row>
        {filters.map(([key, options]) => {
          return (
            <Row style={{ paddingBottom: 10, paddingLeft: 15 }} key={key}>
              <CheckboxGroup
                name={key}
                options={options.map((item: { name: string }) => item.name)}
                value={filtersData[key] || []}
                onFilterChange={onFilterChange}
                onAllCheck={onAllCheck}
              />
            </Row>
          );
        })}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Button htmlType='submit' type='primary'>
            Search
          </Button>
        </div>
      </Form>
    </>
  );
};

export default TransactionFilters;
