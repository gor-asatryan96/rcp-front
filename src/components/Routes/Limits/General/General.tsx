import { FC, useState } from 'react';
import { Button, Card, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import TimeAndDate from 'components/Common/RealTimeAndDate/TimeAndDate';

import EditeModal from './components/EditModal/EditModal';
import LimitTab from './components/GeneralLimitTab/GeneralLimitTab';
import classes from './General.module.scss';

const General: FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onEditModalClick = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <Divider style={{ fontSize: '1.2rem' }} orientation='right'>
        <TimeAndDate />
      </Divider>
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
        <LimitTab />
      </Card>
      <EditeModal
        isEditeModalOpen={isEditModalOpen}
        setIsEditeModalOpen={setIsEditModalOpen}
      />
    </>
  );
};

export default General;
