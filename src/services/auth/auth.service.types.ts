export interface ITFAResponse {
  qr: string;
}

export interface ILoginBody {
  firstName: string;
  lastName: string;
  username?: string;
  password: string;
  tft?: string;
}
