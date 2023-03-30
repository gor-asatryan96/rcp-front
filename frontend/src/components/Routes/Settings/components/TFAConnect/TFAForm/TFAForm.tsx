import { Button, Form } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import Input from 'antd/es/input/Input';
import { useMutation } from 'react-query';
import { FC } from 'react';

import { AuthService } from 'services/auth.service';

import classes from './TFAForm.module.scss';

type PropTypes = {
  qrImage: string;
};

const TFAForm: FC<PropTypes> = ({ qrImage }) => {
  const mutation = useMutation(AuthService.verifyTFACode);

  const onFinish = (values: { code: string }) => {
    mutation.mutate(values.code);
  };

  return (
    <div>
      <img src={qrImage} alt='qr' className={classes.qrImage} />
      <Form className={classes.form} onFinish={onFinish} autoComplete='off'>
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
            loading={mutation.isLoading}
            type='primary'
            htmlType='submit'
            className={classes.submitButton}>
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TFAForm;
