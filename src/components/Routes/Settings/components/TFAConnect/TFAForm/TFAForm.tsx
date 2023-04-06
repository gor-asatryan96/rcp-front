import { FC } from 'react';
import { Button, Form } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import Input from 'antd/es/input/Input';

import classes from './TFAForm.module.scss';

type PropTypes = {
  onSubmit: (values: { code: string }) => void;
  isDisabled: boolean;
};

const TFAForm: FC<PropTypes> = ({ onSubmit, isDisabled }) => {
  return (
    <>
      <Form
        disabled={isDisabled}
        className={classes.form}
        onFinish={onSubmit}
        autoComplete='off'>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please input code from app!',
            },
            {
              pattern: /^\d{6}$/g,
              message: 'code must be 6 digit',
            },
          ]}
          className={classes.secretToken}
          name='code'>
          <Input
            prefix={<QrcodeOutlined className='site-form-item-icon' />}
            placeholder='ex. 123456'
          />
        </Form.Item>
        <Form.Item noStyle>
          <Button
            loading={isDisabled}
            type='primary'
            htmlType='submit'
            className={classes.submitButton}>
            Verify
          </Button>
        </Form.Item>
      </Form>
      <div />
    </>
  );
};

export default TFAForm;
