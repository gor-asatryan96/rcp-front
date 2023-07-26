import { ColumnsType } from 'antd/es/table';
import { Badge, Space } from 'antd';
import dayjs from 'dayjs';

import { IUser } from 'redux/reducers/serverConfigs/serverConfigs.types';

import { Statuses, UserStatus } from './usersForAdmin.types';
import BlockUser from './components/BlockUser/BlockUser';

export const usersForAdminColumns: ColumnsType<IUser> = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (a: UserStatus) => {
      return <Badge status={Statuses[a]} text={a} />;
    },
    filters: [
      {
        text: 'Online',
        value: 'Online',
      },
      {
        text: 'Offline',
        value: 'Offline',
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
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, data) => (
      <Space>
        <BlockUser user={data} />
      </Space>
    ),
  },
];
