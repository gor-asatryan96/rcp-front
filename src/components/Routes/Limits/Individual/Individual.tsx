import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';

import Classes from './Individual.module.scss';
import IndividualModal from './IndividualLimitModal/IndividualModal';
import { IIndividualLimits } from './Individual.types';
import IndividualEditeModal from './IndividualEditModal/IndividualEditModal';
import { individualLimitsData } from './individualLimits.service';

const Individual: FC = () => {
  const [isIndividualModalOpen, setIsIndividualModalOpen] = useState(false);
  const [isPlayerEditModalOpen, setIsPlayerEditModalOpen] =
    useState<IIndividualLimits | null>(null);

  const queryData = useQuery(['individual-limit'], () =>
    individualLimitsData.getIndividualLimits(),
  );

  const onModalClick = () => {
    setIsIndividualModalOpen(!isIndividualModalOpen);
  };

  const onPlayerEditClick = (playerInfo: IIndividualLimits) => {
    setIsPlayerEditModalOpen(playerInfo);
  };

  const columns: ColumnsType<IIndividualLimits> = [
    { title: 'Player Id', dataIndex: 'userId', key: 'userId' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Individual Limit',
      dataIndex: 'limit',
      key: 'limit',
    },
    {
      title: 'Edit',
      dataIndex: '',
      key: 'x',
      render: playerInfo => (
        <Button onClick={() => onPlayerEditClick(playerInfo)} type='primary'>
          <EditOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className={Classes.OpenPlusModal}>
        <Button onClick={onModalClick} type='primary'>
          <PlusOutlined />
        </Button>
      </div>
      <Divider orientation='left'>Individual Limits</Divider>
      <IndividualModal
        isIndividualModalOpen={isIndividualModalOpen}
        setIsIndividualModalOpen={setIsIndividualModalOpen}
      />
      <IndividualEditeModal
        refetch={() => queryData.refetch()}
        isPlayerEditModalOpen={isPlayerEditModalOpen}
        setIsPlayerEditModalOpen={setIsPlayerEditModalOpen}
      />
      <Table size='middle' dataSource={queryData.data} columns={columns} />
    </div>
  );
};

export default Individual;
