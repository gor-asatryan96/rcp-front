import { Card } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import classes from './TFAConnect.module.scss';
import qrImage from './qr-example.png';
// TODO

const TFAConnect: FC = () => {
  const { t } = useTranslation();

  return (
    <Card title={t('Connect Google Two Factor Authentication')}>
      <div className={classes.qrWrapper}>
        <img src={qrImage} alt='qr' className={classes.qrImage} />
      </div>
    </Card>
  );
};

export default TFAConnect;
