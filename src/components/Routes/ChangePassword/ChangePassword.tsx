import { FC, useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useForm } from 'antd/es/form/Form';

import {
  selectIsNewProfile,
  selectIsPasswordChangeRequired,
  selectIsProfileChangeLoading,
  selectLoginUserInfo,
} from 'redux/reducers/serverConfigs/serverConfigs.slice';
import { ICreatePassword } from 'redux/reducers/serverConfigs/serverConfigs.types';
import { useAppDispatch } from 'redux/hooks/redux.hooks';
import { changeProfileThunk } from 'redux/reducers/serverConfigs/serverConfigs.thunks';
import { REGEXPS } from 'constants/regexp.constants';

import classes from './ChangePassword.module.scss';

const ChangePassword: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isLoading = useSelector(selectIsProfileChangeLoading);
  const isAuthPage = useSelector(selectIsPasswordChangeRequired);
  const isNewProfile = useSelector(selectIsNewProfile);
  const userInfo = useSelector(selectLoginUserInfo);
  const [form] = useForm();

  const onFinish = ({
    password,
    passwordConfirm,
    tft,
    oldPassword,
    username,
    lastName,
    firstName,
  }: ICreatePassword) => {
    if (password !== passwordConfirm) {
      toast.error(t('Passwords do not match'));
      return;
    }
    dispatch(
      changeProfileThunk({
        password,
        tft,
        oldPassword,
        firstName: isAuthPage && isNewProfile ? firstName : userInfo.first_name,
        lastName: isAuthPage && isNewProfile ? lastName : userInfo.last_name,
        username: isAuthPage && isNewProfile ? username : userInfo.username,
      }),
    ).then(() => {
      if (isAuthPage && isNewProfile) {
        localStorage.removeItem('token');
        window.location.reload();
      }
    });
  };
  const validatePassword = (_: any, value: string) => {
    const passwordFieldValue = form.getFieldValue('password'); // Access the password field value
    if (!value) return Promise.reject(new Error('Enter a password.'));
    if (passwordFieldValue !== value)
      return Promise.reject(new Error('Passwords do not match.'));
    if (!REGEXPS.PASSWORD.test(value))
      return Promise.reject(
        new Error(
          'Password must have 8-20 characters, including at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special symbol.',
        ),
      );
    return Promise.resolve();
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
        form={form}
        disabled={isLoading}
        className={classes.form}
        onFinish={onFinish}
        initialValues={{
          username: userInfo.username,
        }}
        autoComplete='off'>
        {isNewProfile && isAuthPage && (
          <>
            <Form.Item
              name='username'
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}>
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Username'
              />
            </Form.Item>
            <Form.Item name='firstName'>
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='first Name'
              />
            </Form.Item>
            <Form.Item name='lastName'>
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Last Name'
              />
            </Form.Item>
          </>
        )}
        {!isAuthPage && (
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
        )}
        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Please input your Password!' },
            {
              validator: validatePassword,
            },
          ]}>
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='New Password'
          />
        </Form.Item>
        <Form.Item
          name='passwordConfirm'
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your Password!' },
            {
              validator: validatePassword,
            },
          ]}>
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Confirm New Password'
          />
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
            {isAuthPage && isNewProfile ? 'Create' : 'Change'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePassword;
