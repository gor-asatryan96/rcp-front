import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { DatePicker, Input, Form, Row, Col, Button } from 'antd';
import { useQuery } from 'react-query';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import dayjs from 'dayjs';

import { transactionsFilters } from '../transactions.service';
import { ITRXFilters, TRXfiltersForm } from '../helpers/Transactions.types';

import classes from './TransactionFiltersModal.module.scss';
import CheckboxGroup from './CheckboxGroup';

type PropTypes = {
  setFilters: Dispatch<SetStateAction<TRXfiltersForm>>;
  initialFilters: TRXfiltersForm;
};

const TransactionFilters: FC<PropTypes> = ({ setFilters, initialFilters }) => {
  const [filtersData, setFiltersData] = useState<{
    [key: string]: CheckboxValueType[];
  }>({
    status: ['PENDING'],
  });

  const [form] = Form.useForm();

  const onFilterChange = (name: string, values: CheckboxValueType[]) => {
    setFiltersData(prevState => ({ ...prevState, [name]: values }));
  };

  const onAllCheck = (name: string, values: CheckboxValueType[]) => {
    setFiltersData(prevState => ({ ...prevState, [name]: values }));
  };

  const TRXfilters = useQuery<ITRXFilters>(
    ['filters'],
    () => transactionsFilters.getTRXFilters(),
    {
      initialData: {},
      onSuccess: data => {
        Object.keys(data).forEach(item => {
          if (item === 'IN' || item === 'OUT') {
            setFiltersData(prev => ({
              ...prev,
              [item]: data[item].map(el => el.name),
            }));
          }
        });
      },
    },
  );

  const onFinish = (data: TRXfiltersForm) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        ...data,
        opType: [...(filtersData.IN || []), ...(filtersData.OUT || [])],
        status: [...(filtersData.STATUS || [])],
        aa_status: [...(filtersData.AUTO || [])],
      };

      return newFilters;
    });
  };

  const filters = useMemo(() => {
    if (!TRXfilters.data) return [];
    return Object.entries(TRXfilters.data);
  }, [TRXfilters]);

  return (
    <>
      <Form
        onFinish={onFinish}
        form={form}
        initialValues={{
          dateFrom: dayjs(initialFilters.dateFrom),
          dateTo: dayjs(initialFilters.dateTo),
        }}>
        <Row gutter={24}>
          <Col span={4}>
            <Form.Item name='dateFrom'>
              <DatePicker showTime placeholder='date from' allowClear={false} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='dateTo'>
              <DatePicker showTime placeholder='date to' allowClear={false} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='playerId'>
              <Input type='number' placeholder='Player ID' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='paymentTransactionId'>
              <Input type='number' placeholder='Payment Transaction ID' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='amountFrom'>
              <Input type='number' placeholder='Amount from' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='amountTo'>
              <Input type='number' placeholder='Amount To' />
            </Form.Item>
          </Col>
        </Row>
        {filters.map(([key, options]) => {
          return (
            <Row
              style={{ paddingBottom: 5, paddingLeft: 5, flexWrap: 'nowrap' }}
              key={key}>
              <CheckboxGroup
                span={1}
                name={key}
                options={options.map((item: { name: string }) => item.name)}
                value={filtersData[key] || []}
                onFilterChange={onFilterChange}
                onAllCheck={onAllCheck}
              />
            </Row>
          );
        })}

        <div className={classes.searchButton}>
          <Button htmlType='submit' type='primary'>
            Search
          </Button>
        </div>
      </Form>
    </>
  );
};

export default TransactionFilters;
