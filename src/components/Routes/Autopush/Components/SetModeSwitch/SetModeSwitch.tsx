import { FC, useState } from 'react';
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
  const [switchValue, setSwitchValue] = useState(
    testModeData.data?.approver_test_mode,
  );

  const setApproverTestMode = useMutation({
    mutationFn: () => {
      return axios.post('/setting/general/set', {
        approver_test_mode: !switchValue,
      });
    },
    onSuccess: () => {
      toast.success(t('Your changes have been'));
    },
  });

  const handleSwitchChange = (checked: boolean) => {
    setSwitchValue(checked);
    setApproverTestMode.mutate();
  };

  return (
    <Switch
      defaultChecked
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      onChange={handleSwitchChange}
      loading={setApproverTestMode.isLoading}
      checked={switchValue}
    />
  );
};

export default SetModeSwitch;
