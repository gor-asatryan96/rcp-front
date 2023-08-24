import { FC, useEffect, useState } from 'react';
import { Button, Divider, Input, Row } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from 'react-query';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import GlobalLoader from 'components/Common/GlobalLoader/GlobalLoader';
import { IErrorMessage } from 'redux/store.types';
import { selectActiveProjectID } from 'redux/reducers/projects/projects.slice';

import { autopushAndApproveData } from './Autopush.service';
import { IAutoPushAndApprove, IOperatorListRequestBody } from './Autopush.type';
import AutoPushCheckbox from './Components/AutoPushCheckbox/AutoPushCheckbox';

const AutoPush: FC = () => {
  const { t } = useTranslation();
  const activeCountryId = useSelector(selectActiveProjectID);

  const [checkboxData, setCheckboxData] = useState<IAutoPushAndApprove>({
    'Auto Push': [],
    'Auto Approve': [],
  });
  const [autoPushToken, setAutoPushToken] = useState('');
  const operatorListData = useQuery(
    ['operator/list'],
    autopushAndApproveData.getOperatorsList,
    {
      onSuccess: data => {
        const autoPush: CheckboxValueType[] = [];
        const autoApprove: CheckboxValueType[] = [];

        data.forEach(item => {
          if (item.auto_push_enabled === 1) {
            autoPush.push(item.op_name);
          }
          if (item.auto_approve_enabled === 1) {
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

  useEffect(() => {
    operatorListData.refetch();
  }, [activeCountryId]);

  const mutation = useMutation({
    mutationFn: (data: IOperatorListRequestBody[]) => {
      return axios.post<IOperatorListRequestBody>(
        '/setting/operators/update-status',
        {
          updatedStatuses: [...data],
        },
        {
          headers: { 'x-tf-token': autoPushToken },
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

  const autoApproveCheckboxOptions =
    operatorList
      ?.filter(item => item.auto_approve_enabled !== 2)
      .map(item => item.op_name) || [];
  const autoPushCheckboxOptions =
    operatorList
      ?.filter(item => item.auto_push_enabled !== 2)
      .map(item => item.op_name) || [];

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
            {/* <Form.Item label='Test Mode'>
              <SetModeSwitch />
            </Form.Item> */}
            <Row style={{ paddingBottom: 10 }}>
              <AutoPushCheckbox
                name='Auto Push'
                onAllCheck={onFilterChange}
                value={checkboxData['Auto Push']}
                options={autoPushCheckboxOptions}
                onFilterChange={onFilterChange}
              />
            </Row>
            <Row style={{ paddingBottom: 10 }}>
              <AutoPushCheckbox
                name='Auto Approve'
                onAllCheck={onFilterChange}
                value={checkboxData['Auto Approve']}
                options={autoApproveCheckboxOptions}
                onFilterChange={onFilterChange}
              />
            </Row>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Input.Password
              value={autoPushToken}
              onChange={e => setAutoPushToken(e.target.value)}
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
