export interface ITFAResponse {
  qr: string;
}

export interface ILoginBody {
  username?: string;
  firstName: string;
  lastName: string;
  password: string;
  tft?: string;
}
