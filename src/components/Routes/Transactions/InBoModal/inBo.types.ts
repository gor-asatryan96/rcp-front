interface IInBo {
  amount: number;
  type: string;
  reason: string;
  paymentTransactionId: number;
  token: string;
}

export interface IInBoForm extends IInBo {
  usersInput: string;
  opType: string;
}

export interface IInBoRequest extends IInBo {
  usersIds: number[];
  opType: string;
  token: string;
}

export interface IInBoResponse {
  missingPlayersIds: number[];
}
