import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Card, Spin } from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';

import { AuthService } from 'services/auth';
import {
  selectIsTFAConnected,
  toggleTFA,
} from 'redux/reducers/serverConfigs/serverConfigs.slice';
import { useAppDispatch } from 'redux/hooks/redux.hooks';

import TFAPopup from './TFAPopup/TFAPopup';
import classes from './TFAConnect.module.scss';
import TFAForm from './TFAForm/TFAForm';
import TFASuccess from './TFASuccess/TFASuccess';

const TFAConnect: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTFAConnected = useSelector(selectIsTFAConnected);
  const { isLoading, data } = useQuery(['qrCode'], AuthService.getTFACode, {
    enabled: !isTFAConnected,
    cacheTime: 0,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const mutation = useMutation(AuthService.verifyTFACode);

  const onSubmit = (values: { code: string }) => {
    mutation.mutate(values.code);
  };

  useEffect(() => {
    if (mutation.isError) {
      toast.error('wrong code!');
    }
  }, [mutation.isError]);

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('your TFA successfully connected!');
      return () => {
        dispatch(toggleTFA());
      };
    }
  }, [mutation.isSuccess]);

  return (
    <Card
      className={classes.root}
      title={t('Connect Google Two Factor Authentication')}
      extra={
        !mutation.isSuccess && (
          <InfoCircleTwoTone
            type='primary'
            onClick={showModal}
            style={{ fontSize: 24 }}
          />
        )
      }>
      <TFAPopup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      {isLoading || !data ? (
        <Spin className={classes.loader} size='large' />
      ) : (
        <div className={classes.body}>
          <div className={classes.imageWrapper}>
            <img src={data.qr} alt='qr' className={classes.qrImage} />
          </div>
          <TFAForm
            onSubmit={onSubmit}
            isDisabled={mutation.isLoading || mutation.isSuccess}
          />
          <TFASuccess isSuccess={mutation.isSuccess} />
        </div>
      )}
    </Card>
  );
};

export default TFAConnect;
