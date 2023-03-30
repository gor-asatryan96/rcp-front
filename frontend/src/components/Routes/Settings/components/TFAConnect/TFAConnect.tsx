import { Card, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircleTwoTone, InfoCircleTwoTone } from '@ant-design/icons';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import classNames from 'classnames';

import { AuthService } from 'services/auth.service';
import {
  selectIsTFAConnected,
  toggleTFA,
} from 'redux/reducers/serverConfigs/serverConfigs.slice';
import { useAppDispatch } from 'redux/hooks/redux.hooks';

import TFAPopup from './TFAPopup/TFAPopup';
import classes from './TFAConnect.module.scss';
import TFAForm from './TFAForm/TFAForm';

const TFAConnect: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTFAConnected = useSelector(selectIsTFAConnected);
  const { isLoading, data } = useQuery(['qrCode'], AuthService.getTFACode, {
    enabled: !isTFAConnected,
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
      <div className={classes.body}>
        {isLoading || !data ? (
          <Spin />
        ) : (
          <>
            <div className={classes.imageWrapper}>
              <img src={data.qr} alt='qr' className={classes.qrImage} />
            </div>
            <TFAForm
              onSubmit={onSubmit}
              isDisabled={mutation.isLoading || mutation.isSuccess}
            />
            <div
              className={classNames(classes.successIconWrapper, {
                [classes.successed]: mutation.isSuccess,
              })}>
              <CheckCircleTwoTone
                twoToneColor='#52c41a'
                className={classes.successIcon}
              />
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default TFAConnect;
