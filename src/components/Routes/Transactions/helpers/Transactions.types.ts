export interface ITransaction {
  id: number | null;
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
  aa_status: string;
  aa_meta: string;
}

export interface ITRXFilter {
  name: string;
  type: 'IN' | 'OUT';
}

export interface ITRXFilters {
  IN: ITRXFilter[];
  OUT: ITRXFilter[];
}
