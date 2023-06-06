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
  const [pageSize, setPageSize] = useState<number>(10);

  const queryData = useQuery(['individual-limit', page, pageSize], () =>
    individualLimitsData.getIndividualLimits(page, pageSize),
  );
  const allTotal = queryData.data?.count;

  const pageSizeOptions = [10, 20, 50];

  const onModalClick = () => {
    setIsIndividualModalOpen(!isIndividualModalOpen);
  };

  const onPlayerEditClick = (playerInfo: IIndividualEditLimits) => {
    setIsPlayerEditModalOpen(playerInfo);
  };

  const onChangeSave = () => {
    queryData.refetch();
    setIsIndividualModalOpen(false);
  };

  const onChangePageSize = (e: number) => {
    setPageSize(e);
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
      <Divider orientation='left'>Individual Limits</Divider>
      <div className={Classes.OpenPlusModal}>
        <Button onClick={onModalClick} type='primary'>
          <PlusOutlined />
        </Button>
      </div>
      <IndividualModal
        onSave={onChangeSave}
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
        onChange={(e: any) => onChangePageSize(e.pageSize)}
        pagination={{
          onChange(pages) {
            setPage(pages);
          },
          position: ['bottomCenter'],
          total: allTotal,
          pageSizeOptions,
          showSizeChanger: true,
          responsive: true,
        }}
      />
    </div>
  );
};

export default Individual;
