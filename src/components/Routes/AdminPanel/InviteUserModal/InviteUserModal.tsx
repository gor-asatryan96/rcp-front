import { FC } from 'react';
import { Button, Form, Input, Select, Modal } from 'antd';
import axios, { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { useMediaQuery } from 'react-responsive';

import { REGEXPS } from 'constants/regexp.constants';
import { IErrorMessage } from 'redux/store.types';

import { IUserInvite } from './inviteUsers.types';
import classes from './InviteUser.module.scss';

type PropTypes = {
  isAddUserModalOpen: boolean;
  setIsAddUserModalOpen: (x: boolean) => void;
};

const InviteUser: FC<PropTypes> = ({
  isAddUserModalOpen,
  setIsAddUserModalOpen,
}) => {
  const isSmallMobile = useMediaQuery({ query: '(max-width: 575px)' });
  const offsetmobile = !isSmallMobile ? { offset: 4 } : { offset: 0 };
  const queryData = useQuery(['users/invite']);
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: (values: IUserInvite) => {
      return axios.post('/admin/users/invite', values);
    },
    onSuccess: () => {
      setIsAddUserModalOpen(false);
      toast.success(t('User has successfully invited'));
      queryData.refetch();
      form.resetFields();
    },
    onError: err => {
      setIsAddUserModalOpen(false);
      const error = err as unknown as AxiosError<IErrorMessage>;
      toast.error(error.response?.data.message || t('Something went wrong'));
    },
  });

  const onFinish = (values: IUserInvite) => {
    mutation.mutate(values);
  };

  return (
    <Modal
      title='Invite user'
      footer={null}
      onCancel={() => setIsAddUserModalOpen(false)}
      open={isAddUserModalOpen}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        form={form}
        initialValues={{
          role: 'USER',
        }}
        onFinish={onFinish}
        validateTrigger='onSubmit'
        disabled={mutation.isLoading}>
        <Form.Item label='Role' name='role'>
          <Select options={[{ value: 'USER', label: 'USER' }]} />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[
            { required: true, message: 'Please input your email!' },
            {
              pattern: REGEXPS.EMAIL,
              message: 'please input valid email!',
            },
          ]}
          label='Email'>
          <Input type='email' />
        </Form.Item>
        <Form.Item wrapperCol={offsetmobile}>
          <Button
            className={classes.submitButton}
            loading={mutation.isLoading}
            type='primary'
            htmlType='submit'>
            Invite
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InviteUser;
