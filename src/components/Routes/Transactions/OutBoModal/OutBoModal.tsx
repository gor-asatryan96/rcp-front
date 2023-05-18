import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { FC } from 'react';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';

import { InBoTypeValues } from '../InBoModal/InBoModal';

import Classes from './OutBoModal.module.scss';

type PropTypes = {
  isOutBoModalOpen: boolean;
  setIsOutBoModalOPen: (x: boolean) => void;
};

const OutBoModal: FC<PropTypes> = ({
  setIsOutBoModalOPen,
  isOutBoModalOpen,
}) => {
  return (
    <Modal
      title='Out'
      open={isOutBoModalOpen}
      width={400}
      footer={null}
      onCancel={() => setIsOutBoModalOPen(false)}>
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
        <Button
          onClick={() => setIsOutBoModalOPen(false)}
          type='primary'
          danger>
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

export default OutBoModal;
