import React, { useState } from 'react';
import { Badge, Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useQuery } from 'react-query';

type UserStatus = 'blocked' | 'online' | 'offline';

enum Statuses {
  online = 'success',
  offline = 'default',
  blocked = 'error',
}

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  ussers: [];
  status: UserStatus;
}

async function FetchUsers(page = 0, total = 10) {
  const { data } = await axios.post(`/user/list?_page=${page}&_limit=${total}`);
  return data;
}
const allTotal = 117;

const App: React.FC = () => {
  const [page, setPage] = useState(1);

  const queryData = useQuery(['users', page], () => FetchUsers(page), {
    keepPreviousData: true,
  });

  const pageChanger = (currentPage: number) => {
    setPage(currentPage);
  };

  const columns: ColumnsType<DataType> = [
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
    },
    {
      title: 'Last visit',
      dataIndex: 'lastVisit',
      key: 'lastVisit',
      render: time => <div>{time}</div>,
      width: 100,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button>Block</Button>
          <Button>Logout</Button>
        </Space>
      ),
      width: 170,
    },
  ];

  return (
    <>
      <Table
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
