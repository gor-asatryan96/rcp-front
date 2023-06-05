import { Button, Form, Input, Modal } from 'antd';
import { FC } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';

import { IIndividualEditLimits, ILimitChange } from '../Individual.types';

import Classes from './IndividualEditModal.module.scss';

type PropTypes = {
  refetch: any;
  isPlayerEditModalOpen: IIndividualEditLimits | null;
  setIsPlayerEditModalOpen: (x: null) => void;
};

const IndividualEditeModal: FC<PropTypes> = ({
  refetch,
  isPlayerEditModalOpen,
  setIsPlayerEditModalOpen,
}) => {
  const [form] = Form.useForm();
  const mutation = useMutation({
    mutationFn: (value: number) => {
      return axios.post('/setting/individual-limit/set', {
        value: value || null,
        userId: isPlayerEditModalOpen?.userId,
      });
    },
    onSuccess: () => {
      refetch();
      form.resetFields();
      setIsPlayerEditModalOpen(null);
      toast.success('successfully');
    },
    onError: () => {
      setIsPlayerEditModalOpen(null);
      refetch();
      toast.error('Something went wrong');
    },
  });

  const onFinish = (data: ILimitChange) => {
    mutation.mutate(data.value);
  };

  return (
    <Modal
      width={400}
      footer={null}
      onCancel={() => setIsPlayerEditModalOpen(null)}
      open={!!isPlayerEditModalOpen}>
      <Form form={form} onFinish={onFinish} disabled={mutation.isLoading}>
        <Form.Item label='Phone Number'>
          {isPlayerEditModalOpen?.phone}
        </Form.Item>
        <Form.Item label='Player ID'>{isPlayerEditModalOpen?.userId}</Form.Item>
        <Form.Item label='Limit' name='value'>
          <Input defaultValue={isPlayerEditModalOpen?.limit} type='number' />
        </Form.Item>
        <Form.Item label='Token'>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder='Secret Token'
          />
        </Form.Item>
        <div className={Classes.SaveAndCancelButtons}>
          <Button
            onClick={() => setIsPlayerEditModalOpen(null)}
            type='primary'
            danger>
            Cancel
          </Button>
          <Button htmlType='submit' loading={mutation.isLoading} type='primary'>
            Save
            <SaveOutlined />
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default IndividualEditeModal;
