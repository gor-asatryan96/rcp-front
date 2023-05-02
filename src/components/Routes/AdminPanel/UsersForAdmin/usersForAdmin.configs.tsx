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
    width: 100,
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
    width: 170,
  },
];
