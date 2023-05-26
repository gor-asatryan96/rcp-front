import { Button, Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { FC, useState } from 'react';
import { LockOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
// import { t } from 'i18next';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { ColumnsType } from 'antd/es/table';

import { selectOptions } from '../constans';
import { IIndividualLimits } from '../Individual.types';

import Classes from './IndividualModal.module.scss';

type PropTypes = {
  isIndividualModalOpen: boolean;
  setIsIndividualModalOpen: (x: boolean) => void;
};

const IndividualModal: FC<PropTypes> = ({
  isIndividualModalOpen,
  setIsIndividualModalOpen,
}) => {
  const [inputValue, setInputValue] = useState('');

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
    mutationFn: (data: IIndividualLimits) => {
      return axios.post('/setting/individual-limit/list', {
        ...data,
        orderBy: data.orderBy.value,
        limit: 10,
        page: 1,
        orderDir: 'DESC',
      });
    },
    onSuccess: () => {
      queryData.refetch();
      form.resetFields();
    },
    onError: () => {
      setIsIndividualModalOpen(false);
      toast.error(t('Something went wrong'));
    },
  });
  const list = mutation.data?.data.list;

  const searchList = useMutation({
    mutationFn: () => {
      return axios.post('/setting/individual-limit/set', {
        value: inputValue || null,
        userId: 1,
      });
    },
    onSuccess: () => {
      setIsIndividualModalOpen(false);
      toast.success('successfully');
    },
    onError: () => {
      setIsIndividualModalOpen(false);
      toast.error('Something went wrong');
    },
  });

  const onSaveClick = () => {
    searchList.mutate();
  };

  const onFinish = (data: IIndividualLimits) => {
    const body = {
      orderBy: data.orderBy.value,
      [data.orderBy.value === 'phone' ? 'phone' : 'id']: data.id,
    };
    body.phone = data.id;

    mutation.mutate(data);
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
        initialValues={{ orderBy: selectOptions[1] }}>
        <Row>
          <Col span={7}>
            <Form.Item name='orderBy'>
              <Select options={selectOptions} />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item name='id'>
              <Input style={{ borderRadius: '10px 0 0 10px' }} />
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
        style={{ paddingBottom: '1rem' }}
        size='small'
        columns={individualTablecolumns}
        dataSource={list}
        scroll={{ x: true }}
        loading={list?.isLoading}
        pagination={false}
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
