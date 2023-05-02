import axios from 'axios';

import { IGetUsersForAdminResponse } from './admin.service.types';

export const AdminService = {
  async getUsers() {
    const { data } = await axios.post<IGetUsersForAdminResponse>(
      '/admin/users/list',
    );
    return data.users;
  },
};
