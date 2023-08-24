import { FC } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { autopushAndApproveData } from '../../Autopush.service';

const SetModeSwitch: FC = () => {
  const { t } = useTranslation();
  const testModeData = useQuery(
    ['testMode'],
    autopushAndApproveData.getApproverTestMode,
  );
  const setApproverTestMode = useMutation({
    mutationFn: (checked: boolean) => {
      return axios.post('/setting/general/set', {
        approver_test_mode: checked,
      });
    },
    onSuccess: () => {
      toast.success(t('Your changes have been'));
      testModeData.refetch();
    },
  });
  const handleSwitchChange = (checked: boolean) => {
    setApproverTestMode.mutate(checked);
  };
  return (
    <>
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        onChange={handleSwitchChange}
        loading={testModeData.isLoading || setApproverTestMode.isLoading}
        checked={!!testModeData?.data}
      />
    </>
  );
};
export default SetModeSwitch;
