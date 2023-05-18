import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC, useState } from 'react';

import Classes from './Individual.module.scss';
import IndividualModal from './IndividualLimitModal/IndividualModal';
import { DataType, FakeIndividualdata } from './Individual.types';
import IndividualEditeModal from './IndividualEditModal/IndividualEditModal';

const Individual: FC = () => {
  const [isIndividualModalOpen, setIsIndividualModalOpen] = useState(false);
  const [isPlayerEditModalOpen, setIsPlayerEditModalOpen] =
    useState<DataType | null>(null);

  const data = FakeIndividualdata;

  const onModalClick = () => {
    setIsIndividualModalOpen(!isIndividualModalOpen);
  };

  const onPlayerEditClick = (playerInfo: DataType) => {
    setIsPlayerEditModalOpen(playerInfo);
  };

  const columns: ColumnsType<DataType> = [
    { title: 'Player Id', dataIndex: 'playerId', key: 'playerId' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    {
      title: 'Individual Limit',
      dataIndex: 'individualLimit',
      key: 'individualLimit',
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
        data={data}
        isIndividualModalOpen={isIndividualModalOpen}
        setIsIndividualModalOpen={setIsIndividualModalOpen}
      />
      <IndividualEditeModal
        isPlayerEditModalOpen={isPlayerEditModalOpen}
        setIsPlayerEditModalOpen={setIsPlayerEditModalOpen}
      />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Individual;
