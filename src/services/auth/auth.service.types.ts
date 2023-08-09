export interface ITFAResponse {
  qr: string;
}

export interface ILoginBody {
  firstName: string;
  oldPassword: string;
  lastName: string;
  username?: string;
  password: string;
  tft?: string;
}
