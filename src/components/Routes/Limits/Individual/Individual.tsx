import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';

import Classes from './Individual.module.scss';
import IndividualModal from './IndividualLimitModal/IndividualModal';
import { IIndividualEditLimits, IIndividualLimits } from './Individual.types';
import IndividualEditeModal from './IndividualEditModal/IndividualEditModal';
import { individualLimitsData } from './individualLimits.service';

const Individual: FC = () => {
  const [isIndividualModalOpen, setIsIndividualModalOpen] = useState(false);
  const [isPlayerEditModalOpen, setIsPlayerEditModalOpen] =
    useState<IIndividualEditLimits | null>(null);
  const [page, setPage] = useState(1);

  const queryData = useQuery(['individual-limit', page], () =>
    individualLimitsData.getIndividualLimits(page),
  );
  const allTotal = queryData.data?.count;

  const onModalClick = () => {
    setIsIndividualModalOpen(!isIndividualModalOpen);
  };

  const onPlayerEditClick = (playerInfo: IIndividualEditLimits) => {
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
      <Table
        loading={queryData.isLoading}
        size='middle'
        dataSource={queryData.data?.list}
        columns={columns}
        pagination={{
          onChange(pages) {
            setPage(pages);
          },
          position: ['bottomCenter'],
          total: allTotal,
          showSizeChanger: true,
          responsive: true,
        }}
      />
    </div>
  );
};

export default Individual;
