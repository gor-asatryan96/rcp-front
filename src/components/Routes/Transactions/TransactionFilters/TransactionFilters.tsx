import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DatePicker, Input, Form, Row, Col, Button } from 'antd';
import { useQuery } from 'react-query';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import { selectLoginUserInfo } from 'redux/reducers/serverConfigs/serverConfigs.slice';
import { selectActiveProjectID } from 'redux/reducers/projects/projects.slice';

import { transactionsFilters } from '../transactions.service';
import { ITRXFilters, TRXfiltersForm } from '../helpers/Transactions.types';

import classes from './TransactionFiltersModal.module.scss';
import CheckboxGroup from './CheckboxGroup';

function exportFile(token: string, body: Record<string, any>) {
  const myHeaders = new Headers();
  myHeaders.append('x-auth-token', token);
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: 'follow',
  };

  fetch(
    `${process.env.REACT_APP_API_URL}/transaction/export`,
    requestOptions as any,
  )
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error(error);
    });
}

type PropTypes = {
  remove: any;
  refetch: any;
  filter: any;
  setFilters: Dispatch<SetStateAction<TRXfiltersForm>>;
  initialFilters: TRXfiltersForm;
};

const TransactionFilters: FC<PropTypes> = ({
  setFilters,
  filter,
  initialFilters,
  remove,
  refetch,
}) => {
  const [filtersData, setFiltersData] = useState<{
    [key: string]: CheckboxValueType[];
  }>({
    STATUS: ['PENDING'],
  });
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const activeCountryId = useSelector(selectActiveProjectID);

  const [form] = Form.useForm();

  const onFilterChange = (name: string, values: CheckboxValueType[]) => {
    setFiltersData(prevState => ({ ...prevState, [name]: values }));
  };

  const onAllCheck = (name: string, values: CheckboxValueType[]) => {
    setFiltersData(prevState => ({ ...prevState, [name]: values }));
  };

  const exportEnv = () => {
    const exportFilter: any = { ...filter };
    delete exportFilter.page;
    delete exportFilter.limit;

    exportFile(loginUserInfo.token, exportFilter);
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

  useEffect(() => {
    TRXfilters.refetch();
  }, [activeCountryId]);

  const onFinish = (data: TRXfiltersForm) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        ...data,
        opType: [...(filtersData.IN || []), ...(filtersData.OUT || [])],
        status: [...(filtersData.STATUS || [])],
        aa_status: [...(filtersData.AUTO || [])],
      };
      remove();
      refetch();

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
          <Col span={3}>
            <Form.Item name='dateFrom'>
              <DatePicker showTime placeholder='date from' allowClear={false} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name='dateTo'>
              <DatePicker showTime placeholder='date to' allowClear={false} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name='playerId'>
              <Input type='number' placeholder='Player ID' />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name='paymentTransactionId'>
              <Input placeholder='Payment Transaction ID' />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name='transactionId'>
              <Input type='number' placeholder='TRX ID' />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name='amountFrom'>
              <Input type='number' placeholder='Amount from' />
            </Form.Item>
          </Col>
          <Col span={3}>
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

        <div className={classes.searchExportButton}>
          <div className={classes.searchButton}>
            <Button htmlType='submit' type='primary'>
              Search
            </Button>
          </div>

          <Button type='primary' onClick={exportEnv}>
            Export
          </Button>
        </div>
      </Form>
    </>
  );
};

export default TransactionFilters;
