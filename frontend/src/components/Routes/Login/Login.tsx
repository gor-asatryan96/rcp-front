import { FC } from 'react';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import { serverConfigsDispatches } from '../../../redux/reducers/serverConfigs/serverConfigs.dispatches';

import classes from './Login.module.css';

const Login: FC = () => {
  const loginThunk = serverConfigsDispatches.useLogin();
  const [form] = Form.useForm();
  // const [isSecretTokenExist, setIsSecretTokenExist] = useState(false);

  // console.log('isSecretTokenExist', isSecretTokenExist);

  // const onCheckboxChange = () => {
  //   setIsSecretTokenExist(prev => !prev);
  // };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    loginThunk();
  };
  const onFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo);
  };
  // useEffect(() => {
  //   if (!isSecretTokenExist) {
  //     form.setFieldValue('secretToken', '');
  //   }
  // }, [isSecretTokenExist]);

  return (
    <Form
      form={form}
      name='normal_login'
      className={classes.form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}>
      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label='Token' name='token'>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='remember'
        valuePropName='checked'
        wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
