import React from 'react';
import { Table } from 'antd';
import { useQuery } from 'react-query';

import { AdminService } from 'services/admin';

import UsersTableActions from '../UsersTableActions/UsersTableActions';

import { usersForAdminColumns } from './usersForAdmin.configs';

const UsersForAdmin: React.FC = () => {
  const queryData = useQuery(['users/list'], AdminService.getUsers);

  const allTotal = queryData.data?.length;

  return (
    <>
      <UsersTableActions />
      <Table
        rowKey='id'
        columns={usersForAdminColumns}
        dataSource={queryData.data}
        scroll={{ x: true }}
        loading={queryData.isLoading}
        pagination={{
          position: ['bottomCenter'],
          total: allTotal,
          showSizeChanger: true,
          responsive: true,
        }}
      />
    </>
  );
};

export default UsersForAdmin;
