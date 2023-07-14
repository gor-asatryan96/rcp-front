import { Button, Card, Form, Input } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

import { IErrorMessage } from 'redux/store.types';
import { selectLoginUserInfo } from 'redux/reducers/serverConfigs/serverConfigs.slice';

import classes from './UserInfo.module.scss';
import { FormValues } from './userInfo.types';

const UserInfo: FC = () => {
  const { t } = useTranslation();
  const loginUserInfo = useSelector(selectLoginUserInfo);

  const mutation = useMutation({
    mutationFn: (data: FormValues) => {
      delete data.email;
      return axios.post('/auth/update-profile', data);
    },
    onSuccess: () => {
      toast.success('success');
    },
    onError: err => {
      const error = err as unknown as AxiosError<IErrorMessage>;
      toast.error(error.response?.data.message || t('Something went wrong'));
    },
  });

  const onFinish = (values: FormValues) => {
    mutation.mutate(values);
  };
  const initialValues = {
    email: loginUserInfo.email,
    username: loginUserInfo.username,
    firstName: loginUserInfo.first_name,
    lastName: loginUserInfo.last_name,
    phone: loginUserInfo.phone,
  };

  return (
    <Card title={t('User Information')} className={classes.root}>
      <Form
        initialValues={initialValues}
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}>
        <Form.Item label='First Name' name='firstName'>
          <Input />
        </Form.Item>

        <Form.Item label='Last Name' name='lastName'>
          <Input />
        </Form.Item>

        <Form.Item label='Username' name='username'>
          <Input disabled={!!loginUserInfo.username} />
        </Form.Item>

        <Form.Item
          label='Phone Number'
          name='phone'
          rules={
            [
              // { required: true, message: 'Please enter your phone number' },
              // { pattern: /^\d{10}$/, message: 'Phone number must be 10 digits' },
            ]
          }>
          <Input />
        </Form.Item>

        <Form.Item label='Email' name='email'>
          <Input disabled={!!loginUserInfo.email} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserInfo;
