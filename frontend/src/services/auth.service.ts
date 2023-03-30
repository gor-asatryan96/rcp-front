import axios from 'axios';

interface ITFAResponse {
  qr: string;
}

export const AuthService = {
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
