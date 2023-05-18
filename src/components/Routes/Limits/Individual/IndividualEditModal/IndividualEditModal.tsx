import { Button, Form, Input, Modal } from 'antd';
import { FC } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';

import { DataType, ILimitChange } from '../Individual.types';

import Classes from './IndividualEditModal.module.scss';

type PropTypes = {
  isPlayerEditModalOpen: DataType | null;
  setIsPlayerEditModalOpen: (x: null) => void;
};

const IndividualEditeModal: FC<PropTypes> = ({
  isPlayerEditModalOpen,
  setIsPlayerEditModalOpen,
}) => {
  const [form] = Form.useForm();
  const queryData = useQuery(['users/inviteee']);

  const mutation = useMutation({
    mutationFn: (values: ILimitChange) => {
      return axios.post('users/inviteeee', values);
    },
    onSuccess: () => {
      setIsPlayerEditModalOpen(null);
      toast.success('User hase successfully invited');
      queryData.refetch();
      form.resetFields();
    },
    onError: () => {
      setIsPlayerEditModalOpen(null);
      queryData.refetch();
      toast.error('Something went wrong');
    },
  });

  const onFinish = (values: ILimitChange) => {
    mutation.mutate(values);
  };

  return (
    <Modal
      width={400}
      footer={null}
      onCancel={() => setIsPlayerEditModalOpen(null)}
      open={!!isPlayerEditModalOpen}>
      <Form.Item label='Phone Number'>
        {isPlayerEditModalOpen?.phoneNumber}
      </Form.Item>
      <Form.Item label='Player ID'>{isPlayerEditModalOpen?.playerId}</Form.Item>
      <Form
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 16 }}
        form={form}
        onFinish={onFinish}>
        <Form.Item label='Limit'>
          <Input />
        </Form.Item>
        <Form.Item label='Token'>
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Secret Token'
          />
        </Form.Item>
      </Form>
      <div className={Classes.SaveAndCancelButtons}>
        <Button
          onClick={() => setIsPlayerEditModalOpen(null)}
          type='primary'
          danger>
          Cancel
        </Button>
        <Button loading={mutation.isLoading} type='primary'>
          Save
          <SaveOutlined />
        </Button>
      </div>
    </Modal>
  );
};

export default IndividualEditeModal;
