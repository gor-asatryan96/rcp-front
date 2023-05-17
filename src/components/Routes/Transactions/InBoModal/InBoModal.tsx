import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { FC } from 'react';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';

import Classes from './InBoModal.module.scss';

type PropTypes = {
  isInBoModalOpen: boolean;
  setIsInBoModalOpen: (x: boolean) => void;
};

export const InBoTypeValues = [
  { value: 'IN-MPESA-M', label: 'IN-MPESA-M' },
  { value: 'IN-Halopesa-M', label: 'IN-Halopesa-M' },
  { value: 'IN-Tigo-M', label: 'IN-Tigo-M' },
  { value: 'IN-Airtel-M', label: 'IN-Airtel-M' },
  { value: 'Out-Mpesa-M', label: 'Out-Mpesa-M' },
];

const InBoModal: FC<PropTypes> = ({ setIsInBoModalOpen, isInBoModalOpen }) => {
  return (
    <Modal
      open={isInBoModalOpen}
      width={400}
      footer={null}
      onCancel={() => setIsInBoModalOpen(false)}
      title='In'>
      <Form>
        <Form.Item>
          <Input placeholder='Player ID' />
        </Form.Item>
        <Row>
          <Col span={14}>
            <Input placeholder='Amount' />
          </Col>
          <Col span={2}>
            <Select
              style={{ width: '9rem' }}
              defaultValue={InBoTypeValues[0]}
              options={InBoTypeValues}
            />
          </Col>
          <Col span={24}>
            <Input style={{ marginTop: '1rem' }} placeholder='Transaction ID' />
            <Input style={{ marginTop: '1rem' }} placeholder='Reason' />
            <Input.Password
              style={{ marginTop: '1rem' }}
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Secret Token '
            />
          </Col>
        </Row>
      </Form>
      <div className={Classes.SaveAndCancelButtons}>
        <Button onClick={() => setIsInBoModalOpen(false)} type='primary' danger>
          Cancel
        </Button>
        <Button type='primary'>
          Save
          <SaveOutlined />
        </Button>
      </div>
    </Modal>
  );
};

export default InBoModal;
