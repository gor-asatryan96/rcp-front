import { FC } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popover,
  Row,
} from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { setGeneralLimitsThunk } from 'redux/reducers/projects/projects.thunks';
import { useAppDispatch } from 'redux/hooks/redux.hooks';
import { selectIsGeneralLimitsLoading } from 'redux/reducers/projects/projects.slice';

import { IGeneraList } from '../GeneralLimitTab/GeneralLimitTab.type';

import classes from './EditModal.module.scss';

type PropTypes = {
  isEditeModalOpen: boolean;
  data: IGeneraList | undefined;
  setIsEditeModalOpen: (x: boolean) => void;
};

const EditeModal: FC<PropTypes> = ({
  isEditeModalOpen,
  setIsEditeModalOpen,
  data,
}) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const isLoading = useSelector(selectIsGeneralLimitsLoading);
  const [form] = Form.useForm();
  const handleSubmit = (values: IGeneraList) => {
    dispatch(setGeneralLimitsThunk(values));
    setIsEditeModalOpen(false);
  };

  return (
    <Modal
      footer={null}
      onCancel={() => setIsEditeModalOpen(false)}
      width={700}
      open={isEditeModalOpen}>
      <Form onFinish={handleSubmit} initialValues={data} form={form}>
        <Card className={classes.dailyEditModalCard}>
          <Form.Item
            labelCol={{ span: 5 }}
            name='daily_withdraw_limit'
            label='Withdraw Limit'>
            <InputNumber min={0} style={{ width: 250 }} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 5 }}
            name='rollback_limit_percentage'
            label='Rollback Limit'>
            <InputNumber min={0} style={{ width: 250 }} />
          </Form.Item>
          <Popover
            trigger='hover'
            placement='top'
            content='Deposit Draw Condition'>
            <Form.Item
              name='used_unused_percentage'
              labelCol={{ span: 5 }}
              label='DDC'>
              <InputNumber
                prefix='%'
                min={0}
                max={100}
                style={{ width: 250 }}
              />
            </Form.Item>
          </Popover>
          <Row justify='center'>
            <Col span={12}>{t('Winning Limit')}</Col>
            {t('GGR Limit')}
          </Row>
          <Form.Item
            labelCol={{ span: 2 }}
            style={{ marginBottom: 0 }}
            label={t('Casino')}>
            <Form.Item
              name='casino_winning_limit'
              className={classes.dailyEditModalInputTitle}
              rules={[{ required: true, message: '' }]}>
              <InputNumber
                className={classes.gamesInput}
                min={0}
                type='number'
              />
            </Form.Item>
            <Form.Item
              name='casino_ggr_limit'
              rules={[{ required: true, message: '' }]}
              className={classes.dailyEditModalInputBody}>
              <InputNumber
                className={classes.gamesInput}
                min={0}
                type='number'
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 2 }}
            style={{ marginBottom: 0 }}
            label={t('Games')}>
            <Form.Item
              name='games_winning_limit'
              className={classes.dailyEditModalInputTitle}
              rules={[{ required: true, message: '' }]}>
              <InputNumber
                className={classes.gamesInput}
                min={0}
                type='number'
              />
            </Form.Item>
            <Form.Item
              name='games_ggr_limit'
              rules={[{ required: true, message: '' }]}
              className={classes.dailyEditModalInputBody}>
              <InputNumber
                className={classes.gamesInput}
                min={0}
                type='number'
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 2 }}
            style={{ marginBottom: 0 }}
            label={t('Sport')}>
            <Form.Item
              name='sport_winning_limit'
              className={classes.dailyEditModalInputTitle}
              rules={[{ required: true, message: '' }]}>
              <InputNumber
                min={0}
                className={classes.gamesInput}
                type='number'
              />
            </Form.Item>
            <Form.Item
              name='sport_ggr_limit'
              rules={[{ required: true, message: '' }]}
              className={classes.dailyEditModalInputBody}>
              <InputNumber
                className={classes.gamesInput}
                min={0}
                type='number'
              />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              label='Token'
              className={classes.dailyEditModalTFT}
              style={{ width: 'calc(100% - 8px)' }}
              name='tft'>
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                placeholder='Secret Token (optional)'
              />
            </Form.Item>
          </Form.Item>
        </Card>
        <Row
          justify='center'
          className={classes.dailyEditModalconfirmButtonsBody}>
          <Form.Item>
            <Button
              className={classes.dailyEditModalConfirmButton}
              type='primary'
              danger
              onClick={() => setIsEditeModalOpen(false)}>
              {t('Cancel')}
            </Button>
            <Button loading={isLoading} type='primary' htmlType='submit'>
              {t('Save')}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditeModal;
