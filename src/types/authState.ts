export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}
