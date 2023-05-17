export interface ITFAResponse {
  qr: string;
}

export interface ILoginBody {
  username?: string;
  password: string;
  tft?: string;
}
