import { Card } from 'antd';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoCircleTwoTone } from '@ant-design/icons';

import TFAPopup from './TFAPopup/TFAPopup';
import classes from './TFAConnect.module.scss';
import qrImage from './qr-example.png';
// TODO

const TFAConnect: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <img src={qrImage} alt='qr' className={classes.qrImage} />
      </div>
    </Card>
  );
};

export default TFAConnect;
