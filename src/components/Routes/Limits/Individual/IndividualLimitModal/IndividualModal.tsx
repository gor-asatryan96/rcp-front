import { Button, Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { FC, useState } from 'react';
import { LockOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
// import { t } from 'i18next';
import { useMutation, useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { ColumnsType } from 'antd/es/table';

import { IErrorMessage } from 'redux/store.types';

import { selectOptions } from '../constans';
import {
  IIndividualLimits,
  IIndividualLimitsRequest,
} from '../Individual.types';

import Classes from './IndividualModal.module.scss';

type PropTypes = {
  onSave: () => void;
  isIndividualModalOpen: boolean;
  setIsIndividualModalOpen: (x: boolean) => void;
};

const IndividualModal: FC<PropTypes> = ({
  isIndividualModalOpen,
  setIsIndividualModalOpen,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [page] = useState(1);
  const [selectValue, setIsSelectValue] = useState<any>('');

  const individualTablecolumns: ColumnsType<IIndividualLimits> = [
    { title: 'Player Id', dataIndex: 'userId', key: 'userId' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Individual Limit',
      dataIndex: 'limit',
      key: 'limit',
      render: data => (
        <Input
          type='number'
          defaultValue={data}
          onChange={e => setInputValue(e.target.value)}
        />
      ),
    },
  ];

  const [form] = Form.useForm();
  const queryData = useQuery(['individual-limit/list']);

  const mutation = useMutation({
    mutationFn: (data: IIndividualLimitsRequest) => {
      return axios.post('/setting/individual-limit/list', data);
    },
    onSuccess: () => {
      queryData.refetch();
    },
    onError: err => {
      const error = err as unknown as AxiosError<IErrorMessage>;
      toast.error(error.response?.data.message || t('Something went wrong'));
    },
  });
  const list = mutation.data?.data.list;

  const searchList = useMutation({
    mutationFn: () => {
      return axios.post('/setting/individual-limit/set', {
        value: inputValue || null,
        userId: list[0].userId,
      });
    },
    onSuccess: () => {
      setIsIndividualModalOpen(false);
      toast.success('successfully');
      mutation.reset();
      onSave();
      form.resetFields();
    },
    onError: err => {
      const error = err as unknown as AxiosError<IErrorMessage>;
      toast.error(error.response?.data.message || t('Something went wrong'));
    },
  });

  const onSaveClick = () => {
    searchList.mutate();
  };

  const onFinish = (data: IIndividualLimits) => {
    const body: IIndividualLimitsRequest = {
      orderBy: data.orderBy,
      limit: 10,
      page,
      orderDir: 'DESC',
      [data.orderBy === 'phone' ? 'phone' : 'id']: data.id,
    };

    mutation.mutate(body);
  };
  return (
    <Modal
      title='New Individual Limit'
      footer={null}
      onCancel={() => setIsIndividualModalOpen(false)}
      open={isIndividualModalOpen}>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ orderBy: selectOptions[1].value }}>
        <Row>
          <Col span={7}>
            <Form.Item name='orderBy'>
              <Select
                onChange={value => setIsSelectValue(value)}
                options={selectOptions}
              />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item name='id'>
              <Input
                placeholder={
                  selectValue === 'phone'
                    ? 'Add Min 6 digits'
                    : 'Add Only Digits'
                }
                style={{ borderRadius: '10px 0 0 10px' }}
                type='number'
              />
            </Form.Item>
          </Col>
          <Col span={1}>
            <Form.Item>
              <Button
                style={{ borderRadius: '0 10px 10px 0' }}
                type='primary'
                htmlType='submit'>
                <SearchOutlined />
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        pagination={false}
        style={{ paddingBottom: '1rem' }}
        size='small'
        columns={individualTablecolumns}
        dataSource={list}
        scroll={{ x: true }}
        loading={list?.isLoading}
      />
      <Form.Item>
        <Input.Password prefix={<LockOutlined />} placeholder='Secret Token ' />
      </Form.Item>
      <div className={Classes.SaveAndCancelButtons}>
        <Button
          type='primary'
          danger
          onClick={() => setIsIndividualModalOpen(false)}>
          Cancel
        </Button>
        <Button type='primary' onClick={onSaveClick}>
          Save
          <SaveOutlined />
        </Button>
      </div>
    </Modal>
  );
};

export default IndividualModal;
