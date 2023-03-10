import { Card } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import classes from './UserInfo.module.scss';

const UserInfo: FC = () => {
  const { t } = useTranslation();
  return (
    <Card title={t('User Information')} className={classes.root}>
      UserInfo
    </Card>
  );
};

export default UserInfo;
