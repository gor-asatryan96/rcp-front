import { TRole } from 'redux/reducers/serverConfigs/serverConfigs.types';

export interface IUserInvite {
  email: string;
  role: TRole;
}
