import { FC, useState } from 'react';
import { Button, Divider, Form, Input, Row } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from 'react-query';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import GlobalLoader from 'components/Common/GlobalLoader/GlobalLoader';
import { IErrorMessage } from 'redux/store.types';

import { autopushAndApproveData } from './Autopush.service';
import { IAutoPushAndApprove, IOperatorListRequestBody } from './Autopush.type';
import AutoPushCheckbox from './Components/AutoPushCheckbox/AutoPushCheckbox';
import SetModeSwitch from './Components/SetModeSwitch/SetModeSwitch';

const AutoPush: FC = () => {
  const { t } = useTranslation();

  const [checkboxData, setCheckboxData] = useState<IAutoPushAndApprove>({
    'Auto Push': [],
    'Auto Approve': [],
  });

  const operatorListData = useQuery(
    ['operator/list'],
    autopushAndApproveData.getOperatorsList,
    {
      onSuccess: data => {
        const autoPush: CheckboxValueType[] = [];
        const autoApprove: CheckboxValueType[] = [];

        data.forEach(item => {
          if (item.auto_push_enabled) {
            autoPush.push(item.op_name);
          }
          if (item.auto_approve_enabled) {
            autoApprove.push(item.op_name);
          }
        });

        setCheckboxData({
          'Auto Approve': autoApprove,
          'Auto Push': autoPush,
        });
      },
    },
  );
  const operatorList = operatorListData?.data;

  const mutation = useMutation({
    mutationFn: (data: IOperatorListRequestBody[]) => {
      return axios.post<IOperatorListRequestBody>(
        '/setting/operators/update-status',
        {
          updatedStatuses: [...data],
        },
      );
    },
    onSuccess: () => {
      toast.success(t('Status has successfully changed'));
    },
    onError: err => {
      const error = err as unknown as AxiosError<IErrorMessage>;
      operatorListData.refetch();
      toast.error(error.response?.data.message || t('Something went wrong'));
    },
  });

  const onFilterChange = (name: string, values: CheckboxValueType[]) => {
    setCheckboxData(prev => ({ ...prev, [name]: values }));
  };

  const checkboxOptions = operatorList?.map(item => item.op_name) || [];

  const onSave = () => {
    if (!operatorList) return;

    const requestBody: IOperatorListRequestBody[] = [];
    operatorList.forEach(item => {
      const isPushChecked = checkboxData['Auto Push'].includes(item.op_name);
      const isApproveChecked = checkboxData['Auto Approve'].includes(
        item.op_name,
      );
      if (item.auto_push_enabled - +isPushChecked !== 0) {
        requestBody.push({
          operatorId: item.id,
          field: 'auto_push_enabled',
          value: isPushChecked,
        });
      }
      if (item.auto_approve_enabled - +isApproveChecked !== 0) {
        requestBody.push({
          operatorId: item.id,
          field: 'auto_approve_enabled',
          value: isApproveChecked,
        });
      }
    });
    mutation.mutate(requestBody);
  };

  return (
    <>
      <Divider orientation='left'>{t('AutoPush and AutoApprove')}</Divider>
      {operatorListData.isLoading ? (
        <GlobalLoader />
      ) : (
        <>
          <div
            style={{
              paddingTop: 100,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Form.Item label='Test Mode'>
              <SetModeSwitch />
            </Form.Item>
            <Row style={{ paddingBottom: 10 }}>
              <AutoPushCheckbox
                name='Auto Push'
                onAllCheck={onFilterChange}
                value={checkboxData['Auto Push']}
                options={checkboxOptions}
                onFilterChange={onFilterChange}
              />
            </Row>
            <Row style={{ paddingBottom: 10 }}>
              <AutoPushCheckbox
                name='Auto Approve'
                onAllCheck={onFilterChange}
                value={checkboxData['Auto Approve']}
                options={checkboxOptions}
                onFilterChange={onFilterChange}
              />
            </Row>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Input.Password
              style={{ width: 300 }}
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Secret Token '
            />
            <Button type='primary' onClick={onSave}>
              {t('Save')}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default AutoPush;
