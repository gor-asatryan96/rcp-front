import { FC } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useSelector } from 'react-redux';

import { serverConfigsDispatches } from '../../../redux/reducers/serverConfigs/serverConfigs.dispatches';
import { selectIsServerConfigsLoading } from '../../../redux/reducers/serverConfigs/serverConfigs.slice';

import classes from './Login.module.css';

const Login: FC = () => {
  const loginThunk = serverConfigsDispatches.useLogin();
  const [form] = Form.useForm();
  const isServerConfigsLoading = useSelector(selectIsServerConfigsLoading);
  // const [isSecretTokenExist, setIsSecretTokenExist] = useState(false);

  // console.log('isSecretTokenExist', isSecretTokenExist);

  // const onCheckboxChange = () => {
  //   setIsSecretTokenExist(prev => !prev);
  // };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    loginThunk();
  };
  // useEffect(() => {
  //   if (!isSecretTokenExist) {
  //     form.setFieldValue('secretToken', '');
  //   }
  // }, [isSecretTokenExist]);

  return (
    <Form
      disabled={isServerConfigsLoading}
      form={form}
      name='normal_login'
      className={classes.form}
      initialValues={{ remember: true }}
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
      <Form.Item
        className={classes.secretToken}
        name='secretToken'
        // rules={[
        //   {
        //     required: isSecretTokenExist,
        //     message: 'Please input your secret token!',
        //   },
        // ]}
      >
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Secret Token'
        />
      </Form.Item>
      {/* <Form.Item
        name='secret_key_checkbox'
        valuePropName='secret_key_checkbox'
        noStyle>
        <Switch
          className={classes.secretTokenSwitcher}
          checked={isSecretTokenExist}
          onChange={onCheckboxChange}
        />
        Do you have Secret Token?
      </Form.Item> */}
      <Form.Item>
        <Button
          loading={isServerConfigsLoading}
          type='primary'
          htmlType='submit'
          className={classes.loginButton}>
          Log in
        </Button>
      </Form.Item>
      <Form.Item name='remember' valuePropName='checked' noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default Login;
