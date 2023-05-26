export interface IIndividualEditLimits {
  userId: number;
  phone: string;
  limit: string;
}

export interface IIndividualLimits {
  limit: number;
  page: number;
  orderBy: { value: string };
  orderDir: 'DESC' | 'ASC';
  id: string;
}

export interface IIndividualLimitsRequest {
  limit: number | null;
  page: number;
  orderBy: string;
  orderDir: 'DESC' | 'ASC';
  phone?: string;
  id?: string;
}

export interface ILimitChange {
  value: number;
}
