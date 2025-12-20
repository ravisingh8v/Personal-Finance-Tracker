export interface IUserSlice {
  token: string;
  isAuthenticated: boolean;
  authData: IAuthData | null;
}

export interface IAuthData {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  address: any;
}
