import { API_ENDPOINTS } from 'wp_shared/constants';
import { http } from 'wp_shared/http_service';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
};

export type LoginInput = { email: string; password: string; rememberMe: boolean };

// Session lives in httpOnly cookies set by the backend. `rememberMe` tells it to issue a
// 30-day refresh cookie instead of a session one; the client never stores credentials or tokens.
export const authService = {
  login: (input: LoginInput) =>
    http.post<{ user: User }>(API_ENDPOINTS.AUTH.LOGIN, input).then((d) => d.user),
  logout: () => http.post<void>(API_ENDPOINTS.AUTH.LOGOUT),
  me: () => http.get<{ user: User }>(API_ENDPOINTS.AUTH.ME).then((d) => d.user),
};
