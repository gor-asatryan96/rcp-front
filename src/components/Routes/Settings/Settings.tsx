import { Col, Row } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectIsTFAConnected } from 'redux/reducers/serverConfigs/serverConfigs.slice';

import ChangePassword from '../ChangePassword/ChangePassword';

import TFAConnect from './components/TFAConnect/TFAConnect';
import UserInfo from './components/UserInfo/UserInfo';

const layout = {
  xs: { span: 24 },
  lg: { span: 12 },
  xl: { span: 8 },
};

const Settings: FC = () => {
  const isTFAConnected = useSelector(selectIsTFAConnected);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col {...layout}>
          <UserInfo />
        </Col>
        <Col {...layout}>
          <ChangePassword />
        </Col>
        {!isTFAConnected && (
          <Col {...layout}>
            <TFAConnect />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Settings;
