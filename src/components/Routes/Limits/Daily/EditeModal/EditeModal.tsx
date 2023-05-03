import { Button, Form, Modal } from 'antd';
import Input from 'antd/es/input/Input';
import { FC } from 'react';

import Classes from './EditeModal.module.scss';
// import { Form } from 'react-router-dom';

type PropTypes = {
  isEditeModalOpen: boolean;
  setIsEditeModalOpen: (x: boolean) => void;
};

const EditeModal: FC<PropTypes> = ({
  isEditeModalOpen,
  setIsEditeModalOpen,
}) => {
  return (
    <Modal
      footer={null}
      onCancel={() => setIsEditeModalOpen(false)}
      open={isEditeModalOpen}>
      <Form>
        <Form.Item
          className={Classes.withdrawLimitInput}
          label='Withdraw Limit'>
          <Input type='number' style={{ width: 300 }} />
        </Form.Item>
        <div className={Classes.Limits}>
          <h4>Winning Limit</h4>
          <h4>GGR Limit</h4>
        </div>
        <div>
          <Form.Item className={Classes.sportInputs} label='Sport'>
            <Input style={{ width: 200 }} />
            <Input style={{ width: 200 }} />
          </Form.Item>
          <Form.Item label='Casino'>
            <Input style={{ width: 200 }} />
            <Input style={{ width: 200 }} />
          </Form.Item>
          <Form.Item label='Games'>
            <Input style={{ width: 200 }} />
            <Input style={{ width: 200 }} />
          </Form.Item>
          <Form.Item label='Token'>
            <Input />
          </Form.Item>
        </div>
        <div className={Classes.SaveAndCancelButtons}>
          <Button
            type='primary'
            danger
            onClick={() => setIsEditeModalOpen(false)}>
            Cancel
          </Button>
          <Button type='primary' onClick={() => setIsEditeModalOpen(false)}>
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditeModal;
