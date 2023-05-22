import { Button, Form, Input, Modal } from 'antd';
import { FC } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';

import { IIndividualLimits, ILimitChange } from '../Individual.types';

import Classes from './IndividualEditModal.module.scss';

type PropTypes = {
  refetch: any;
  isPlayerEditModalOpen: IIndividualLimits | null;
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
        value,
        userId: isPlayerEditModalOpen?.userId,
      });
    },
    onSuccess: () => {
      refetch();
      form.resetFields();
      setIsPlayerEditModalOpen(null);

      // toast.success('User hase successfully invited');
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
          <Input type='number' />
        </Form.Item>
        <Form.Item label='Token'>
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
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
