import { useNavigate } from '@tanstack/react-router';

import type { LoginInput } from '../api/auth-service';
import { APP_ROUTES } from '../constants/routes';
import { queryClient } from '../query-client';
import { useAppDispatch, useAppSelector } from '../store';
import { login, logout } from '../store/auth-slice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((s) => s.auth);

  return {
    ...auth,
    login: (input: LoginInput) => dispatch(login(input)).unwrap(),
    logout: async () => {
      await dispatch(logout());
      queryClient.clear();
      navigate({ to: APP_ROUTES.LOGIN.navigate });
    },
  };
}
