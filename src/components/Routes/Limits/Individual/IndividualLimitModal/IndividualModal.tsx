import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { FC } from 'react';
import { ColumnsType } from 'antd/es/table';
import Search from 'antd/es/input/Search';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';

import { DataType } from '../Individual.types';

import Classes from './IndividualModal.module.scss';

type PropTypes = {
  data: any;
  isIndividualModalOpen: boolean;
  setIsIndividualModalOpen: (x: boolean) => void;
};

const columns: ColumnsType<DataType> = [
  { title: 'Player Id', dataIndex: 'playerId', key: 'playerId' },
  { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
  {
    title: 'Individual Limit',
    dataIndex: 'individualLimit',
    key: 'individualLimit',
    render: () => <Input />,
  },
];

const selectOptions = [{ value: 'Phone Number' }, { value: 'Player ID' }];

const IndividualModal: FC<PropTypes> = ({
  data,
  isIndividualModalOpen,
  setIsIndividualModalOpen,
}) => {
  const onSaveClick = () => {
    setIsIndividualModalOpen(false);
  };

  return (
    <Modal
      title='New Individual Limit'
      footer={null}
      onCancel={() => setIsIndividualModalOpen(false)}
      open={isIndividualModalOpen}>
      <Form>
        <div className={Classes.searchInput}>
          <Select options={selectOptions} defaultValue={selectOptions[1]} />
          <Search />
        </div>
      </Form>
      {/* <List
        style={{ marginBottom: 20 }}
        bordered
        dataSource={fakedata}
        renderItem={item => (
          <List.Item>
            <Typography.Text mark /> {item}
          </List.Item>
        )}
      /> */}
      <div>
        <Table
          size='small'
          columns={columns}
          dataSource={data}
          pagination={false}
        />
        <Form.Item
          style={{ marginLeft: '1rem', marginTop: '1rem ' }}
          label='Token'>
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Secret Token '
          />
        </Form.Item>
      </div>
      <div className={Classes.SaveAndCancelButtons}>
        <Button
          type='primary'
          danger
          onClick={() => setIsIndividualModalOpen(false)}>
          Cancel
        </Button>
        <Button type='primary' onClick={onSaveClick}>
          Save
          <SaveOutlined />
        </Button>
      </div>
    </Modal>
  );
};

export default IndividualModal;
