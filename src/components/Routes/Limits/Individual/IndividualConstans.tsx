import { ColumnsType } from 'antd/es/table';
import { Input } from 'antd';

import { IIndividualLimits } from './Individual.types';

export const columns: ColumnsType<IIndividualLimits> = [
  { title: 'Player Id', dataIndex: 'userId', key: 'userId' },
  { title: 'Phone Number', dataIndex: 'phone', key: 'phone' },
  {
    title: 'Individual Limit',
    dataIndex: 'limit',
    key: 'limit',
    render: () => <Input />,
  },
];
