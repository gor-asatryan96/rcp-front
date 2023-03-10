import { Col, Row } from 'antd';
import { FC } from 'react';

import ChangePassword from '../ChangePassword/ChangePassword';

import TFAConnect from './components/TFAConnect/TFAConnect';
import UserInfo from './components/UserInfo/UserInfo';

const Settings: FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }}>
          <UserInfo />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }}>
          <ChangePassword />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }}>
          <TFAConnect />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }}>
          <UserInfo />
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
