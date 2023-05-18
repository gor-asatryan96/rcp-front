export interface DataType {
  playerId: number;
  phoneNumber: number;
  individualLimit: number;
}

export interface ILimitChange {
  limit: number;
  authToken: any;
}

export const FakeIndividualdata: DataType[] = [
  {
    playerId: 777,
    phoneNumber: 77777777,
    individualLimit: 10000,
  },
  {
    playerId: 888,
    phoneNumber: 88888888,
    individualLimit: 20000,
  },
  {
    playerId: 999,
    phoneNumber: 99999999,
    individualLimit: 30000,
  },
  {
    playerId: 1000,
    phoneNumber: 10000000,
    individualLimit: 40000,
  },
];
