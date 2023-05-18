import { Button, Checkbox, Divider, Form, Input, Row } from 'antd';
import { FC } from 'react';
import { LockOutlined } from '@ant-design/icons';

import {
  autoApproveOptions,
  autoPushOptions,
} from '../Transactions/helpers/Constans';

const AutoPush: FC = () => {
  return (
    <>
      <Divider orientation='left'>AutoPush and AutoApprove</Divider>
      <Form initialValues={{ remember: true }} autoComplete='off'>
        <Row
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '100px',
          }}>
          {autoPushOptions.map(autopush => {
            return (
              <Form.Item label={autopush.name}>
                <Checkbox.Group
                  key={autopush.name}
                  options={autopush.options}
                />
              </Form.Item>
            );
          })}
        </Row>

        <Row
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {autoApproveOptions.map(autoapprove => {
            return (
              <Form.Item label={autoapprove.name}>
                <Checkbox.Group
                  key={autoapprove.name}
                  options={autoapprove.options}
                />
              </Form.Item>
            );
          })}
        </Row>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Input.Password
            style={{ width: 300 }}
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Secret Token '
          />
          <Button type='primary'>Save</Button>
        </div>
      </Form>
    </>
  );
};

export default AutoPush;
