import { FC, useEffect } from 'react';
import { Table } from 'antd';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import { AdminService } from 'services/admin';
import { selectActiveProjectID } from 'redux/reducers/projects/projects.slice';

import UsersTableActions from '../UsersTableActions/UsersTableActions';

import { usersForAdminColumns } from './usersForAdmin.configs';

const UsersForAdmin: FC = () => {
  const queryData = useQuery(['users/list'], AdminService.getUsers);
  const activeCountryId = useSelector(selectActiveProjectID);

  const allTotal = queryData.data?.length;

  useEffect(() => {
    queryData.refetch();
  }, [activeCountryId]);

  return (
    <>
      <UsersTableActions />
      <Table
        size='small'
        rowKey='id'
        columns={usersForAdminColumns}
        dataSource={queryData.data}
        scroll={{ x: 1200, y: 670 }}
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
