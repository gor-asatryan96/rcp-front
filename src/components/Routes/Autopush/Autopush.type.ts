import { CheckboxValueType } from 'antd/es/checkbox/Group';

export interface IOperatorListRequest {
  id: number;
  project_id: number;
  auto_push_enabled: 0 | 1;
  auto_approve_enabled: 0 | 1;
  op_name: string;
}

export interface IOperatorListRequestBody {
  operatorId: number;
  field: 'auto_push_enabled' | 'auto_approve_enabled';
  value: boolean;
}

export interface IAutoPushAndApprove {
  'Auto Push': CheckboxValueType[];
  'Auto Approve': CheckboxValueType[];
}
