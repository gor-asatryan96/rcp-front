// import { EditOutlined } from '@ant-design/icons';
// import { Button } from 'antd';
import Input from 'antd/es/input/Input';
import { FC, useState } from 'react';
import { Button, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Column from 'antd/es/table/Column';

import classes from './Daily.module.scss';
import EditeModal from './EditeModal/EditeModal';

const Daily: FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onEditModalClick = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className={classes.header}>
        <h1>Daily</h1>
        <h1>Date: 22.22.2020</h1>
      </div>
      <div className={classes.withdrawLimit}>
        <div>
          <p>Withdraw limit</p>
          <Input value='5.000.000' style={{ width: 300 }} />
        </div>
        <Button
          type='primary'
          onClick={onEditModalClick}
          className={classes.editButton}>
          <EditOutlined />
        </Button>
      </div>
      <div>
        <div>
          <Table>
            <Column title='Winning limit' />
            <Column title='GGR limit' />
            <Column title='' />
          </Table>
        </div>
      </div>
      <EditeModal
        isEditeModalOpen={isEditModalOpen}
        setIsEditeModalOpen={setIsEditModalOpen}
      />
    </>
  );
};

export default Daily;
