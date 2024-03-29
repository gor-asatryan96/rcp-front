import { FC, useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { t } from 'i18next';

import { IErrorMessage } from 'redux/store.types';

import { ITRXFilter } from '../helpers/Transactions.types';
import {
  IInBoForm,
  IInBoRequest,
  IInBoResponse,
} from '../InBoModal/inBo.types';

import Classes from './OutBoModal.module.scss';

type PropTypes = {
  TRXfilters: ITRXFilter[] | undefined;
  isOutBoModalOpen: boolean;
  setIsOutBoModalOPen: (x: boolean) => void;
};

const OutBoModal: FC<PropTypes> = ({
  TRXfilters,
  setIsOutBoModalOPen,
  isOutBoModalOpen,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (!isOutBoModalOpen) {
      form.resetFields();
    }
  }, [isOutBoModalOpen]);
  const mutation = useMutation({
    mutationFn: (data: IInBoRequest) => {
      const { token, ...rest } = data;
      return axios.post<IInBoResponse>('/transaction/insert', rest, {
        headers: {
          'x-tf-token': token,
        },
      });
    },
    onSuccess: res => {
      const requestBody: IInBoRequest = JSON.parse(res.config.data);
      const requestedIds = requestBody.usersIds;
      const invalidIds = res.data.missingPlayersIds;
      setIsOutBoModalOPen(false);
      form.resetFields();
      if (requestedIds?.length !== invalidIds?.length) {
        const insertedIds = !invalidIds?.length
          ? requestedIds
          : requestedIds.filter(id => !invalidIds.includes(id));
        toast.success(
          `${t('Тhese IDs successfully inserted')} - ${insertedIds.toString()}`,
        );
      }
      if (invalidIds?.length) {
        toast.error(
          `${t("Тhese IDs don't exist")} - ${invalidIds.toString()}`,
          { autoClose: false },
        );
      }
    },
    onError: err => {
      const error = err as unknown as AxiosError<IErrorMessage>;
      toast.error(error.response?.data.message || t('Something went wrong'));
    },
  });

  const filters = TRXfilters?.map(item => ({ value: item.name }));

  const onFinish = (data: IInBoForm) => {
    const requestBody: IInBoRequest = {
      amount: data.amount,
      opType: data.opType,
      usersIds: data.usersInput.split(',').map(Number),
      paymentTransactionId: data.paymentTransactionId,
      remoteTransactionId: data.remoteTransactionId,
      reason: data.reason,
      type: 'OUT',
      token: data.token,
    };

    mutation.mutate(requestBody);
  };

  return (
    <Modal
      open={isOutBoModalOpen}
      width={400}
      footer={null}
      onCancel={() => setIsOutBoModalOPen(false)}
      title='OUT'>
      <Form
        form={form}
        validateTrigger='onSubmit'
        disabled={mutation.isLoading}
        onFinish={onFinish}>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'The field is required!',
            },
            {
              pattern: /^[\d,]+$/,
              message: 'Input must include only chars and comma!',
            },
          ]}
          name='usersInput'>
          <Input placeholder='Player ID' />
        </Form.Item>
        <Row>
          <Col span={14}>
            <Form.Item name='amount'>
              <Input placeholder='Amount' type='number' />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item name='opType'>
              <Select style={{ width: '9rem' }} options={filters} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name='paymentTransactionId'>
              <Input placeholder='Payment TRX ID' />
            </Form.Item>
            <Form.Item name='reason'>
              <Input placeholder='Reason' />
            </Form.Item>
            {/* <Form.Item name='token'>
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                placeholder='Secret Token '
              />
            </Form.Item> */}
          </Col>
        </Row>
        <div className={Classes.SaveAndCancelButtons}>
          <Button
            onClick={() => setIsOutBoModalOPen(false)}
            type='primary'
            danger>
            Cancel
          </Button>
          <Button loading={mutation.isLoading} type='primary' htmlType='submit'>
            Save
            <SaveOutlined />
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default OutBoModal;
