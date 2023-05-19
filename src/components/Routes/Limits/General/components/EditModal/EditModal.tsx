import { ChangeEvent, FC, useState } from 'react';
import { Button, Card, Col, Form, Input, Modal, Popover, Row } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import classes from './EditModal.module.scss';

type PropTypes = {
  isEditeModalOpen: boolean;
  setIsEditeModalOpen: (x: boolean) => void;
};

const EditeModal: FC<PropTypes> = ({
  isEditeModalOpen,
  setIsEditeModalOpen,
}) => {
  const { t } = useTranslation();
  const gameNames = ['Sport', 'Casino', 'Games'];
  const [inputNumber, setInputNumber] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);

    if (value > 100) {
      value = 100;
    }
    if (value < 0) {
      value = 0;
    }

    setInputNumber(value.toString());
  };
  return (
    <Modal
      footer={null}
      onCancel={() => setIsEditeModalOpen(false)}
      open={isEditeModalOpen}>
      <Card className={classes.dailyEditModalCard}>
        <Form.Item labelCol={{ span: 6 }} label='Withdraw Limit'>
          <Input type='number' min={0} style={{ width: 250 }} />
        </Form.Item>
        <Popover
          trigger='hover'
          placement='top'
          content='Deposit Draw Condition'>
          <Form.Item labelCol={{ span: 6 }} label='DDC'>
            <Input
              prefix='%'
              min={0}
              max={100}
              value={inputNumber}
              onChange={handleInputChange}
              type='number'
              style={{ width: 250 }}
            />
          </Form.Item>
        </Popover>
        <Row justify='center'>
          <Col span={12}>{t('Winning Limit')}</Col>
          {t('GGR Limit')}
        </Row>
        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 22 }}>
          {gameNames.map(i => (
            <Form.Item key={i} style={{ marginBottom: 0 }} label={i}>
              <Form.Item
                className={classes.dailyEditModalInputTitle}
                rules={[{ required: true }]}>
                <Input min={0} type='number' />
              </Form.Item>
              <Form.Item
                rules={[{ required: true }]}
                className={classes.dailyEditModalInputBody}>
                <Input min={0} type='number' />
              </Form.Item>
            </Form.Item>
          ))}
        </Form>
        <Form labelCol={{ span: 3 }}>
          <Form.Item
            label='Token'
            className={classes.dailyEditModalTFT}
            style={{ width: 'calc(100% - 8px)' }}
            name='tft'>
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Secret Token (optional)'
            />
          </Form.Item>
        </Form>
      </Card>
      <Row
        justify='center'
        className={classes.dailyEditModalconfirmButtonsBody}>
        <Col>
          <Button
            className={classes.dailyEditModalConfirmButton}
            type='primary'
            danger
            onClick={() => setIsEditeModalOpen(false)}>
            Cancel
          </Button>
          <Button type='primary' onClick={() => setIsEditeModalOpen(false)}>
            Save
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default EditeModal;
