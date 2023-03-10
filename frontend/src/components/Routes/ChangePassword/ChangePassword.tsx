import { FC } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import {
  selectIsPasswordChangeRequired,
  selectIsServerConfigsLoading,
} from '../../../redux/reducers/serverConfigs/serverConfigs.slice';
import { ILoginForm } from '../../../redux/reducers/serverConfigs/serverConfigs.types';
import { useAppDispatch } from '../../../redux/hooks/redux.hooks';
import { loginThunk } from '../../../redux/reducers/serverConfigs/serverConfigs.thunks';

import classes from './ChangePassword.module.scss';

const ChangePassword: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isServerConfigsLoading = useSelector(selectIsServerConfigsLoading);
  const isAuthPage = useSelector(selectIsPasswordChangeRequired);

  const onFinish = (values: ILoginForm) => {
    dispatch(loginThunk(values));
  };

  return (
    <Card
      title={t('Change Password')}
      className={classNames(classes.root, { [classes.authPage]: isAuthPage })}>
      <Form
        disabled={isServerConfigsLoading}
        className={classes.form}
        onFinish={onFinish}
        autoComplete='off'>
        {/* {isAuthPage && (
          <Form.Item
            name='username'
            initialValue='test'
            rules={[
              { required: true, message: 'Please input your Username!' },
            ]}>
            <Input
              readOnly
              disabled
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Username'
            />
          </Form.Item>
        )} */}
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
    </Card>
  );
};

export default ChangePassword;
