import axios from 'axios';

import { IUser } from 'redux/reducers/serverConfigs/serverConfigs.types';

import { ILoginBody, ITFAResponse } from './auth.service.types';

export const AuthService = {
  async login(loginBody: ILoginBody) {
    const response = await axios.post<IUser>('/auth/login', loginBody);
    return response.data;
  },
  async getProfileByToken(token: string) {
    const response = await axios.post<IUser>('/auth/profile', null, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  },
  async changeProfile(data: Partial<ILoginBody>) {
    const response = await axios.post<IUser>(
      '/auth/update-profile',
      [data.password, data.username],
      {
        headers: { 'x-tf-token': data.tft },
      },
    );
    return response.data;
  },
  async applyInvitation(token: string) {
    const response = await axios.post<IUser>('/auth/apply-invitation', {
      token,
    });
    return response.data;
  },
  async getTFACode() {
    const response = await axios.post<ITFAResponse>('/auth/setup-two-factor');
    return response.data;
  },
  async verifyTFACode(code: string) {
    const response = await axios.post<ITFAResponse>('/auth/verify-two-factor', {
      token: code,
    });
    return response.data;
  },
};
