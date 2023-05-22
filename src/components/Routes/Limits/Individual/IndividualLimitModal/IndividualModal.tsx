import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { FC } from 'react';
import Search from 'antd/es/input/Search';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';

import { columns } from '../IndividualConstans';
import { selectOptions } from '../constans';

import Classes from './IndividualModal.module.scss';

type PropTypes = {
  isIndividualModalOpen: boolean;
  setIsIndividualModalOpen: (x: boolean) => void;
};

const IndividualModal: FC<PropTypes> = ({
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
      <div className={Classes.searchInput}>
        <Select options={selectOptions} defaultValue={selectOptions[1]} />
        <Search />
      </div>
      <Form>
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
            // dataSource={data}
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
      </Form>
    </Modal>
  );
};

export default IndividualModal;
