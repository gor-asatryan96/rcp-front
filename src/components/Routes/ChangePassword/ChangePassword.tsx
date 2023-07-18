import { FC, useEffect } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { toast } from 'react-toastify';

import {
  selectIsNewProfile,
  selectIsPasswordChangeRequired,
  selectIsProfileChangeLoading,
} from 'redux/reducers/serverConfigs/serverConfigs.slice';
import { ICreatePassword } from 'redux/reducers/serverConfigs/serverConfigs.types';
import { useAppDispatch } from 'redux/hooks/redux.hooks';
import { changeProfileThunk } from 'redux/reducers/serverConfigs/serverConfigs.thunks';

import classes from './ChangePassword.module.scss';

const ChangePassword: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isLoading = useSelector(selectIsProfileChangeLoading);
  const isAuthPage = useSelector(selectIsPasswordChangeRequired);
  const isNewProfile = useSelector(selectIsNewProfile);

  const onFinish = ({
    password,
    passwordConfirm,
    tft,
    username,
    lastName,
    firstName,
  }: ICreatePassword) => {
    if (password !== passwordConfirm) {
      toast.error(t('Passwords do not match'));
      return;
    }
    dispatch(
      changeProfileThunk({ password, tft, username, lastName, firstName }),
    );
  };

  useEffect(() => {
    if (isAuthPage) {
      toast.warn(
        t(
          isNewProfile
            ? 'You should change your password!'
            : 'Please create your password!',
        ),
      );
    }
  }, [isAuthPage, isNewProfile]);

  return (
    <Card
      title={t(
        isAuthPage && isNewProfile ? 'Create New Password' : 'Change Password',
      )}
      className={classNames(classes.root, { [classes.authPage]: isAuthPage })}>
      <Form
        disabled={isLoading}
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
        {/* {!isAuthPage && (
          <Form.Item
            name='oldPassword'
            rules={[
              { required: true, message: 'Please input your Old Password!' },
            ]}>
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Old Password'
            />
          </Form.Item>
        )} */}
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
        <Form.Item name='firstName'>
          <Input placeholder='First Name' />
        </Form.Item>
        <Form.Item name='lastname'>
          <Input placeholder='Last Name' />
        </Form.Item>
        <Form.Item name='username'>
          <Input placeholder='Username' />
        </Form.Item>
        {!isNewProfile && (
          <Form.Item className={classes.secretToken} name='tft'>
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Secret Token (optional)'
            />
          </Form.Item>
        )}
        <Form.Item noStyle>
          <Button
            loading={isLoading}
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
