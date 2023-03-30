import { Card, Spin } from 'antd';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoCircleTwoTone } from '@ant-design/icons';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import { AuthService } from 'services/auth.service';
import { selectIsTFAConnected } from 'redux/reducers/serverConfigs/serverConfigs.slice';

import TFAPopup from './TFAPopup/TFAPopup';
import classes from './TFAConnect.module.scss';
import TFAForm from './TFAForm/TFAForm';

const TFAConnect: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTFAConnected = useSelector(selectIsTFAConnected);
  const { isLoading, data } = useQuery(['qrCode'], AuthService.getTFACode, {
    enabled: !isTFAConnected,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Card
      className={classes.root}
      title={t('Connect Google Two Factor Authentication')}>
      <div className={classes.infobutton}>
        <InfoCircleTwoTone
          type='primary'
          onClick={showModal}
          style={{ fontSize: 24 }}
        />
      </div>
      <TFAPopup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className={classes.qrWrapper}>
        {isLoading || !data ? <Spin /> : <TFAForm qrImage={data.qr} />}
      </div>
    </Card>
  );
};

export default TFAConnect;
