import { Breadcrumb } from 'antd';
import { FC } from 'react';

const Navigation: FC = () => {
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Navigation;
