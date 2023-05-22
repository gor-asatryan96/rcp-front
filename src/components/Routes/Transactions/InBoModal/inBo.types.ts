interface IInBo {
  amount: number;
  type: string;
  reason: string;
  paymentTransactionId: number;
}

export interface IInBoForm extends IInBo {
  usersInput: string;
  opType: { value: string };
}

export interface IInBoRequest extends IInBo {
  usersIds: number[];
  opType: string;
}

export interface IInBoResponse {
  missingPlayersIds: number[];
}
