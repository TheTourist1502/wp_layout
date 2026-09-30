import { getRouteApi, useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
import { type FormEvent, useState } from 'react';

import { useAuth } from '../hooks/useAuth';
import { validateLogin } from '../utils/validation';

const route = getRouteApi('/blank/auth/login');

const inputClass =
  'h-10 w-full rounded-md border bg-canvas px-3.5 text-body-md text-ink outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/15';

export default function LoginPage() {
  const { redirect } = route.useSearch();
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Real-time once the user has tried to submit; quiet before that.
  const errors = submitted ? validateLogin(username, password) : {};

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(validateLogin(username, password)).length) return;
    login({ email: username.trim(), password, rememberMe })
      .then(() => navigate({ to: redirect }))
      .catch(() => undefined); // message shown from Redux `error`
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        noValidate
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-5 rounded-lg bg-surface-card p-8"
      >
        <h1 className="font-display text-display-sm text-ink">Sign in to WealthPulse</h1>

        {error && (
          <p role="alert" className="rounded-lg border border-error bg-error/10 p-4 text-body-sm text-error">
            {error}
          </p>
        )}

        <Field label="Username or email" id="username" error={errors.username}>
          <input
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-invalid={!!errors.username}
            aria-describedby={errors.username && 'username-error'}
            className={clsx(inputClass, errors.username ? 'border-error' : 'border-hairline')}
          />
        </Field>

        <Field label="Password" id="password" error={errors.password}>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password && 'password-error'}
            className={clsx(inputClass, errors.password ? 'border-error' : 'border-hairline')}
          />
        </Field>

        <label className="flex items-center gap-2 text-body-sm text-body">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="size-4 accent-primary"
          />
          Remember me for 30 days
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="h-10 w-full rounded-md bg-primary px-5 text-button font-medium text-on-primary outline-none hover:bg-primary-active focus-visible:ring-[3px] focus-visible:ring-primary/15 active:bg-primary-active disabled:bg-primary-disabled disabled:text-muted"
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

function Field(props: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={props.id} className="block text-body-sm font-medium text-ink">
        {props.label}
      </label>
      {props.children}
      {props.error && (
        <p id={`${props.id}-error`} className="text-body-sm text-error">
          {props.error}
        </p>
      )}
    </div>
  );
}
