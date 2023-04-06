import React, { useState } from 'react';
import { Badge, Button, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

import { IUser } from 'redux/reducers/serverConfigs/serverConfigs.types';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryData = useQuery(['users/list', page], () => FetchUsers(), {
    // keepPreviousData: true,ss
  });
  const allTotal = queryData.data?.length;

  const mutation = useMutation({
    mutationFn: (data: IUser) => {
      return axios.post('/admin/users/edit', {
        data: { is_active: !data.is_active },
        userId: data.id,
      });
    },
    onSuccess: () => {
      queryData.refetch();
    },
  });

  const pageChanger = (currentPage: number) => {
    setPage(currentPage);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    // mutation.mutate();
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const columns: ColumnsType<IUser> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'id',
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
      render: (_, data) => <div>{data.meta?.last_action_at}</div>,
      width: 100,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, data) => (
        <Space>
          <Button
            disabled={mutation.isLoading}
            loading={mutation.isLoading}
            style={{ width: '5.7rem' }}
            type='primary'
            danger={data.is_active === 1}
            onClick={() => {
              showModal();
              mutation.mutate(data);
            }}>
            {data.is_active ? 'Block' : 'Unblock'}
          </Button>
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
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        title='Are you sure????'
        // confirmLoading={confirmLoading}
      />
      <Button onClick={showModal} />
    </>
  );
};

export default App;
