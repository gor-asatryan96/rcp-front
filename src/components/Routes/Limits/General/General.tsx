import { FC, useEffect, useState } from 'react';
import { Button, Card, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import TimeAndDate from 'components/Common/RealTimeAndDate/TimeAndDate';
import GlobalLoader from 'components/Common/GlobalLoader/GlobalLoader';
import { useAppDispatch } from 'redux/hooks/redux.hooks';
import { getGeneralLimitsThunk } from 'redux/reducers/projects/projects.thunks';
import {
  selectGeneralLimits,
  selectIsGeneralLimitsLoading,
} from 'redux/reducers/projects/projects.slice';

import EditeModal from './components/EditModal/EditModal';
import classes from './General.module.scss';
import GeneralLimitTab from './components/GeneralLimitTab/GeneralLimitTab';

const General: FC = () => {
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const generalLimits = useSelector(selectGeneralLimits);
  const isGeneralLimitsLoading = useSelector(selectIsGeneralLimitsLoading);

  const onEditModalClick = () => {
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    dispatch(getGeneralLimitsThunk());
  }, []);

  return (
    <>
      <Divider style={{ fontSize: '1.2rem' }} orientation='right'>
        <TimeAndDate />
      </Divider>
      {isGeneralLimitsLoading ? (
        <GlobalLoader />
      ) : (
        <>
          <Card
            extra={
              <Button
                type='primary'
                onClick={onEditModalClick}
                className={classes.editButton}>
                <EditOutlined />
              </Button>
            }
            title='General'>
            <GeneralLimitTab data={generalLimits} />
          </Card>
          <EditeModal
            data={generalLimits}
            isEditeModalOpen={isEditModalOpen}
            setIsEditeModalOpen={setIsEditModalOpen}
          />
        </>
      )}
    </>
  );
};

export default General;
