export interface ITransaction {
  id: number | null;
  user_id: number;
  amount: string;
  status: string;
  op_type: string;
  currency: string;
  updated_at: string;
  created_at: string;
  gateway_trx_id: string;
  tries: number;
  bonus_checked: number;
  auto_approved: number;
  internal_status: string;
  aa_status: string;
  aa_meta: string;
}
