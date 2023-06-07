import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { FC } from 'react';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';
import { useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { t } from 'i18next';

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

  const mutation = useMutation({
    mutationFn: (data: IInBoRequest) => {
      return axios.post<IInBoResponse>('/transaction/insert', data);
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
    onError: () => {
      setIsOutBoModalOPen(false);
      toast.error(t('Something went wrong'));
    },
  });

  const filters = TRXfilters?.map(item => ({ value: item.name }));

  const onFinish = (data: IInBoForm) => {
    const requestBody: IInBoRequest = {
      amount: data.amount,
      opType: data.opType,
      usersIds: data.usersInput.split(',').map(Number),
      paymentTransactionId: data.paymentTransactionId,
      reason: data.reason,
      type: 'OUT',
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
        initialValues={{
          opType: filters?.[0].value,
        }}
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
              <Input style={{ marginTop: '1rem' }} placeholder='Reason' />
            </Form.Item>
            <Input.Password
              style={{ marginTop: '1rem' }}
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Secret Token '
            />
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
