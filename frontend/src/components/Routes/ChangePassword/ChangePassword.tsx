import { FC } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectIsServerConfigsLoading } from '../../../redux/reducers/serverConfigs/serverConfigs.slice';
import { ILoginForm } from '../../../redux/reducers/serverConfigs/serverConfigs.types';
import { useAppDispatch } from '../../../redux/hooks/redux.hooks';
import { loginThunk } from '../../../redux/reducers/serverConfigs/serverConfigs.thunks';

import classes from './ChangePassword.module.scss';

const ChangePassword: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isServerConfigsLoading = useSelector(selectIsServerConfigsLoading);

  const onFinish = (values: ILoginForm) => {
    dispatch(loginThunk(values));
  };

  return (
    <Form
      disabled={isServerConfigsLoading}
      // name='normal_login'
      className={classes.form}
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete='off'>
      <Typography.Title className={classes.title} level={5}>
        {t('Change Password')}
      </Typography.Title>
      <Divider />
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username'
        />
      </Form.Item>
      <Form.Item
        name='oldPasswrod'
        rules={[
          { required: true, message: 'Please input your Old Password!' },
        ]}>
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Old Password'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          { required: true, message: 'Please input your New Password!' },
        ]}>
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='New Password'
        />
      </Form.Item>
      <Form.Item
        name='passwordConfirm'
        rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Confirm New Password'
        />
      </Form.Item>
      <Form.Item className={classes.secretToken} name='secretToken'>
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Secret Token (optional)'
        />
      </Form.Item>
      <Form.Item noStyle>
        <Button
          loading={isServerConfigsLoading}
          type='primary'
          htmlType='submit'
          className={classes.loginButton}>
          Change
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
