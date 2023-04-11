/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Badge, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import { IUser } from 'redux/reducers/serverConfigs/serverConfigs.types';

import UsersTableActions from '../UsersTableActions/UsersTableActions';

import BlockUser from './components/BlockUser/BlockUser';

type UserStatus = 'blocked' | 'online' | 'offline';

enum Statuses {
  online = 'success',
  offline = 'default',
  blocked = 'error',
}

async function FetchUsers() {
  const { data } = await axios.post('/admin/users/list');
  return data.users;
}
const App: React.FC = () => {
  const [page, setPage] = useState(1);

  const queryData = useQuery(['users/list', page], () => FetchUsers());
  const allTotal = queryData.data?.length;

  const pageChanger = (currentPage: number) => {
    setPage(currentPage);
  };

  const columns: ColumnsType<IUser> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      fixed: true,
      width: 120,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (a: UserStatus) => {
        return <Badge status={Statuses[a]} text={a} />;
      },
      width: 80,
      filters: [
        {
          text: 'Online',
          value: 'Online',
        },
        {
          text: 'Ofline',
          value: 'Ofline',
        },
        {
          text: 'Blocked',
          value: 'Blocked',
        },
      ],
      // onFilter: (value: string, record) => record.is_active,
    },
    {
      title: 'Last visit',
      dataIndex: 'lastVisit',
      key: 'lastVisit',
      render: (_, data) => (
        <div>
          {data.meta.last_action_at
            ? dayjs(data.meta.last_action_at).format('DD/MM/YYYY HH:MM')
            : ''}
        </div>
      ),
      width: 100,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, data) => (
        <Space>
          <BlockUser user={data} refetch={queryData.refetch} />
        </Space>
      ),
      width: 170,
    },
  ];
  return (
    <>
      <UsersTableActions />
      <Table
        rowKey='id'
        columns={columns}
        dataSource={queryData.data}
        scroll={{ x: true }}
        loading={queryData.isLoading}
        pagination={{
          position: ['bottomCenter'],
          onChange(currentPage) {
            pageChanger(currentPage);
          },
          total: allTotal,
        }}
      />
    </>
  );
};

export default App;
