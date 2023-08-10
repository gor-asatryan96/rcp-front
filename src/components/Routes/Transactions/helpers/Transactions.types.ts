import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Dayjs } from 'dayjs';

export enum Approved {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}

export interface ITransaction {
  id: number;
  user_id: number | null;
  amount: string;
  status: string;
  op_type: string;
  currency: string;
  updated_at: string;
  created_at: string;
  gateway_trx_id: string;
  tries: number | null;
  bonus_checked: number | null;
  auto_approved: number | null;
  internal_status: string;
  aa_status: Approved;
  meta_info: string;
  is_manual: number;
}

export interface ITRXFilter {
  name: string;
  type: 'IN' | 'OUT';
}

export interface TRXfiltersForm {
  limit: number;
  page: number;
  orderBy: string;
  orderDir: 'DESC' | 'ASC';
  dateFrom: Dayjs | string;
  dateTo: Dayjs | string;
  amountFrom: number | string;
  phone: string;
  amountTo: number | string;
  playerId: number | string;
  paymentTransactionId: string;
  transactionId: number | string;
  status: CheckboxValueType[];
  aa_status: CheckboxValueType[];
  opType: CheckboxValueType[];
}

export interface ITRXFilters {
  [key: string]: ITRXFilter[];
}

type Option = {
  title: string;
  value: string;
};

export type IStatusOptions = {
  [key: string]: Option[];
};
