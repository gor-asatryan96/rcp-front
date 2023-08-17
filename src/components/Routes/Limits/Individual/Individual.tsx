/* eslint-disable react/no-unstable-nested-components */
import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';

import { IErrorMessage } from 'redux/store.types';
import { selectActiveProjectID } from 'redux/reducers/projects/projects.slice';

import Classes from './Individual.module.scss';
import IndividualModal from './IndividualLimitModal/IndividualModal';
import { IIndividualEditLimits, IIndividualLimits } from './Individual.types';
import IndividualEditeModal from './IndividualEditModal/IndividualEditModal';
import { individualLimitsData } from './individualLimits.service';

const Individual: FC = () => {
  const activeCountryId = useSelector(selectActiveProjectID);

  const [isIndividualModalOpen, setIsIndividualModalOpen] = useState(false);
  const [isPlayerEditModalOpen, setIsPlayerEditModalOpen] =
    useState<IIndividualEditLimits | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchValueWithId, setSearchValueWithId] = useState<
    string | undefined
  >('');
  const [searchValueWithPhone, setSearchValueWithPhone] = useState<
    string | undefined
  >('');

  const { t } = useTranslation();

  const queryData = useQuery(['individual-limit', page, pageSize], () =>
    individualLimitsData.getIndividualLimits(page, pageSize),
  );
  const allTotal = queryData.data?.count;

  const pageSizeOptions = [10, 20, 50];

  useEffect(() => {
    queryData.refetch();
  }, [activeCountryId]);

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

  const searchWithUserId = useMutation(
    () =>
      individualLimitsData.getIndividualLimitsWithUserId(
        1,
        10,
        searchValueWithId || '',
      ),
    {
      onSuccess: data => {
        queryData.data!.list = data.list;
        queryData.data!.count = data.count;
      },
      onError: err => {
        const error = err as unknown as AxiosError<IErrorMessage>;
        toast.error(error.response?.data.message || t('Something went wrong'));
      },
    },
  );
  const searchWithUserPhone = useMutation(
    () =>
      individualLimitsData.getIndividualLimitsWithPhone(
        1,
        10,
        searchValueWithPhone || '',
      ),
    {
      onSuccess: data => {
        queryData.data!.list = data.list;
        queryData.data!.count = data.count;
      },
      onError: err => {
        const error = err as unknown as AxiosError<IErrorMessage>;
        toast.error(error.response?.data.message || t('Something went wrong'));
      },
    },
  );

  const handleSearchId = () => {
    setPage(1);
    searchWithUserId.mutate();
  };

  const handleResetId = () => {
    setSearchValueWithId('');
    queryData.refetch();
  };
  const handleSearchPhone = () => {
    setPage(1);
    searchWithUserPhone.mutate();
  };

  const handleResetPhone = () => {
    setSearchValueWithPhone('');
    queryData.refetch();
  };

  const handleInputChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValueWithId(e.target.value);
  };

  const handleInputChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValueWithPhone(e.target.value);
  };
  const columns: ColumnsType<IIndividualLimits> = [
    {
      title: 'Player Id',
      dataIndex: 'userId',
      key: 'userId',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder='Search Player Id'
            value={searchValueWithId}
            onPressEnter={handleSearchId}
            onChange={handleInputChangeId}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              loading={searchWithUserId.isLoading}
              disabled={!searchValueWithId}
              type='primary'
              onClick={handleSearchId}
              icon={<SearchOutlined />}
              size='small'
              style={{ width: 90 }}>
              {t('Search')}
            </Button>
            <Button onClick={handleResetId} size='small' style={{ width: 90 }}>
              {t('Reset')}
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record.userId
          ? record.userId.toString().includes(value.toString())
          : false,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder='Search Phone Number'
            value={searchValueWithPhone}
            onChange={handleInputChangePhone}
            onPressEnter={handleSearchPhone}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              loading={searchWithUserId.isLoading}
              type='primary'
              disabled={!searchValueWithPhone}
              onClick={handleSearchPhone}
              icon={<SearchOutlined />}
              size='small'
              style={{ width: 90 }}>
              {t('Search')}
            </Button>
            <Button
              onClick={handleResetPhone}
              size='small'
              style={{ width: 90 }}>
              {t('Reset')}
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record.phone
          ? record.phone.toString().includes(value.toString())
          : false,
    },
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
        scroll={{ x: 1200, y: 571 }}
        dataSource={queryData.data?.list.map((item, index) => ({
          ...item,
          key: index,
        }))}
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
