import React, { useState } from 'react';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import InviteUserModal from '../InviteUserModal/InviteUserModal';

import classes from './UsersTableActions.module.scss';

const UsersTableActions = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const onAddUserClick = () => {
    setIsAddUserModalOpen(true);
  };

  return (
    <>
      <InviteUserModal
        isAddUserModalOpen={isAddUserModalOpen}
        setIsAddUserModalOpen={setIsAddUserModalOpen}
      />
      <div className={classes.addUserButton}>
        <Button onClick={onAddUserClick} type='primary'>
          Invite user <UserAddOutlined />
        </Button>
      </div>
    </>
  );
};

export default UsersTableActions;
