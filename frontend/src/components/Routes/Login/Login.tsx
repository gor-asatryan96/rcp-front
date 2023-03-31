import { FC } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import { useSelector } from 'react-redux';

import { selectIsServerConfigsLoading } from 'redux/reducers/serverConfigs/serverConfigs.slice';
import { ILoginForm } from 'redux/reducers/serverConfigs/serverConfigs.types';
import { useAppDispatch } from 'redux/hooks/redux.hooks';
import { loginThunk } from 'redux/reducers/serverConfigs/serverConfigs.thunks';

import classes from './Login.module.scss';

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const isServerConfigsLoading = useSelector(selectIsServerConfigsLoading);

  const onFinish = (values: ILoginForm) => {
    dispatch(loginThunk(values));
  };

  return (
    <Card>
      <Form
        disabled={isServerConfigsLoading}
        name='normal_login'
        className={classes.form}
        initialValues={{ remember: true, isRemember: true }}
        onFinish={onFinish}
        autoComplete='off'>
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your Username!' }]}>
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item className={classes.secretToken} name='tft'>
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Secret Token (optional)'
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={isServerConfigsLoading}
            type='primary'
            htmlType='submit'
            className={classes.loginButton}>
            Log in
          </Button>
        </Form.Item>
        <Form.Item name='isRemember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
