export interface IMetaInfoTypes {
  rollback_limit: Diff;
  withdraw_limit: Diff;
  sport_winning_limit: Diff;
  casino_winning_limit: Diff;
  games_winning_limit: Diff;
  sport_ggr_limit: Diff;
  casino_ggr_limit: Diff;
  games_ggr_limit: Diff;
  is_first_withdraw: boolean;
}

export type Diff = {
  difference?: number;
};

export interface MetaInfoType {
  aa_messages: IMetaInfoTypes;
  sa_username: string;
}

export type MetaInfoData = {
  data: string;
};
