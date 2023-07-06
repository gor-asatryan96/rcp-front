import { Button, Form, Input, Modal } from 'antd';
import { FC } from 'react';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';
import { t } from 'i18next';

import { IErrorMessage } from 'redux/store.types';

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
    mutationFn: (data: ILimitChange) => {
      return axios.post(
        '/setting/individual-limit/set',
        {
          value: data.value || null,
          userId: isPlayerEditModalOpen?.userId,
        },
        {
          headers: {
            'x-tf-token': data.token,
          },
        },
      );
    },
    onSuccess: () => {
      refetch();
      form.resetFields();
      setIsPlayerEditModalOpen(null);
      toast.success('successfully');
    },
    onError: err => {
      refetch();
      const error = err as unknown as AxiosError<IErrorMessage>;
      toast.error(error.response?.data.message || t('Something went wrong'));
    },
  });

  const onFinish = (data: ILimitChange) => {
    mutation.mutate(data);
  };

  const onCancel = () => {
    form.resetFields();
    setIsPlayerEditModalOpen(null);
  };

  return (
    <Modal
      width={400}
      footer={null}
      onCancel={onCancel}
      open={!!isPlayerEditModalOpen}>
      {isPlayerEditModalOpen && (
        <Form form={form} onFinish={onFinish} disabled={mutation.isLoading}>
          <Form.Item label='Phone Number'>
            {isPlayerEditModalOpen?.phone}
          </Form.Item>
          <Form.Item label='Player ID'>
            {isPlayerEditModalOpen?.userId}
          </Form.Item>
          <Form.Item label='Initial Limit'>
            {isPlayerEditModalOpen?.limit}
          </Form.Item>
          <Form.Item label='Limit' name='value'>
            <Input type='number' />
          </Form.Item>
          <Form.Item label='Token' name='token'>
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
            <Button
              htmlType='submit'
              loading={mutation.isLoading}
              type='primary'>
              Save
              <SaveOutlined />
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default IndividualEditeModal;
