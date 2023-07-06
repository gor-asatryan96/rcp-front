export interface IIndividualEditLimits {
  userId: number;
  phone: string;
  limit: string;
}

export interface IIndividualLimits {
  limit: number;
  page: number;
  orderBy: string;
  orderDir: 'DESC' | 'ASC';
  id: string;
}

export interface IIndividualLimitsRequest {
  orderBy: string;
  limit: number | null;
  page: number;
  orderDir: 'DESC' | 'ASC';
  phone?: string;
  id?: string;
}

export interface ILimitChange {
  value: number;
  token: string;
}
